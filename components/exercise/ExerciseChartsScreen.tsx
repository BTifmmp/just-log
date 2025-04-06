import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import React from 'react'
import LogsLineChart from '../charts/LogLineChart';
import LogsBarChart from '../charts/LogBarChart';


export default function ExerciseChartsScreen() {
  const { name } = useLocalSearchParams();
  const [isPointerScrolled, setIsPointerScrolled] = useState(false);


  const data = [
    { value: 80, label: 'Dec 20', labelTextStyle: { transform: [{ translateX: '55%' }], color: Colors.gray[750], fontSize: 12, fontWeight: 400 } }, { value: 70 }, { value: 90 }, { value: 100 }, { value: 70 }, { value: 80 }, { value: 50 }, { value: 90 }, { value: 95, label: 'Dec 20', labelTextStyle: { transform: [{ translateX: '-50%' }], color: Colors.gray[750], fontSize: 12, fontWeight: 400 } },
  ];
  const data2 = [
    { value: 80, label: 'Dec 20', labelTextStyle: { color: Colors.gray[950], fontSize: 12, fontWeight: 400 } }, { value: 50 }, { value: 90 }, { value: 120 }, { value: 90 }, { value: 95, label: 'Dec 20', labelTextStyle: { color: Colors.gray[950], fontSize: 12, fontWeight: 400 } },
  ];
  const data3 = [
    { value: 80, label: 'Dec 20', labelTextStyle: { transform: [{ translateX: '55%' }], color: Colors.gray[950], fontSize: 12, fontWeight: 400 } }, { value: 100 }, { value: 90 }, { value: 70 }, { value: 70 }, { value: 80 }, { value: 50 }, { value: 90 }, { value: 95, label: 'Dec 20', labelTextStyle: { transform: [{ translateX: '-50%' }], color: Colors.gray[950], fontSize: 12, fontWeight: 400 } },
  ];

  return (
    <ScrollView scrollEnabled={!isPointerScrolled} style={{ paddingHorizontal: 10, paddingTop: 15 }}>
      <View style={{ flexDirection: 'row', padding: 5, backgroundColor: Colors.addOpacity(Colors.blue[500], 0.25), borderRadius: BorderRadius.largest, marginBottom: 5 }}>
        <View style={{ padding: 8, flex: 1, backgroundColor: Colors.blue[500], borderRadius: BorderRadius.largest }}>
          <Text style={{ fontSize: 14, color: Colors.gray[950], textAlign: 'center', fontWeight: 400, }}>3M</Text>
        </View>
        <View style={{ padding: 8, flex: 1, borderRadius: BorderRadius.largest }}>
          <Text style={{ fontSize: 14, color: Colors.gray[950], textAlign: 'center', fontWeight: 400 }}>6M</Text>
        </View>
        <View style={{ padding: 8, flex: 1, borderRadius: BorderRadius.largest }}>
          <Text style={{ fontSize: 14, color: Colors.gray[950], textAlign: 'center', fontWeight: 400 }}>1Y</Text>
        </View>
        <View style={{ padding: 8, flex: 1, borderRadius: BorderRadius.largest }}>
          <Text style={{ fontSize: 14, color: Colors.gray[950], textAlign: 'center', fontWeight: 400 }}>All</Text>
        </View>
      </View>

      <LogsLineChart
        containerStyle={styles.chartContainer}
        titleStyle={{ marginBottom: 20, marginLeft: 5 }}
        onPointerScrollEnd={() => { setIsPointerScrolled(false) }}
        onPointerScrollStart={() => { setIsPointerScrolled(true) }}
        data={data}
        title='Max Weight'
        dataDisplay={(item: any) =>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 400, fontSize: 15, color: Colors.gray[750], textAlign: 'right', marginRight: 5 }}>Jan 20</Text>
            <Text style={[{ fontWeight: 400, fontSize: 20, color: Colors.gray[950], textAlign: 'right', marginRight: 5 }]}>
              {item.value}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> kg</Text>  12
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> reps</Text>
            </Text>
          </View>}
      />
      <LogsLineChart
        containerStyle={styles.chartContainer}
        titleStyle={{ marginBottom: 20, marginLeft: 5 }}
        onPointerScrollEnd={() => { setIsPointerScrolled(false) }}
        onPointerScrollStart={() => { setIsPointerScrolled(true) }}
        data={data2}
        title='Max Reps'
        dataDisplay={(item: any) =>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 400, fontSize: 15, color: Colors.gray[750], textAlign: 'right' }}>Jan 20</Text>
            <Text style={[{ fontWeight: 400, fontSize: 20, color: Colors.gray[950], textAlign: 'right', marginRight: 5 }]}>
              {item.value}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> kg</Text>  12
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> reps</Text>
            </Text>
          </View>}
      />
      <LogsBarChart
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
      />
      <LogsLineChart
        containerStyle={styles.chartContainer}
        titleStyle={{ marginBottom: 20, marginLeft: 5 }}
        onPointerScrollEnd={() => { setIsPointerScrolled(false) }}
        onPointerScrollStart={() => { setIsPointerScrolled(true) }}
        data={data}
        title='Estimated 1RM'
        dataDisplay={(item: any) =>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 400, fontSize: 15, color: Colors.gray[750], textAlign: 'right' }}>Jan 20</Text>
            <Text style={[{ fontWeight: 400, fontSize: 20, color: Colors.gray[950], textAlign: 'right', marginRight: 5 }]}>
              {item.value}
              <Text style={{ fontWeight: 400, fontSize: 14, color: Colors.gray[750] }}> kg</Text>
            </Text>
          </View>}
      />
      <View style={{ height: 35 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: Colors.gray[150], marginTop: 10, paddingVertical: 20, paddingTop: 15, paddingHorizontal: 10, borderRadius: BorderRadius.largest
  }
})