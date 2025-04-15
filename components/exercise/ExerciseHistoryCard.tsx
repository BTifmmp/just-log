import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { logsTable } from '@/db/schema';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

type ExerciseLogProps = {
  setNumber: number,
  reps: number,
  weight: number,
  time: string
  id: number,
  isSelected?: boolean,
  onLongPress: (id: number) => void
}

function ExerciseLog({ setNumber, reps, weight, time, id, onLongPress, isSelected = false }: ExerciseLogProps) {
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
              <Text style={{ fontSize: 15, color: Colors.gray[650] }}> kg</Text>
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
  logsData?: typeof logsTable.$inferSelect[]
  selectedLogId?: number
  onLogSelect: (id: number) => void

}

export default React.memo(function HistoryExercise({ name, volume = '', logsData = [], selectedLogId = undefined, onLogSelect }: HistoryExerciseProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.exerciseTitle}>{name}</Text>
        <Text style={styles.exerciseVolume}>Volume {volume} kg</Text>
      </View>
      {logsData.map((log, index) => {
        const logDate = new Date(log.date);
        return (
          <View key={index} style={{
            borderBottomWidth: index != logsData.length - 1 ? StyleSheet.hairlineWidth : 0,
            borderBottomColor: Colors.gray[500],
            marginHorizontal: 5
          }}>
            <ExerciseLog
              setNumber={index + 1}
              reps={log.reps}
              weight={log.weight}
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
    marginBottom: 10,
    backgroundColor: Colors.gray[150],
    padding: 10,
    borderRadius: BorderRadius.largest
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
    fontSize: 15,
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
    paddingVertical: 10,
    borderRadius: BorderRadius.largest
  },
  logText: {
    color: Colors.gray[950],
    fontSize: 16,
    fontWeight: '400',
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
