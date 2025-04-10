import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, TouchableRipple } from 'react-native-paper';
import StyledTextInput from '@/components/common/StyledTextInput';



type LogRowProps = {
  onRemove: (id: number) => void;
  onChange: (id: number, field: 'reps' | 'weight', value: string) => void;
  showRemove: boolean,
  reps?: string;
  weight?: string;
  id: number;
  weightStep: number
}

export default function LogRow({ onChange, onRemove, weight = '', reps = '', id, showRemove, weightStep }: LogRowProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', padding: 5, left: Number(showRemove) * -45, backgroundColor: Colors.gray[150], borderRadius: BorderRadius.largest, marginBottom: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 5, justifyContent: 'center' }}>
        <View style={styles.buttonWrapper}>
          <TouchableRipple
            rippleColor={Colors.gray[550]}
            onPress={() => onChange(id, 'reps', Math.max(Number(reps) - 1, 0).toString())}
            style={[styles.sideButton, {
            }]}>
            <Ionicons name="remove" size={20} color={Colors.gray[750]} />
          </TouchableRipple>
        </View>
        <View style={{ flex: 1 }}>
          <StyledTextInput
            value={reps}
            onChangeText={(val) => { onChange(id, 'reps', val) }}
            placeholder='Reps'
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableRipple
            rippleColor={Colors.gray[550]}
            onPress={() => onChange(id, 'reps', (Number(reps) + 1).toString())}
            style={[styles.sideButton, {
            }]}>
            <Ionicons name="add" size={20} color={Colors.gray[750]} />
          </TouchableRipple>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 5, justifyContent: 'center' }}>
        <View style={styles.buttonWrapper}>
          <TouchableRipple
            rippleColor={Colors.gray[550]}
            onPress={() => onChange(id, 'weight', Math.max(Number(weight) - weightStep, 0).toString())}
            style={[styles.sideButton, {
            }]}>
            <Ionicons name="remove" size={20} color={Colors.gray[750]} />
          </TouchableRipple>
        </View>
        <View style={{ flex: 1 }}>
          <StyledTextInput
            value={weight}
            onChangeText={(val) => { onChange(id, 'weight', val) }}
            placeholder='Weight'
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableRipple
            rippleColor={Colors.gray[550]}
            onPress={() => onChange(id, 'weight', (Number(weight) + weightStep).toString())}
            style={[styles.sideButton, {}]}>
            <Ionicons name="add" size={20} color={Colors.gray[750]} />
          </TouchableRipple>
        </View>
      </View>

      {showRemove && <Button compact={true} rippleColor={Colors.gray[400]} onPress={() => { onRemove(id) }} labelStyle={{ marginVertical: 4, marginHorizontal: 4 }} style={{ position: 'absolute', right: -45, borderRadius: 99 }}><Ionicons name="close" size={20} color={Colors.gray[950]} style={{ paddingHorizontal: 5 }} /></Button>}
    </View >)
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: BorderRadius.largest,
    overflow: 'hidden'
  },
  sideButton: {
    backgroundColor: Colors.gray[350],
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    marginHorizontal: 0,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    backgroundColor: Colors.gray[50],
    color: Colors.gray[950],
  },
});