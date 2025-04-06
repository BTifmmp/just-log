import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles'
import { LinearGradient } from 'expo-linear-gradient';


type ActivityOverviewProps = {
  volume?: number
  durationInSeconds?: number
}

export default function ActivityOverview({ volume = 0, durationInSeconds = 0 }: ActivityOverviewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Volume</Text>
        <Text style={styles.value}>{volume} kg</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.section}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{durationInSeconds}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.largest,
    padding: 12,
    paddingVertical: 5,
    gap: 8,
    flexDirection: 'row',
    backgroundColor: Colors.gray[150],

  },
  section: {
    flex: 1,
    borderRadius: BorderRadius.largest,
    paddingVertical: 8,
  },
  label: {
    color: Colors.gray[750],
    fontSize: 15,
    marginBottom: 3,
  },
  value: {
    color: Colors.gray[950],
    fontSize: 22,
    fontWeight: '400',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray[400],
    marginHorizontal: 10,
    marginVertical: 10,
  },
});