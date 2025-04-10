import { StyleProp, View, ViewStyle, TextStyle, Text } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';


import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useFont } from '@shopify/react-native-skia';
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
  const p1 = useDerivedValue(() => vec(x.value > 0 ? x.value : firstPointX, 0), [x]);
  const p2 = useDerivedValue(() => vec(x.value > 0 ? x.value : firstPointX, 250), [x]);

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

  useLayoutEffect(() => {
    state.x.position.value = -1;
    state.matchedIndex.value = -1;
    setLastValidIndex(0);
  }, [data])



  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 10);
  const { state, isActive } = useChartPressState(INIT_STATE);

  useDerivedValue(() => {
    if (state.matchedIndex.value != -1) {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
      runOnJS(setLastValidIndex)(Math.max(0, state.matchedIndex.value));
    }
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
                    tickValues: [0, Math.max(...data.map(item => item.value + 20)) * 0.333, Math.max(...data.map(item => item.value + 20)) * 0.6666, Math.max(...data.map(item => item.value + 20))],
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
                    <>
                      <Line points={points.value} color={Colors.blue[500]} strokeWidth={2} strokeCap={'round'} strokeJoin={'bevel'} />
                      <ToolTip x={state.x.position} y={state.y.value.position} firstPointX={points.value[0].x} />
                    </>)
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













{/* <LineChart
          curved
          disableScroll
          curvature={0.02}
          yAxisOffset={0}
          height={200}
          hideDataPoints
          color={Colors.blue[500]}
          yAxisColor='transparent'
          xAxisColor={Colors.gray[500]}
          yAxisThickness={0}
          xAxisThickness={1}
          hideOrigin
          onlyPositive
          thickness={2}
          xAxisType='solid'
          yAxisTextStyle={{ color: Colors.gray[750], fontSize: 10, transform: [{ translateX: 0 }] }}
          data={data}
          rulesColor="#ccccff30"
          rulesType='solid'
          width={chartParentWidth}
          yAxisLabelWidth={25}
          noOfSections={4}
          spacing={chartParentWidth / (data.length - 1) - 16 / (data.length - 1)}
          initialSpacing={10}
          endSpacing={10}
          getPointerProps={pointerProps}
          xAxisLabelsHeight={0}

          pointerConfig={{
            hidePointers: true,
            pointerStripColor: Colors.gray[750],
            strokeDashArray: [100, 0],
            pointerColor: Colors.blue[400],
            initialPointerIndex: initialIndex.current,
            resetPointerIndexOnRelease: true,
            persistPointer: true,
          }}
        /> */}