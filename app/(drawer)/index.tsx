import { SectionList, StyleSheet, View, Text } from 'react-native'
import ExerciseCard from '@/components/exercise_lists/ExerciseCard';
import { ExerciseImages } from '@/constants/Images';
import Colors from '@/constants/Colors';
import { FAB } from 'react-native-paper';
import { router } from 'expo-router'
import { useDb } from '@/components/DBProvider';
import { formatUnixDate } from '@/scripts/date';
import { exerciseTable } from '@/db/schema';
import { fetchTrackedExerciseWithLatestLog } from '@/db/queries';
import { useLiveTablesQuery } from '@/db/useLiveTablesQuery';
import { Ionicons } from '@expo/vector-icons';

export default function ExerciseList() {
  const { db } = useDb();
  const { data, error } = useLiveTablesQuery(fetchTrackedExerciseWithLatestLog(db), ['logs', 'exercises']);

  const groupedExercises: { [key: string]: any } = {};
  data.forEach((exercise: typeof exerciseTable.$inferInsert) => {
    if (!groupedExercises[exercise.category]) {
      groupedExercises[exercise.category] = [];
    }
    groupedExercises[exercise.category].push(exercise);
  });

  const DATA = Object.keys(groupedExercises).map(category => ({
    title: category.toUpperCase(),
    data: groupedExercises[category],
  }));

  return (
    error
      ?
      <View style={styles.container} >
        <Ionicons name="warning-outline" size={40} color={Colors.red[400] || '#ff6b6b'} style={styles.icon} />
        <Text style={styles.title}>Error occured</Text>
        <Text style={styles.subtitle}>An issue occured while loading data.</Text>
      </View >
      :
      <View style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingBottom: 20 + 80, paddingHorizontal: 10, paddingTop: 5 }}
          showsVerticalScrollIndicator={false}
          sections={DATA}
          decelerationRate="fast"
          overScrollMode='auto'
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: any) =>
            <ExerciseCard
              title={item.name}
              exerciseId={item.exerciseId}
              lastLog={item.last_log_date ? `${item.reps} x ${item.weight}kg   ${formatUnixDate(item.last_log_date, false)}` : 'No logs added'}
              img={ExerciseImages.bench} />
          }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.category}>{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</Text>
          )}
        />
        < FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.navigate('/add_exercise/pick')}
          color={Colors.gray[950]}
          rippleColor={Colors.blue[300]}
          customSize={64}
          mode='elevated'
        />
      </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    marginBottom: 25,
    borderRadius: 999,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.blue[500],
  },

  category: {
    color: Colors.gray[950],
    fontSize: 16,
    fontWeight: 500,
    paddingVertical: 12,
    paddingBottom: 10,
    marginLeft: 5
  },
  container: {
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
})