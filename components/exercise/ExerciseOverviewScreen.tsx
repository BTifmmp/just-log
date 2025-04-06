import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import BorderRadius from '@/constants/Styles';
import { router } from 'expo-router';

export default function ExerciseOverview() {
  return (
    <ScrollView nestedScrollEnabled style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>Bench press</Text>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Last Log</Text>
            <Text style={styles.value}>5 days ago</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rowItem}>
            <Text style={styles.label}>Last Set</Text>
            <Text style={styles.value}>10 x 213 kg</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Personal Records</Text>
      <View style={styles.listContainer}>
        {renderRecord("Max Weight", "156 kg")}
        {renderRecord("Max Reps", "13")}
        {renderRecord("Day Volume", "2134 kg")}
        {renderRecord("Estimated 1RM", "213 kg", true)}
      </View>

      <Text style={styles.sectionTitle}>Lifetime Stats</Text>
      <View style={styles.listContainer}>
        {renderRecord("Weight Lifted", "1564 kg")}
        {renderRecord("Reps", "213")}
        {renderRecord("Volume", "213344 kg")}
        {renderRecord("Number of Logs", "213", true)}
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
    fontSize: 22,
    color: Colors.gray[950],
  },
  card: {
    borderRadius: BorderRadius.largest,
    backgroundColor: Colors.gray[150],
    padding: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    borderRadius: BorderRadius.largest,
    marginTop: 5,
    gap: 8,
  },
  rowItem: {
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
    fontWeight: 400,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray[400],
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    color: Colors.gray[650],
    fontWeight: '400',
    fontSize: 17,
    marginTop: 20,
    marginLeft: 5
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  recordRow: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray[500],
    paddingVertical: 15,
  },
  recordLabel: {
    color: Colors.gray[950],
    fontSize: 16,
  },
  recordValue: {
    color: Colors.gray[950],
    fontSize: 16,
    fontWeight: 500,
  },
});
