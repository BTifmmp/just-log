import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { logsTable } from '@/db/schema';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { getStats } from '@/scripts/exercise_stats';
import { getTimeAgo } from '@/scripts/date';
import { useEffect, useMemo, useState } from 'react';
import { usePreferredWeightUnit } from '../common/PrefferedWeightUnitProvider';
import { convertWeight, kgToLb } from '@/scripts/converter';


type ExerciseOverviewScreenProps = {
  logs: typeof logsTable.$inferSelect[]
  name: string
}

export default function ExerciseOverview({ logs, name }: ExerciseOverviewScreenProps) {
  const stats = useMemo(() => getStats(logs), [logs]);
  const { unit } = usePreferredWeightUnit();

  return (
    <ScrollView nestedScrollEnabled style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Last Log</Text>
            <Text style={styles.value}>{stats.latestDate != -1 ? getTimeAgo(stats.latestDate) : 'no log'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rowItem}>
            <Text style={styles.label}>Last Set</Text>
            <Text style={styles.value}>{logs.length > 0 ? `${stats.latestReps} x ${convertWeight(stats.latestWeight, unit)}${unit}` : 'no set'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Personal Records</Text>

        {renderRecord("Max Weight", convertWeight(stats.maxWeight, unit).toString() + ` ${unit}`)}
        {renderRecord("Max Reps", stats.maxReps.toString())}
        {renderRecord("Day Volume", convertWeight(stats.maxDayVolume, unit).toFixed(1) + ` ${unit}`)}
        {renderRecord("Estimated 1RM", convertWeight(stats.estimated1RM, unit) + ` ${unit}`, true)}
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Lifetime Stats</Text>

        {renderRecord("Weight Lifted", Math.round(convertWeight(stats.totalWeight, unit)) + ` ${unit}`)}
        {renderRecord("Reps", stats.totalReps.toString())}
        {renderRecord("Number of Logs", stats.totalLogs.toString(), true)}
      </View>
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}

function renderRecord(label: string, value: string, hideBorderBottom: boolean = false) {
  return (
    <View style={[styles.recordRow, { borderBottomWidth: hideBorderBottom ? 0 : StyleSheet.hairlineWidth }]}>
      <Text style={styles.recordLabel}>{label}</Text>
      <Text style={styles.recordValue}>{value}</Text>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  title: {
    fontWeight: 500,
    fontSize: 20,
    color: Colors.gray[950],
  },
  card: {
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.gray[150],
    // marginHorizontal: -10,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray[300],
    padding: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    borderRadius: BorderRadius.medium,
    marginTop: 5,
    gap: 8,
  },
  rowItem: {
    flex: 1,
    borderRadius: BorderRadius.medium,
    paddingVertical: 8,
  },
  label: {
    color: Colors.gray[750],
    fontSize: 15,
    marginBottom: 5,
  },
  value: {
    color: Colors.gray[950],
    fontSize: 18,
    fontWeight: 400,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray[400],
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    color: Colors.gray[750],
    fontWeight: '400',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  listContainer: {
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.gray[150],
    padding: 12,
    paddingVertical: 0,
    marginTop: 10,
  },
  recordRow: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray[400],
    paddingVertical: 15,
  },
  recordLabel: {
    color: Colors.gray[950],
    fontSize: 16,
  },
  recordValue: {
    color: Colors.gray[750],
    fontSize: 16,
    fontWeight: 400,
  },
});
