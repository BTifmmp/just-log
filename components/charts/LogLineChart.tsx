import { StyleProp, View, ViewStyle, TextStyle, Text } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';


import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useFont } from '@shopify/react-native-skia';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, SharedValue, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Circle, Line as LineSkia, vec } from '@shopify/react-native-skia';


type LogsBarChartProps = {
  title?: string
  data: any[]
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  dataDisplay?: (item: any) => React.JSX.Element | undefined
}

function ToolTip({ x, y, firstPointX }: { x: SharedValue<number>; y: SharedValue<number>; firstPointX: number; }) {
  const p1 = useDerivedValue(() => vec(x.value > 0 ? x.value : firstPointX, 0));
  const p2 = useDerivedValue(() => vec(x.value > 0 ? x.value : firstPointX, 250));

  return <LineSkia p1={p1} p2={p2} color={Colors.gray[750]} strokeWidth={1} />;
}

export default function LogsBarChart({
  title = '',
  data,
  containerStyle,
  titleStyle,
  dataDisplay,
}: LogsBarChartProps) {
  const [lastValidIndexState, setLastValidIndex] = useState(0);
  const INIT_STATE = { x: 0, y: { value: 0 } };
  const prevIndex = useSharedValue(-1);
  const prevActive = useSharedValue(false);
  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 10);
  const { state, isActive } = useChartPressState(INIT_STATE);

  useLayoutEffect(() => {
    state.x.position.value = -1;
    state.matchedIndex.value = -1;
    setLastValidIndex(0);
  }, [data])

  useDerivedValue(() => {
    if ((state.matchedIndex.value != -1 && prevIndex.value != state.matchedIndex.value) && prevActive.value) {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    }
    if (state.isActive.value && !prevActive.value) {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (state.matchedIndex.value != -1) {
      runOnJS(setLastValidIndex)(Math.max(0, state.matchedIndex.value));
    }

    prevActive.value = state.isActive.value;
    prevIndex.value = state.matchedIndex.value
  }, [state])

  return (
    <View style={containerStyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "flex-start" }}>
        {title && <Text style={[{ fontWeight: 500, fontSize: 16, color: Colors.gray[950] }, titleStyle]}>{title}</Text>}
        {data.length > 1 && dataDisplay && dataDisplay(data[lastValidIndexState < data.length ? lastValidIndexState : 0])}
      </View>
      <View
        style={{ width: '100%', height: data.length > 1 ? 0 : 240 }}
      />
      {
        data.length > 1 ?
          <View>
            <View style={{ height: 240 }}>
              <CartesianChart
                data={data} // 👈 specify your data
                yKeys={["value"]} // 👈 specify data keys used for y-axis
                xKey={'date'}
                domainPadding={{ top: 10, left: 15, bottom: 0, right: 15 }}
                padding={{ top: 0, left: 0, bottom: 0, right: 10 }}
                chartPressState={[state]}
                yAxis={[
                  {
                    tickCount: 4,
                    tickValues: [0, Math.max(...data.map(item => item.value)) * 0.333, Math.max(...data.map(item => item.value)) * 0.6666, Math.max(...data.map(item => item.value))],
                    yKeys: ['value'],
                    lineColor: Colors.gray[300],
                    labelOffset: 4,
                    labelColor: Colors.gray[750],
                    formatYLabel: (val) => val.toFixed(0),
                    labelPosition: 'outset',
                    font: font
                  },
                ]}
                frame={{
                  lineColor: Colors.gray[500],
                  lineWidth: { top: 0, bottom: 1, left: 0, right: 0 }
                }}
              >
                {({ points }) => {
                  return (
                    <View>
                      <Line points={points.value} color={Colors.blue[500]} strokeWidth={2} strokeCap={'round'} strokeJoin={'bevel'} />
                      <ToolTip x={state.x.position} y={state.y.value.position} firstPointX={points.value[0].x} />
                    </View>)
                }}
              </CartesianChart>
            </View>
            {
              data.length > 1 &&
              <View style={{ paddingLeft: 25, paddingRight: 10, flexDirection: 'row', justifyContent: 'space-between', marginTop: -10 }}>
                <Text style={{ fontSize: 10, color: Colors.gray[750] }}>{data[0].date}</Text>
                <Text style={{ fontSize: 10, color: Colors.gray[750] }}>{data[data.length - 1].date}</Text>
              </View>
            }
          </View >
          : undefined
      }
    </View >
  )
}