import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import React from 'react'
import LogsLineChart from '../charts/LogLineChart';
import { logsTable } from '@/db/schema';
import { filterLogsByTimeFrame, groupLogsByDayWithMaxValues, reduceLogs } from '@/scripts/charts';
import { formatUnixDate } from '@/scripts/date';
import { calculateOneRepMax } from '@/scripts/one_rep_calc';

type ExerciseOverviewScreenProps = {
  logs: typeof logsTable.$inferSelect[]
}


export default function ExerciseChartsScreen({ logs }: ExerciseOverviewScreenProps) {
  const [dataMaxWeight, setDataMaxWeight] = useState<{ value: number, reps: number, date: string }[]>([]);
  const [dataMaxReps, setDataMaxReps] = useState<{ value: number, weight: number, date: string }[]>([]);
  const [dataEst1RM, setDataEst1RM] = useState<{ value: number, date: string }[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'3m' | '6m' | '1y' | 'all'>('3m');


  useEffect(() => {
    const now = Date.now();
    const filtered = filterLogsByTimeFrame(logs, selectedTimeframe).sort((a, b) => a.date - b.date);
    const { maxWeightLogs, maxRepsLogs, max1RMLogs } = groupLogsByDayWithMaxValues(filtered);

    const dataWeight = maxWeightLogs.map((item, index) =>
    ({
      value: item.weight,
      reps: item.reps,
      date: formatUnixDate(item.date, true),
    }))
    const dataReps = maxRepsLogs.map((item, index) =>
    ({
      value: item.reps,
      weight: item.weight,
      date: formatUnixDate(item.date, true),
    }))
    const data1RM = max1RMLogs.map((item, index) =>
    ({
      value: calculateOneRepMax(item.reps, item.weight),
      date: formatUnixDate(item.date, true),
    }))


    setDataMaxWeight(dataWeight);
    setDataMaxReps(dataReps);
    setDataEst1RM(data1RM);

  }, [logs, selectedTimeframe])

  return (
    <View><ScrollView ref={scrollViewRef} style={{ paddingHorizontal: 10, paddingTop: 15 }}>
      <View style={{ flexDirection: 'row', padding: 6, backgroundColor: Colors.gray[300], borderRadius: BorderRadius.largest, marginBottom: 5 }}>
        {['3m', '6m', '1y', 'all'].map((label) => {
          const isSelected = selectedTimeframe === label;

          return (
            <Pressable
              key={label}
              onPress={() => setSelectedTimeframe(label as typeof selectedTimeframe)}
              style={{
                padding: 8,
                flex: 1,
                borderRadius: BorderRadius.largest,
                backgroundColor: isSelected ? Colors.gray[950] : 'transparent',
              }}
            >
              <Text style={{
                fontSize: 14,
                color: isSelected ? Colors.gray[50] : Colors.gray[950],
                textAlign: 'center',
                fontWeight: '400',
              }}>
                {label.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <LogsLineChart
        containerStyle={styles.chartContainer}
        titleStyle={{ marginBottom: 20, marginLeft: 5 }}
        data={dataMaxWeight}
        title='Max Weight'
        dataDisplay={(item: any) =>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 400, fontSize: 15, color: Colors.gray[750], textAlign: 'right', marginRight: 5 }}>{item.date}</Text>
            <Text style={[{ fontWeight: 400, fontSize: 20, color: Colors.gray[950], textAlign: 'right', marginRight: 5 }]}>
              {item.value}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> kg</Text>  {item.reps}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> reps</Text>
            </Text>
          </View>}
      />
      <LogsLineChart
        containerStyle={styles.chartContainer}
        titleStyle={{ marginBottom: 20, marginLeft: 5 }}
        data={dataMaxReps}
        title='Max Reps'
        dataDisplay={(item: any) =>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 400, fontSize: 15, color: Colors.gray[750], textAlign: 'right', marginRight: 5 }}>{item.date}</Text>
            <Text style={[{ fontWeight: 400, fontSize: 20, color: Colors.gray[950], textAlign: 'right', marginRight: 5 }]}>
              {item.value}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> reps</Text>  {item.weight}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> kg</Text>
            </Text>
          </View>}
      />
      {/* <LogsBarChart
        containerStyle={styles.chartContainer}
        titleStyle={{ marginBottom: 20, marginLeft: 5 }}
        onPointerScrollEnd={() => { setIsPointerScrolled(false) }}
        onPointerScrollStart={() => { setIsPointerScrolled(true) }}
        data={data2}
        title='Session Volume'
        dataDisplay={(item: any) =>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 400, fontSize: 15, color: Colors.gray[750], textAlign: 'right' }}>Jan 20</Text>
            <Text style={[{ fontWeight: 400, fontSize: 20, color: Colors.gray[950], textAlign: 'right', marginRight: 5 }]}>
              {item.value}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> kg</Text>
            </Text>
          </View>}
      /> */}
      <LogsLineChart
        containerStyle={styles.chartContainer}
        titleStyle={{ marginBottom: 20, marginLeft: 5 }}
        data={dataEst1RM}
        title='Estimated 1RM'
        dataDisplay={(item: any) =>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 400, fontSize: 15, color: Colors.gray[750], textAlign: 'right', marginRight: 5 }}>{item.date}</Text>
            <Text style={[{ fontWeight: 400, fontSize: 20, color: Colors.gray[950], textAlign: 'right', marginRight: 5 }]}>
              {item.value.toFixed(1)}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> kg</Text>
            </Text>
          </View>}
      />
      <View style={{ height: 35 }}></View>
    </ScrollView></View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: Colors.gray[150], marginTop: 10, paddingVertical: 20, paddingTop: 15, paddingHorizontal: 10, borderRadius: BorderRadius.largest
  }
})