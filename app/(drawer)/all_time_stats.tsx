import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import BorderRadius from '@/constants/Styles'
import { useDb } from '@/components/DBProvider'
import {
  getAllTimeStats,
  getDaysActive,
  getFavoriteExercises,
  getLogsByCategory
} from '@/db/queries'
import { useLiveTablesQuery } from '@/db/useLiveTablesQuery'
import { Ionicons } from '@expo/vector-icons'
import { usePreferredWeightUnit } from '@/components/common/PrefferedWeightUnitProvider'
import { convertWeight } from '@/scripts/converter'

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
)

export default function AllTimeStatsScreen() {
  const { db } = useDb()
  const { unit } = usePreferredWeightUnit();

  const { data: allTime, error: allError } = useLiveTablesQuery(getAllTimeStats(db), ['logs', 'exercises']);
  const { data: active, error: activeError } = useLiveTablesQuery(getDaysActive(db), ['logs']);
  const { data: logsCat, error: catError } = useLiveTablesQuery(getLogsByCategory(db), ['logs', 'exercises']);
  const { data: fav, error: exError } = useLiveTablesQuery(getFavoriteExercises(db, 5), ['logs', 'exercises']);

  const errorOccured = allError || activeError || catError || exError;

  return (
    errorOccured
      ?
      <View style={styles.containerError}>
        <Ionicons name="warning-outline" size={40} color={Colors.red[400] || '#ff6b6b'} style={styles.icon} />
        <Text style={styles.title}>Error occured</Text>
        <Text style={styles.subtitle}>An issue occured while loading data.</Text>
      </View>
      :
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Lifts totals</Text>
        <View style={styles.row}>
          <StatCard label="Weight" value={`${convertWeight(allTime?.[0]?.totalWeight, unit).toFixed(0) ?? 0} ${unit}`} />
          <StatCard label="Reps" value={allTime?.[0]?.totalReps ?? 0} />
        </View>

        <Text style={styles.sectionTitle}>Days active</Text>
        <View style={styles.row}>
          <StatCard label="Month" value={active?.[0]?.monthCount ?? 0} />
          <StatCard label="Year" value={active?.[0]?.yearCount ?? 0} />
          <StatCard label="All" value={active?.[0]?.allCount ?? 0} />
        </View>

        <Text style={styles.sectionTitle}>Logs by category</Text>
        {logsCat.length > 0
          ?
          <View style={styles.stack}>
            {logsCat?.map((log, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.itemText}>{log.category}</Text>
                <Text style={styles.itemText}>{log.logCount} <Text style={{ color: Colors.gray[750] }}>logs</Text></Text>
              </View>
            ))}
          </View>
          :
          <Text style={[styles.itemText, { textAlign: 'center', paddingVertical: 30 }]}>No logs added</Text>}

        <Text style={styles.sectionTitle}>Favorite exercises</Text>
        {fav.length > 0
          ?
          <View style={styles.stack}>
            {fav?.map((ex, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.itemText}>{ex.name}</Text>
                <Text style={styles.itemText}>{ex.logCount} <Text style={{ color: Colors.gray[750] }}>logs</Text></Text>
              </View>
            ))}
          </View>
          :
          <Text style={[styles.itemText, { textAlign: 'center', paddingVertical: 30 }]}>No logs added</Text>}
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerError: {
    margin: 10,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray[950],
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray[750],
    textAlign: 'center',
  },

  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    color: Colors.gray[950],
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 15,
    marginTop: 30,
  },
  statCard: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.gray[150],
    borderRadius: BorderRadius.medium,
  },
  statLabel: {
    color: Colors.gray[750],
    marginBottom: 5,
    fontSize: 15,
  },
  statValue: {
    color: Colors.gray[950],
    fontSize: 20,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  stack: {
    gap: 5,
  },
  itemRow: {
    padding: 15,
    backgroundColor: Colors.gray[150],
    borderRadius: BorderRadius.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: Colors.gray[950],
    fontSize: 16,
  },
})
