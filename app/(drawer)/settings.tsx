import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';

export default function settings() {
  return (
    <ScrollView>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, }}>PREFERENCES</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Weight unit</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: Colors.blue[400], fontSize: 16, fontWeight: 400 }}>kg </Text>
          <Ionicons name='chevron-down' size={16} color={Colors.blue[400]} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Distance unit</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: Colors.blue[400], fontSize: 16, fontWeight: 400 }}>km </Text>
          <Ionicons name='chevron-down' size={16} color={Colors.blue[400]} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Chart vibration</Text>
        <Switch value={true} />
      </View>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.gray[200], paddingBottom: 0 }}>DATA</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Import logs</Text>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Export logs</Text>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Backup in cloud</Text>
      </View>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.gray[200], paddingBottom: 0 }}>FEEDBACK</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Contact Us</Text>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Rate App</Text>
      </View>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.gray[200], paddingBottom: 0 }}>PRIVACY</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Privacy policy</Text>
      </View>
      <Text style={{ color: Colors.gray[650], fontSize: 13, fontWeight: 600, paddingHorizontal: 15, paddingTop: 20, marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.gray[200], paddingBottom: 0 }}>ABOUT</Text>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Build</Text>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 400 }}>Version</Text>
      </View>
      <View style={{ height: 25 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({})