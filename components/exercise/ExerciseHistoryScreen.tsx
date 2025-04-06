import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import React from 'react'
import HistoryExercise from './ExerciseHistoryCard';

export default function ExerciseHistoryScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.filterContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={styles.filterText}>Year</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.blue[400]} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={styles.filterText}>Month</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.blue[400]} />
        </View>
      </View>

      <HistoryExercise name="23 Mar" logsData={[{ reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }]} />
      <HistoryExercise name="21 Mar" logsData={[{ reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }]} />
      <HistoryExercise name="23 Mar" logsData={[{ reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }]} />
      <HistoryExercise name="21 Mar" logsData={[{ reps: 12, time: '12:65', weight: 100 }, { reps: 12, time: '12:65', weight: 100 }]} />
      <View style={styles.spacerSmall} />
      <View style={styles.spacerLarge}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: Colors.addOpacity(Colors.blue[500], 0.2),
    padding: 12,
    borderRadius: BorderRadius.largest,
    marginBottom: 15,
  },
  filterText: {
    color: Colors.blue[400],
    fontWeight: '400',
    fontSize: 17,
  },
  spacerSmall: {
    height: 5,
  },
  spacerLarge: {
    height: 20,
  },
});