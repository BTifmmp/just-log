import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useRef } from 'react';
import { Button, TouchableRipple } from 'react-native-paper';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import TextInputActionRight from '@/components/common/TextInputActionRight';
import RadioButtonOutlined from '@/components/common/RadioButtonOutlined';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import MenuBottomModal from '../common/MenuBottomModal';


type WilksInputsProps = {
  onBenchChange?: (val: string) => void;
  onSquatChange?: (val: string) => void;
  onDeadliftChange?: (val: string) => void;
  onBodyweightChange?: (val: string) => void;
  onTotalChange?: (val: string) => void;
  onMethodChange?: (val: string) => void;
  onGenderChange?: (val: string) => void;
};

export default function WilksInputs({
  onBenchChange,
  onSquatChange,
  onDeadliftChange,
  onBodyweightChange,
  onTotalChange,
  onMethodChange,
  onGenderChange,
}: WilksInputsProps) {
  const [selected, setSelected] = useState('separate');
  const [gender, setGender] = useState('Male');

  const genderModalRef = useRef<BottomSheetModal>(null);

  return (
    <View style={{ paddingHorizontal: 5 }}>
      <View style={styles.row}>
        <View style={{ flex: 1 }} >
          <Text style={styles.label}>Gender</Text>
          <View style={{ borderRadius: BorderRadius.largest, overflow: 'hidden' }}>
            <TouchableRipple
              rippleColor={Colors.gray[300]}
              onPress={() => { genderModalRef.current?.present() }}>
              <View style={styles.dropdown}>
                <Text style={styles.dropdownText}>{gender}</Text>
                <Ionicons name='chevron-down' size={16} color={Colors.gray[950]} />
              </View>
            </TouchableRipple>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Bodyweight</Text>
          <TextInputActionRight placeholder='Weight' onChange={onBodyweightChange} actionText='kg' />
        </View>
      </View >

      <Text style={styles.label}>Method</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <RadioButtonOutlined text='Separate' onPress={() => { setSelected('separate'); onMethodChange && onMethodChange('separate'); }} isSelected={selected == 'separate'} />
        <RadioButtonOutlined text='Total' onPress={() => { setSelected('total'); onMethodChange && onMethodChange('total'); }} isSelected={selected == 'total'} />
      </View>

      {
        selected == 'separate' ?
          <View key={"separate"}>
            <Text style={styles.label}>Bench press</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <TextInputActionRight placeholder='Weight' onChange={onBenchChange} actionText='kg' />
              </View>
            </View>
            <Text style={[styles.label]}>Squat</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <TextInputActionRight placeholder='Weight' onChange={onSquatChange} actionText='kg' />
              </View>
            </View>

            <Text style={[styles.label]}>Deadlift</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <TextInputActionRight placeholder='Weight' onChange={onDeadliftChange} actionText='kg' />
              </View>
            </View>
          </View>
          :
          <View>
            <Text style={[styles.label]}>Total</Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <TextInputActionRight placeholder='Weight' onChange={onTotalChange} actionText='kg' />
              </View>
            </View>
          </View>
      }

      <MenuBottomModal
        modalRef={genderModalRef}
        elements={[
          { label: 'Male', onPress: () => { onGenderChange && onGenderChange('Male'); setGender('Male') } },
          { label: 'Female', onPress: () => { onGenderChange && onGenderChange('Female'); setGender('Female') } }
        ]}
      />

    </View >
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },

  label: {
    fontSize: 15,
    color: Colors.gray[750],
    fontWeight: '400',
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 8
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[400],
    padding: 12,
    borderRadius: BorderRadius.largest,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.gray[950],
    fontWeight: '400',
  },
})
