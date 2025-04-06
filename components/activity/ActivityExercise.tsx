import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { router } from 'expo-router';

type ExerciseLogProps = {
  setNumber: number,
  reps: number,
  weight: number,
  time: string
}

function ExerciseLog({ setNumber, reps, weight, time }: ExerciseLogProps) {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={styles.logRow}>
        <Text style={[{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }]}>
          <Text style={{ fontWeight: 500 }}>{setNumber}</Text>     {reps}
          <Text style={{ fontSize: 15, color: Colors.gray[650] }}> reps</Text>     {weight}
          <Text style={{ fontSize: 15, color: Colors.gray[650] }}> kg</Text>
        </Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View >
  );
}

type ActivityExerciseProps = {
  name?: string
  volume?: number
  logsData?: { reps: number, weight: number, time: string }[]

}

export default function ActivityExercise({ name, volume = 0, logsData = [] }: ActivityExerciseProps) {
  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => { router.navigate("/exercise/bench") }}>
          <Text style={styles.exerciseTitle}>{name}</Text>
        </Pressable>
        <Text style={styles.exerciseVolume}>Volume {volume} kg</Text>
      </View>
      {
        logsData.map((log, index) => <View key={index} style={{
          borderBottomWidth: index != logsData.length - 1 ? StyleSheet.hairlineWidth : 0,
          borderBottomColor: Colors.gray[500],
          marginHorizontal: 5

        }}><ExerciseLog setNumber={index + 1} reps={log.reps} weight={log.weight} time={log.time} /></View>)
      }
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: Colors.gray[150],
    padding: 10,
    borderRadius: BorderRadius.largest
  },
  exerciseTitle: {
    color: Colors.blue[500],
    fontWeight: 400,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 15,
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
