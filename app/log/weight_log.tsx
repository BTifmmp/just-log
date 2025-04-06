import { Pressable, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { Button } from 'react-native-paper';
import StyledTextInput from '@/components/common/StyledTextInput';


export default function ExerciseLog() {
  const [weight, setWeight] = useState('');

  return (
    <ScrollView style={{ paddingHorizontal: 15, paddingTop: 20 }}>
      <View style={{ flex: 1, marginBottom: 10 }}>
        <StyledTextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
        />
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 60 }}>
        <Button
          onPress={() => { }}
          style={{ flex: 1, borderRadius: BorderRadius.largest, backgroundColor: Colors.blue[500] }}
          rippleColor={Colors.blue[300]}
          labelStyle={{ color: Colors.gray[950], fontSize: 16 }}
        >Log</Button>
      </View>
      <View style={{ height: 150 }} />
    </ScrollView >
  )
}