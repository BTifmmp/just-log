import { StyleSheet, View, ScrollView, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import LogRow from '@/components/exercise/LogRow';
import { Button } from 'react-native-paper';
import { addLogsBatch } from '@/db/queries';
import { useDb } from '@/components/DBProvider';

const weightOptions = [10, 5, 2.5, 1.25];

export default function ExerciseLog() {
  const { exerciseId, name } = useLocalSearchParams();
  const nav = useNavigation();
  const { db } = useDb();

  const [selectedWeightStep, setSelectedWeightStep] = useState<number>(10);
  const [showRemove, setShowRemove] = useState(false);
  const [setsList, setSetsList] = useState<
    { id: number; reps: string | undefined; weight: string | undefined }[]
  >([]);

  useEffect(() => {
    nav.setOptions({ title: `New ${name} Log` });
    addSet(); // initialize with one set
  }, []);

  function addSet() {
    const newSet = {
      id: Date.now(),
      reps: '8',
      weight: '80',
    };
    setSetsList([...setsList, newSet]);
  }

  function removeSet(id: number) {
    setSetsList(setsList.filter((set) => set.id !== id));
    setShowRemove(false);
  }

  function updateSet(id: number, field: 'reps' | 'weight', value: string) {
    setSetsList((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [field]: value } : set))
    );
  }

  async function pushLogsToDb() {
    const pushFormat = setsList.map((item) => ({
      reps: Number(item.reps),
      weight: Number(item.weight),
      exerciseId: Number(exerciseId),
      date: Date.now(),
    }));
    const res = await addLogsBatch(db, pushFormat);
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>
          Weight Step <Text style={styles.labelSub}>(kg)</Text>
        </Text>
        <View style={styles.weightOptions}>
          {weightOptions.map((option) => (
            <View
              key={option}
              style={{ overflow: 'hidden', borderRadius: BorderRadius.medium }}>
              <Pressable
                onPress={() => setSelectedWeightStep(option)}
                style={[styles.radioOption, selectedWeightStep === option && { borderColor: Colors.blue[500] }]}>
                <Text
                  style={[styles.radioLabel, selectedWeightStep === option && { color: Colors.gray[950] }]}>
                  {option}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        <Text style={styles.setsHeader}>Sets</Text>
        <View
          style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingBottom: 10, }}>
          <Text style={styles.setLabel}>REPS</Text>
          <Text style={styles.setLabel}>WEIGHT</Text>
        </View>

        {setsList.map((log) => (
          <LogRow
            key={log.id}
            id={log.id}
            showRemove={showRemove}
            onRemove={removeSet}
            onChange={updateSet}
            reps={log.reps}
            weight={log.weight}
            weightStep={selectedWeightStep}
          />
        ))}

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 15, marginBottom: 60, paddingHorizontal: '10%' }}>
          <Button
            onPress={addSet}
            style={styles.secondaryButton}
            rippleColor={Colors.gray[350]}
            labelStyle={styles.secondaryLabel}>
            Add
          </Button>
          <Button
            onPress={() => setShowRemove(!showRemove)}
            style={styles.secondaryButton}
            rippleColor={Colors.gray[350]}
            labelStyle={styles.secondaryLabel}>
            {showRemove ? 'Discard' : 'Remove'}
          </Button>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20, marginTop: 20, }}>
        <Button
          onPress={pushLogsToDb}
          style={styles.logButton}
          rippleColor={Colors.blue[300]}
          labelStyle={styles.logButtonLabel}>
          Log
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  label: {
    color: Colors.gray[950],
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  labelSub: {
    color: Colors.blue[400],
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  weightOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  radioOption: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.gray[150],
    borderRadius: BorderRadius.large,
    backgroundColor: Colors.gray[150],
  },
  radioLabel: {
    color: Colors.gray[750],
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
  },
  setsHeader: {
    color: Colors.gray[950],
    fontSize: 16,
    fontWeight: '500',
  },
  setLabel: {
    color: Colors.gray[700],
    fontSize: 12,
    flex: 1,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 99,
    backgroundColor: Colors.gray[200],
  },
  secondaryLabel: {
    fontFamily: 'sans-serif',
    fontWeight: 400,
    color: Colors.gray[950],
    fontSize: 15,
    marginVertical: 8,
  },
  logButton: {
    borderRadius: BorderRadius.largest,
    backgroundColor: Colors.blue[500],
  },
  logButtonLabel: {
    color: Colors.gray[950],
    fontSize: 16,
    paddingVertical: 3,
  },
});
