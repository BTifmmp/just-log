import { StyleProp, View, ViewStyle, TextStyle, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BarChart } from 'react-native-gifted-charts';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import * as Haptics from 'expo-haptics';

type LogsLineChartProps = {
  title?: string
  data: any[]
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  dataDisplay?: (item: any) => React.JSX.Element | undefined

  onPointerScrollStart?: () => void
  onPointerScrollEnd?: () => void
}

export default function LogsLineChart({
  title = '',
  data,
  containerStyle,
  titleStyle,
  dataDisplay,
  onPointerScrollStart = () => { },
  onPointerScrollEnd = () => { } }: LogsLineChartProps) {
  const [chartParentWidth, setChartParentWidth] = useState(0);

  const firstTouch = useRef(false);
  const lastValidIndex = useRef(5);
  const [lastValidIndexState, setLastValidIndex] = useState(5);
  const initialIndex = useRef(5);

  return (
    <View onTouchStart={() => { firstTouch.current = true }} style={containerStyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "flex-start" }}>
        {title && <Text style={[{ fontWeight: 500, fontSize: 16, color: Colors.gray[950] }, titleStyle]}>{title}</Text>}
        {dataDisplay && dataDisplay(data[lastValidIndexState])}
      </View>
      <View
        onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width - 45)}
      >
        {
          chartParentWidth ? <BarChart
            disableScroll
            yAxisOffset={30}
            height={200}
            yAxisColor='transparent'
            xAxisColor={Colors.gray[500]}
            yAxisThickness={0}
            xAxisThickness={1}
            hideOrigin
            xAxisType='solid'
            yAxisTextStyle={{ color: Colors.gray[750], fontSize: 10, fontWeight: 400, transform: [{ translateX: 0 }] }}
            xAxisLabelTextStyle={{ color: Colors.gray[750], fontSize: 10, fontWeight: 400 }}
            data={data}
            rulesColor="#ccccff30"
            rulesType='solid'
            width={chartParentWidth}
            yAxisLabelWidth={25}
            noOfSections={4}
            spacing={20}
            initialSpacing={10}
            endSpacing={10}
            xAxisLabelsVerticalShift={5}
            labelsExtraHeight={10}
            barBorderRadius={BorderRadius.medium}
            frontColor={Colors.blue[500]}
            barWidth={chartParentWidth / (data.length) - 10 / (data.length) - (20 - 20 / data.length)}
            getPointerProps={({ pointerIndex, pointerX, pointerY, }: any) => {

              if (pointerIndex != -1) {
                initialIndex.current = -1;
                if (lastValidIndex.current != pointerIndex && lastValidIndex.current != -1) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
                lastValidIndex.current = pointerIndex;
                setLastValidIndex(lastValidIndex.current);
                if (firstTouch.current) {
                  onPointerScrollStart();
                }
              } else {
                onPointerScrollEnd();
              }
            }}

            pointerConfig={{
              hidePointer1: true,
              activatePointersDelay: 100,
              activatePointersOnLongPress: true,
              activatePointersInstantlyOnTouch: false,
              pointerStripColor: Colors.gray[750],
              strokeDashArray: [100, 0],
              pointerColor: Colors.blue[400],
              initialPointerIndex: initialIndex.current,
              resetPointerIndexOnRelease: true,
              persistPointer: true,
            }}
          />
            : undefined
        }
      </View>
    </View >
  )
}