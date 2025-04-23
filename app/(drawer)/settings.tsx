import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';
import { TouchableRipple } from 'react-native-paper';
import Storage from 'expo-sqlite/kv-store';
import BorderRadius from '@/constants/Styles';
import { Link } from 'expo-router';
import { usePreferredWeightUnit } from '@/components/common/PrefferedWeightUnitProvider';
import * as Application from 'expo-application';

export default function settings() {
  const { unit, setUnit } = usePreferredWeightUnit();

  const chartVibration = Storage.getItemSync('chart_vibration');
  const [chartVibrationState, setChartVibrationState] = useState(chartVibration);



  function toggleWeight() {
    if (unit == 'kg') {
      setUnit('lb')
    } else if (unit == 'lb') {
      setUnit('kg')
    }
  }

  function toggleChartVibration() {
    if (chartVibration == 'on' || chartVibration == null) {
      Storage.setItemSync('chart_vibration', 'off');
      setChartVibrationState('off')
    }
    else if (chartVibration == 'off') {
      Storage.setItemSync('chart_vibration', 'on');
      setChartVibrationState('on')
    }
  }

  return (
    <ScrollView>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, }}>PREFERENCES</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Weight unit</Text>
        <View style={{ borderRadius: 99, overflow: 'hidden' }}>
          <TouchableRipple rippleColor={Colors.addOpacity(Colors.blue[300], 0.2)} style={{ padding: 5 }} onPress={toggleWeight}>
            <Text style={{ color: Colors.blue[400], fontSize: 16, fontWeight: 400 }}>{unit?.toUpperCase()}</Text>
          </TouchableRipple>
        </View>
      </View>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.gray[200], paddingBottom: 0 }}>FEEDBACK</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Contact Us</Text>
        <Text style={{ color: Colors.gray[750], fontSize: 16, fontWeight: 400 }}>beturapps@gmail.com</Text>

      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Link href='https://play.google.com/store/apps/details?id=com.beturapps.just_log'><Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Rate This App</Text></Link>
      </View>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.gray[200], paddingBottom: 0 }}>PRIVACY</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Link href='https://sites.google.com/view/beturapps/privacy-policy'><Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Privacy Policy</Text></Link>
      </View>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.gray[200], paddingBottom: 0 }}>ABOUT</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Build</Text>
        <Text style={{ color: Colors.gray[750], fontSize: 16, fontWeight: 400 }}>{Application.nativeBuildVersion}</Text>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Version</Text>
        <Text style={{ color: Colors.gray[750], fontSize: 16, fontWeight: 400 }}>{Application.nativeApplicationVersion}</Text>
      </View>
      <View style={{ height: 25 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({})