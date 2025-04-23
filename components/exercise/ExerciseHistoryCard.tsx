import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { logsTable } from '@/db/schema';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { usePreferredWeightUnit } from '../common/PrefferedWeightUnitProvider';
import { convertWeight } from '@/scripts/converter';

type ExerciseLogProps = {
  setNumber: number,
  reps: number,
  weight: number,
  unit: string
  time: string
  id: number,
  isSelected?: boolean,
  onLongPress: (id: number) => void
}

function ExerciseLog({ setNumber, reps, weight, time, id, onLongPress, isSelected = false, unit }: ExerciseLogProps) {
  const longPress = Gesture.LongPress().onStart(() => {
    runOnJS(onLongPress)(id);
    !isSelected && runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
  })
  return (
    <GestureDetector gesture={longPress}>
      <View style={{}}>
        <View style={{ paddingVertical: 5 }}>
          <View style={[styles.logRow, { backgroundColor: isSelected ? Colors.gray[300] : undefined }]}>
            <Text style={[{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }]}>
              <Text style={{ fontWeight: 500 }}>{setNumber}</Text>     {reps}
              <Text style={{ fontSize: 15, color: Colors.gray[650] }}> reps</Text>     {weight}
              <Text style={{ fontSize: 15, color: Colors.gray[650] }}> {unit}</Text>
            </Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
      </View>
    </GestureDetector>
  );
}

type HistoryExerciseProps = {
  name?: string
  volume?: string
  unit: string
  logsData?: typeof logsTable.$inferSelect[]
  selectedLogId?: number
  onLogSelect: (id: number) => void

}

export default React.memo(function HistoryExercise({ name, volume = '', logsData = [], selectedLogId = undefined, onLogSelect, unit }: HistoryExerciseProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.exerciseTitle}>{name}</Text>
        <Text style={styles.exerciseVolume}>Volume {volume} {unit}</Text>
      </View>
      {logsData.map((log, index) => {
        const logDate = new Date(log.date);
        return (
          <View key={index} style={{
            borderBottomWidth: index != logsData.length - 1 ? StyleSheet.hairlineWidth : 0,
            borderBottomColor: Colors.gray[500],
            marginHorizontal: 0
          }}>
            <ExerciseLog
              unit={unit}
              setNumber={index + 1}
              reps={log.reps}
              weight={convertWeight(log.weight, unit)}
              time={`${logDate.getHours().toString().padStart(2, '0')}:${logDate.getMinutes().toString().padStart(2, '0')}`}
              onLongPress={onLogSelect}
              isSelected={selectedLogId == log.id}
              id={log.id}
            />
          </View>
        )
      })}
    </View>

  );
}
)
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray[150],
    // marginHorizontal: -10,
    marginBottom: 10,
    // borderBottomWidth: 5,
    // borderColor: Colors.gray[200],
    padding: 10,
    borderRadius: BorderRadius.medium
  },
  exerciseTitle: {
    color: Colors.gray[950],
    fontWeight: 500,
    fontSize: 17,
    marginBottom: -8,
    marginLeft: 5,
    marginTop: 5
  },
  exerciseVolume: {
    color: Colors.gray[650],
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5
  },
  logRow: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 8,
    borderRadius: BorderRadius.medium
  },
  subText: {
    color: Colors.gray[650],
  },
  timeText: {
    color: Colors.gray[750],
    fontSize: 16,
    fontWeight: '400',
  },
});
