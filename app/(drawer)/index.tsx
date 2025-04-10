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

export default function ExerciseList() {
  const { db } = useDb();
  const { data, error, updatedAt } = useLiveTablesQuery(fetchTrackedExerciseWithLatestLog(db), ['logs', 'exercises']);

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
    <View >
      <SectionList
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10, paddingTop: 5 }}
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
        customSize={65}
        mode='elevated'
      />
    </View >
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 25,
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
});