import { SectionList, StyleSheet, View, Text } from 'react-native'
import ExerciseCard from '@/components/exercise_lists/ExerciseCard';
import { ExerciseImages } from '@/constants/Images';
import Colors from '@/constants/Colors';
import { FAB } from 'react-native-paper';
import { router } from 'expo-router'

export default function ExerciseList() {
  const DATA = [
    {
      title: 'CHEST',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'TRICPES',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'LEGS',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'SHOULDERS',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  return (
    <View >
      <SectionList
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10, paddingTop: 5 }}
        showsVerticalScrollIndicator={false}
        sections={DATA}
        decelerationRate="fast"
        overScrollMode='auto'
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }: any) =>
          <ExerciseCard title="Bench Press" exerciseHref='/exercise/bench_press' lastLog='13 x 80kg   12 Dec' img={ExerciseImages.bench} />
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