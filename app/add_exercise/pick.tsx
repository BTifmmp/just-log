import { SectionList, StyleSheet, View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from 'expo-router';
import PickCard from '@/components/exercise_lists/PickCard';
import Colors, { randomColor } from '@/constants/Colors';
import React from 'react'
import ExercisePickHeader from '@/components/common/ExercisePickHeader';
import { useLiveTablesQuery } from '@/db/useLiveTablesQuery';
import { addToTrackingList, fetchAllExercises, removeFromTrackingList } from '@/db/queries';
import { useDb } from '@/components/DBProvider';
import { exerciseTable } from '@/db/schema';
import ErrorModal from '@/components/common/ErrorModal';
import { useSnackbar } from '@/components/common/PersistantSnackbarProvider';
import { Ionicons } from '@expo/vector-icons';
import BorderRadius from '@/constants/Styles';

export default function Pick() {
  useEffect(() => {
    nav.setOptions({
      header: (props: any) => <ExercisePickHeader {...props} categories={categories} onCategoryChange={setSelectedCategory} onSearchChange={setSearchText} />,
    })
  })

  const { db } = useDb();
  const { registerSnackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const { data, error } = useLiveTablesQuery(fetchAllExercises(db), ['exercises']);

  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const groupedExercises: { [key: string]: any } = {};
  data.forEach((exercise: typeof exerciseTable.$inferInsert) => {
    if (!groupedExercises[exercise.category]) {
      groupedExercises[exercise.category] = [];
    }
    groupedExercises[exercise.category].push(exercise);
  });

  const DATA = Object.keys(groupedExercises).map(category => ({
    title: category,
    data: groupedExercises[category],
  }));

  const categories = ['All'].concat(DATA.map((item) => item.title))
  const nav = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');


  const [filteredData, setFilteredData] = useState<any>();
  useEffect(() => {
    setFilteredData(DATA
      .filter(section => selectedCategory === 'All' || section.title === selectedCategory)
      .map(section => ({
        ...section,
        data: section.data.filter((item: typeof exerciseTable.$inferInsert) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      }))
      .filter(section => section.data.length > 0))
  }, [searchText, selectedCategory, data]);


  async function updateTracking(id: number, tracked: boolean, name: string) {
    try {
      await tracked ? addToTrackingList(db, id) : removeFromTrackingList(db, id);
      registerSnackbar('exercise_pick_track',
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 10 }}>
          <Text style={{ fontSize: 15, color: Colors.gray[950] }}>{`${name} has been ${tracked ? 'added to tracking list' : 'removed from tracking list'}`}</Text>
        </View>,
        2000);
      showSnackbar('exercise_pick_track')
    } catch {
      setIsErrorVisible(true);
    }
  }

  return (
    error
      ?
      <View style={styles.container}>
        <Ionicons name="warning-outline" size={40} color={Colors.red[400] || '#ff6b6b'} style={styles.icon} />
        <Text style={styles.title}>Error occured</Text>
        <Text style={styles.subtitle}>An issue occured while loading data.</Text>
      </View>
      :
      <View>
        <ErrorModal title='Error occured' message='Could not update track list. Please try again.' visible={isErrorVisible} onClose={() => { setIsErrorVisible(false) }} />
        <SectionList
          contentContainerStyle={{ paddingBottom: 300 }}
          showsVerticalScrollIndicator={false}
          sections={filteredData ? filteredData : []}
          decelerationRate="fast"
          overScrollMode='auto'
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={({ item }: any) => <PickCard isTracked={item.is_tracked} id={item.id} onActionPress={() => { updateTracking(item.id, !item.is_tracked, item.name) }} color={item.color} title={item.name} />}
          renderSectionHeader={({ section: { title } }) => (<View style={{ backgroundColor: Colors.gray[50], padding: 10, marginLeft: 5, marginBottom: -5, marginTop: 5 }}>
            <Text style={{ fontSize: 17, fontWeight: 400, color: Colors.gray[700] }}>{title}</Text>
          </View>)}
          ItemSeparatorComponent={() => (<View style={{ borderBottomWidth: 1, borderColor: Colors.spacer }} />)}
        />
      </View>
  )
}

const styles = StyleSheet.create({
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