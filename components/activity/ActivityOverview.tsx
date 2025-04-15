import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles'
import { formatDurationHourMinute } from '@/scripts/date';
import Animated, { FadeOutRight, FadeInLeft } from 'react-native-reanimated';



type ActivityOverviewProps = {
  volume?: number
  duration?: number
}

export default function ActivityOverview({ volume = 0, duration = 0 }: ActivityOverviewProps) {
  return (
    <Animated.View style={styles.container} entering={FadeInLeft.duration(150)} exiting={FadeOutRight.duration(150)}>
      <View style={styles.section}>
        <Text style={styles.label}>Volume</Text>
        <Text style={styles.value}>{volume.toFixed(1)} kg</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.section}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{formatDurationHourMinute(duration)}</Text>
      </View>
    </Animated.View>
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
    fontSize: 20,
    fontWeight: '400',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray[400],
    marginHorizontal: 10,
    marginVertical: 10,
  },
});