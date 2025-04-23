import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { Button } from 'react-native-paper';
import TextInputActionRight from '@/components/common/TextInputActionRight';
import { DistributionRow, calculateOneRepMaxArrayFullReps, calculateOneRepMaxArray } from '@/scripts/one_rep_calc';
import RadioButtonOutlined from '@/components/common/RadioButtonOutlined';
import Storage from 'expo-sqlite/kv-store';
import { usePreferredWeightUnit } from '@/components/common/PrefferedWeightUnitProvider';


export default function OneRepMax() {
  const { unit, setUnit } = usePreferredWeightUnit();
  const [weightUnitState, setWeightUnitState] = useState(unit);

  function toggleWeight() {
    if (weightUnitState == 'kg') {
      setWeightUnitState('lb')
    } else if (weightUnitState == 'lb') {
      setWeightUnitState('kg')
    }
  }

  useEffect(() => {
    setWeightUnitState(unit)
  }, [unit]);


  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const [distributionData, setDistributionData] =
    useState<DistributionRow[]>([]);

  const [selected, setSelected] = useState('percent');

  function updateDistribution() {
    if (!reps || !weight) return;
    setDistributionData(calculateOneRepMaxArray(Number(reps), Number(weight), 10, 5));
  }

  function updateDistributionFullReps() {
    if (!reps || !weight) return;
    setDistributionData(calculateOneRepMaxArrayFullReps(Number(reps), Number(weight), 10, 5));
  }

  return (
    <ScrollView style={{ paddingTop: 15 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ padding: 15, backgroundColor: Colors.gray[150], marginBottom: 20, borderRadius: BorderRadius.medium }}>
          <Text style={{ fontSize: 15, color: Colors.gray[750], fontWeight: 400, lineHeight: 20 }}>
            <Text style={{ color: Colors.gray[950], fontWeight: 600 }}>One-Rep Max (1RM) </Text>
            calculator determines your maximum strength and estimates achievable reps at different weights.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 5 }}>
          <Text style={{ fontSize: 15, color: Colors.gray[750], fontWeight: 400, marginLeft: 5, marginBottom: 5 }}>Weight</Text>
          <TextInputActionRight placeholder='Weight' actionText={weightUnitState} onActionPress={toggleWeight} onChange={setWeight} />
          <Text style={{ fontSize: 15, color: Colors.gray[750], fontWeight: 400, marginLeft: 5, marginBottom: 5, marginTop: 15 }}>Reps</Text>
          <TextInputActionRight placeholder='Reps' onChange={setReps} />


          <Button
            onPress={selected == "reps" ? updateDistributionFullReps : updateDistribution}
            style={styles.calcButton}
            rippleColor={Colors.blue[300]}
            labelStyle={styles.buttonLabel}
          >Calculate
          </Button>
        </View>
      </View>


      {distributionData.length > 0 &&
        <View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 45, paddingHorizontal: 15 }}>
            <RadioButtonOutlined text='Percentage' onPress={() => { updateDistribution(); setSelected('percent') }} isSelected={selected == 'percent'} />
            <RadioButtonOutlined text='Full Reps' onPress={() => { updateDistributionFullReps(); setSelected('reps') }} isSelected={selected == 'reps'} />
          </View>
          <View style={styles.distributionContainer}>
            <View style={[styles.distributionRow, { marginBottom: -10 }]}>
              <View style={styles.distributionRowContent}>
                <Text style={styles.category}>1RM%</Text>
                <Text style={styles.category}>WEIGHT</Text>
                <Text style={styles.category}>REPS</Text>
              </View>
            </View>

            {distributionData.map((item, i: number) => (
              <View key={'log' + i} style={[styles.distributionRow, { borderBottomWidth: Number(distributionData.length - 1 != i) * StyleSheet.hairlineWidth }]}>
                <View style={styles.distributionRowContent}>
                  <Text numberOfLines={1} style={styles.distributionText}>
                    {item.percentage} <Text style={styles.subText}>%</Text>
                  </Text>
                  <Text numberOfLines={1} style={styles.distributionText}>
                    {item.weight} <Text style={styles.subText}>{weightUnitState}</Text>
                  </Text>
                  <Text numberOfLines={1} style={styles.distributionText}>
                    {item.reps} <Text style={styles.subText}>reps</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View ></View>}

      <View style={styles.spacer}></View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  description: {
    fontWeight: 400,
    fontSize: 14,
    color: Colors.gray[300],
  },
  calcButton: {
    flex: 1,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.blue[500],
    marginTop: 30
  },

  buttonLabel: {
    color: Colors.gray[950],
    fontSize: 16,
    paddingVertical: 3
  },

  distributionContainer: {
    marginHorizontal: 10,
    borderRadius: BorderRadius.medium,
    overflow: 'hidden',
    backgroundColor: Colors.gray[150],
    marginTop: 15,
  },

  category: {
    fontSize: 14,
    color: Colors.gray[650],
    fontWeight: 400,
    flex: 1
  },

  distributionRow: {
    gap: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomColor: Colors.gray[500],
  },

  distributionRowContent: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  distributionText: {
    flex: 1,
    color: Colors.gray[950],
    fontWeight: 400,
    fontSize: 16,
  },

  subText: {
    color: Colors.gray[750],
    fontWeight: 400,
    fontSize: 15,
  },

  spacer: {
    height: 40,
  },
})