import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';

import { Button } from 'react-native-paper';
import WilksStandards from '@/components/wilks/WilksStandards';
import WilksInputs from '@/components/wilks/WilksInputs';
import ScoreCard, { ScoreCardProps } from '@/components/wilks/ScoreCard';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import calculateWilksScore from '@/scripts/wilks_calc';

export default function ExerciseLog() {
  const [benchPressWeight, setBenchPressWeight] = useState('');
  const [deadliftWeight, setDeadliftWeight] = useState('');
  const [sqautWeight, setSqautWeight] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [bodyWeight, setBodyWeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [selected, setSelected] = useState('separate');


  // const [isScoreTotal, setIsScoreTotal] = useState(false);
  // const [iScoreSeparate, setIsScoreTotal] = useState(false);


  const [scoreCardProps, setScoreCardProps] = useState<ScoreCardProps>({});



  function calculateScore() {
    const newScoreCardProps: ScoreCardProps = {};
    newScoreCardProps.total = totalWeight;
    newScoreCardProps.bodyweight = bodyWeight;
    newScoreCardProps.benchpress = benchPressWeight;
    newScoreCardProps.squat = sqautWeight;
    newScoreCardProps.deadlift = deadliftWeight;
    newScoreCardProps.gender = gender;

    if (selected == 'total' && totalWeight && bodyWeight && gender) {
      newScoreCardProps.score =
        calculateWilksScore(Number(totalWeight), gender, Number(bodyWeight)).toFixed(2);
      newScoreCardProps.isSeparate = false;
      setScoreCardProps(newScoreCardProps);
    } else if (benchPressWeight && sqautWeight && deadliftWeight && bodyWeight && gender) {
      newScoreCardProps.score =
        calculateWilksScore(
          Number(benchPressWeight) + Number(deadliftWeight) + Number(sqautWeight),
          gender, Number(bodyWeight)).toFixed(2);
      newScoreCardProps.isSeparate = true;
      setScoreCardProps(newScoreCardProps);
    }
  }

  return (
    <BottomSheetModalProvider>

      <ScrollView style={{ paddingTop: 15 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              The <Text style={styles.highlightedText}>Wilks Calculator</Text> evaluates strength performance relative to body weight, helping compare lifters of different sizes.
            </Text>
          </View>

          <WilksInputs
            onBenchChange={setBenchPressWeight}
            onSquatChange={setSqautWeight}
            onDeadliftChange={setDeadliftWeight}
            onBodyweightChange={setBodyWeight}
            onTotalChange={setTotalWeight}
            onMethodChange={setSelected}
            onGenderChange={setGender}
          />

          <Button
            onPress={calculateScore}
            style={styles.calcButton}
            rippleColor={Colors.blue[300]}
            labelStyle={styles.buttonLabel}
          >Calculate
          </Button>

          {
            scoreCardProps.score &&
            <ScoreCard
              {...scoreCardProps}
            />

          }

          <Text style={[{ fontSize: 16, fontWeight: 500, marginTop: scoreCardProps.score ? 20 : 60, color: Colors.gray[950], marginLeft: 5 }]}>
            Standards
          </Text>
          <WilksStandards />
        </View>
        <View style={{ height: 40 }}></View>
      </ScrollView >
    </BottomSheetModalProvider>

  );
}

const styles = StyleSheet.create({
  descriptionBox: {
    padding: 15,
    backgroundColor: Colors.gray[150],
    marginBottom: 15,
    borderRadius: BorderRadius.largest,
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.gray[750],
    fontWeight: '400',
    lineHeight: 20,
  },
  highlightedText: {
    color: Colors.gray[950],
    fontWeight: '600',
  },
  calcButton: {
    flex: 1,
    borderRadius: BorderRadius.largest,
    backgroundColor: Colors.blue[500],
    marginTop: 30,
    marginHorizontal: 5
  },
  buttonLabel: {
    color: Colors.gray[950],
    fontSize: 16,
    paddingVertical: 3,
  },
});
