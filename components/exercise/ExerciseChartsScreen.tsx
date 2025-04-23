import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useLayoutEffect, useState, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import React from 'react'
import LogsLineChart from '../charts/LogLineChart';
import { logsTable } from '@/db/schema';
import { filterLogsByTimeFrame, groupLogsByDayWithMaxValues, reduceLogs } from '@/scripts/charts';
import { formatUnixDate } from '@/scripts/date';
import { calculateOneRepMax } from '@/scripts/one_rep_calc';
import { usePreferredWeightUnit } from '../common/PrefferedWeightUnitProvider';
import { convertWeight } from '@/scripts/converter';

type ExerciseOverviewScreenProps = {
  logs: typeof logsTable.$inferSelect[]
}


export default function ExerciseChartsScreen({ logs }: ExerciseOverviewScreenProps) {
  const [dataMaxWeight, setDataMaxWeight] = useState<{ value: number, reps: number, date: string }[]>([]);
  const [dataMaxReps, setDataMaxReps] = useState<{ value: number, weight: number, date: string }[]>([]);
  const [dataEst1RM, setDataEst1RM] = useState<{ value: number, date: string }[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'3m' | '6m' | '1y' | 'all'>('3m');
  const { unit } = usePreferredWeightUnit();


  useLayoutEffect(() => {
    const now = Date.now();
    const filtered = filterLogsByTimeFrame(logs, selectedTimeframe).sort((a, b) => a.date - b.date);
    const { maxWeightLogs, maxRepsLogs, max1RMLogs } = groupLogsByDayWithMaxValues(filtered);

    const dataWeight = maxWeightLogs.map((item, index) =>
    ({
      value: convertWeight(item.weight, unit),
      reps: item.reps,
      date: formatUnixDate(item.date, true),
    }))
    const dataReps = maxRepsLogs.map((item, index) =>
    ({
      value: item.reps,
      weight: convertWeight(item.weight, unit),
      date: formatUnixDate(item.date, true),
    }))
    const data1RM = max1RMLogs.map((item, index) =>
    ({
      value: calculateOneRepMax(item.reps, convertWeight(item.weight, unit)),
      date: formatUnixDate(item.date, true),
    }))


    setDataMaxWeight(dataWeight);
    setDataMaxReps(dataReps);
    setDataEst1RM(data1RM);

  }, [logs, selectedTimeframe])

  return (
    dataMaxWeight.length <= 1
      ?
      <View style={styles.container}>
        <Text style={styles.title}>Insufficient data for charts</Text>
        <Text style={styles.subtitle}>Once you have logged more sessions, charts will become available to help monitor your progress.</Text>
      </View>
      :
      <View>
        <ScrollView ref={scrollViewRef} style={{ paddingHorizontal: 10, paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', padding: 6, backgroundColor: Colors.gray[150], borderRadius: BorderRadius.medium, marginBottom: 10 }}>
            {['3m', '6m', '1y', 'all'].map((label) => {
              const isSelected = selectedTimeframe === label;

              return (
                <Pressable
                  key={label}
                  onPress={() => setSelectedTimeframe(label as typeof selectedTimeframe)}
                  style={{
                    padding: 8,
                    flex: 1,
                    borderRadius: BorderRadius.large,
                    backgroundColor: isSelected ? Colors.gray[400] : 'transparent',
                  }}
                >
                  <Text style={{
                    fontSize: 13,
                    color: isSelected ? Colors.gray[950] : Colors.gray[950],
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
                  <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> {unit}</Text>  {item.reps}
                  <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> reps</Text>
                </Text>
              </View>}
          />
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
                  <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> {unit}</Text>
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
                  <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> {unit}</Text>
                </Text>
              </View>}
          />
          <View style={{ height: 35 }}></View>
        </ScrollView></View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: Colors.gray[150],
    // borderBottomWidth: 5,
    borderColor: Colors.gray[300],
    marginTop: 10,
    paddingVertical: 20,
    paddingTop: 15,
    paddingHorizontal: 10,
    // marginHorizontal: -10,
    borderRadius: BorderRadius.medium
  },
  container: {
    margin: 10,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray[950],
    marginBottom: 6,
  },
  subtitle: {
    width: '70%',
    fontSize: 14,
    color: Colors.gray[750],
    textAlign: 'center',
  },
})