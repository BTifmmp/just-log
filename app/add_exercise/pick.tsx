import { SectionList, StyleSheet, View, Text } from 'react-native'
import { useState, useEffect, useMemo } from 'react'
import { useNavigation, router } from 'expo-router';
import PickCard from '@/components/exercise_lists/PickCard';
import Colors from '@/constants/Colors';
import React from 'react'
import ExercisePickHeader from '@/components/common/ExercisePickHeader';
import { ExerciseImages } from '@/constants/Images';


export default function Pick() {
  useEffect(() => {
    nav.setOptions({
      header: (props: any) => <ExercisePickHeader {...props} categories={categories} onCategoryChange={setSelectedCategory} onSearchChange={setSearchText} />,
    })
  })

  const DATA = [
    {
      title: 'Chest',
      data: [
        { id: '1', name: 'Bench Press' },
        { id: '2', name: 'Incline Dumbbell Press' },
        { id: '3', name: 'Chest Flys' },
        { id: '4', name: 'Push-ups' },
        { id: '5', name: 'Dips' },
      ],
    },
    {
      title: 'Biceps',
      data: [
        { id: '6', name: 'Barbell Curl' },
        { id: '7', name: 'Hammer Curl' },
        { id: '8', name: 'Concentration Curl' },
        { id: '9', name: 'Preacher Curl' },
        { id: '10', name: 'Cable Curl' },
      ],
    },
    {
      title: 'Legs',
      data: [
        { id: '11', name: 'Squats' },
        { id: '12', name: 'Leg Press' },
        { id: '13', name: 'Lunges' },
        { id: '14', name: 'Leg Extensions' },
        { id: '15', name: 'Calf Raises' },
      ],
    },
    {
      title: 'Back',
      data: [
        { id: '16', name: 'Pull-ups' },
        { id: '17', name: 'Deadlifts' },
        { id: '18', name: 'Bent-over Rows' },
        { id: '19', name: 'Lat Pulldown' },
        { id: '20', name: 'Seated Cable Row' },
      ],
    },
    {
      title: 'Shoulders',
      data: [
        { id: '21', name: 'Overhead Press' },
        { id: '22', name: 'Lateral Raises' },
        { id: '23', name: 'Front Raises' },
        { id: '24', name: 'Reverse Flys' },
        { id: '25', name: 'Shrugs' },
      ],
    },
    {
      title: 'Abs',
      data: [
        { id: '26', name: 'Crunches' },
        { id: '27', name: 'Planks' },
        { id: '28', name: 'Hanging Leg Raises' },
        { id: '29', name: 'Russian Twists' },
        { id: '30', name: 'Bicycle Crunches' },
      ],
    },
  ];
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
        data: section.data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
      }))
      .filter(section => section.data.length > 0))
  }, [searchText, selectedCategory]);

  return (
    <View>
      <SectionList
        contentContainerStyle={{ paddingBottom: 300 }}
        showsVerticalScrollIndicator={false}
        sections={filteredData ? filteredData : []}
        decelerationRate="fast"
        overScrollMode='auto'
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({ item }: any) => { return (<PickCard onAdd={() => { }} imgSrc={ExerciseImages.bench} title={item.name} />) }}
        renderSectionHeader={({ section: { title } }) => (<View style={{ backgroundColor: Colors.gray[50], padding: 10, marginLeft: 5, marginBottom: -5, marginTop: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.gray[700] }}>{title}</Text>
        </View>)}
        ItemSeparatorComponent={() => (<View style={{ borderBottomWidth: 1, borderColor: Colors.spacer }} />)}
      />
    </View>
  )
}

const styles = StyleSheet.create({})