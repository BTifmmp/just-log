import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { router } from 'expo-router';
import { RelativePathString } from 'expo-router';
import Animated, { FadeOutRight, FadeInLeft } from 'react-native-reanimated';
import { usePreferredWeightUnit } from '../common/PrefferedWeightUnitProvider';
import { convertWeight } from '@/scripts/converter';

type ExerciseLogProps = {
  setNumber: number,
  reps: number,
  weight: number,
  time: string
  unit: string
}

function ExerciseLog({ setNumber, reps, weight, time, unit }: ExerciseLogProps) {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={styles.logRow}>
        <Text style={[{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }]}>
          <Text style={{ fontWeight: 500 }}>{setNumber}</Text>     {reps}
          <Text style={{ fontSize: 15, color: Colors.gray[650] }}> reps</Text>     {weight}
          <Text style={{ fontSize: 15, color: Colors.gray[650] }}> {unit}</Text>
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
  exerciseId: number | undefined

}

export default function ActivityExercise({ name, volume = 0, logsData = [], exerciseId }: ActivityExerciseProps) {
  const { unit } = usePreferredWeightUnit();

  return (
    <Animated.View style={styles.container} entering={FadeInLeft.duration(150)} exiting={FadeOutRight.duration(150)}>
      <View>
        <Pressable onPress={() => {
          if (exerciseId !== undefined)
            router.navigate({
              pathname: `/exercise/${exerciseId}` as RelativePathString,
              params: { exerciseId: Number(exerciseId), name: name }
            })
        }}>
          <Text style={styles.exerciseTitle}>{name}</Text>
        </Pressable>
        <Text style={styles.exerciseVolume}>Volume {convertWeight(volume, unit)} {unit}</Text>
      </View>
      {
        logsData.map((log, index) => <View key={index} style={{
          borderBottomWidth: index != logsData.length - 1 ? StyleSheet.hairlineWidth : 0,
          borderBottomColor: Colors.gray[500],
          marginHorizontal: 5

        }}><ExerciseLog setNumber={index + 1} reps={log.reps} weight={convertWeight(log.weight, unit)} time={log.time} unit={unit} /></View>)
      }
    </Animated.View >

  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: Colors.gray[150],
    // borderBottomWidth: 5,
    // marginHorizontal: -10,
    // borderColor: Colors.gray[300],
    padding: 10,
    borderRadius: BorderRadius.medium
  },
  exerciseTitle: {
    color: Colors.gray[950],
    fontWeight: 500,
    fontSize: 18,
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
    paddingVertical: 13,
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
