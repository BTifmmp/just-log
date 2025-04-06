import { StyleSheet, Text, View, } from 'react-native'
import React, { useRef, ReactNode } from 'react'
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles'
import DayBox from '@/components/activity/DayBox';
import { ScrollView } from 'react-native-gesture-handler';
import ActivityOverview from '@/components/activity/ActivityOverview';
import ActivityExercise from '@/components/activity/ActivityExercise';


export default function activity() {
  const horizontalScroll = useRef(null)

  const logsData = [
    { reps: 14, date: '12:76', weight: 100 },
    { reps: 8, date: '12:76', weight: 80 },
    { reps: 5, date: '12:76', weight: 75 },
    { reps: 10, date: '12:76', weight: 120 },]


  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>

      <Text style={{ fontWeight: 500, fontSize: 26, color: Colors.gray[950], marginTop: 15, marginBottom: 15, marginLeft: 5 }}>March 1st</Text>
      <ScrollView ref={horizontalScroll} horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -15, marginBottom: 10 }} >
        <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 15 }}>
          <DayBox onPress={() => { }} dayWeekName='WED' dayNumber={1} selected hasActivity />
          <DayBox onPress={() => { }} dayWeekName='TUE' dayNumber={2} hasActivity />
          <DayBox onPress={() => { }} dayWeekName='FRI' dayNumber={3} />
          <DayBox onPress={() => { }} dayWeekName='SUN' dayNumber={4} />
          <DayBox onPress={() => { }} dayWeekName='SAT' dayNumber={5} />
          <DayBox onPress={() => { }} dayWeekName='WED' dayNumber={10} />
          <DayBox onPress={() => { }} dayWeekName='TUE' dayNumber={12} hasActivity />
          <DayBox onPress={() => { }} dayWeekName='FRI' dayNumber={13} />
          <DayBox onPress={() => { }} dayWeekName='SUN' dayNumber={14} />
          <DayBox onPress={() => { }} dayWeekName='SAT' dayNumber={15} />
          <DayBox onPress={() => { }} dayWeekName='WED' dayNumber={1} />
          <DayBox onPress={() => { }} dayWeekName='TUE' dayNumber={2} hasActivity />
          <DayBox onPress={() => { }} dayWeekName='FRI' dayNumber={3} />
          <DayBox onPress={() => { }} dayWeekName='SUN' dayNumber={4} />
          <DayBox onPress={() => { }} dayWeekName='SAT' dayNumber={5} />
          <DayBox onPress={() => { }} dayWeekName='WED' dayNumber={10} />
          <DayBox onPress={() => { }} dayWeekName='TUE' dayNumber={12} hasActivity />
          <DayBox onPress={() => { }} dayWeekName='FRI' dayNumber={13} />
          <DayBox onPress={() => { }} dayWeekName='SUN' dayNumber={14} />
          <DayBox onPress={() => { }} dayWeekName='SAT' dayNumber={15} />
        </View>
      </ScrollView>
      <ActivityOverview />
      <Text style={[{ color: Colors.gray[950], fontWeight: 500, fontSize: 16, marginTop: 30, marginBottom: 10, marginLeft: 5 }]}>Exercises</Text>
      <ActivityExercise name='Bench press' logsData={[{ reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }]} />
      <ActivityExercise name='Shoulder press' logsData={[{ reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }]} />
      <View style={{ height: 5 }} />
    </ScrollView >
  )
}

const styles = StyleSheet.create({

});