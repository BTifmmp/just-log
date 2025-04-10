import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { useState, useEffect } from 'react'
import HistoryExercise from './ExerciseHistoryCard';
import { logsTable } from '@/db/schema';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { TouchableRipple } from 'react-native-paper';
import SpinnerMenuModal from '../common/SpinnerMenuModal';
import { filterLogsByYearAndMonth, groupLogsByDay } from '@/scripts/history';

type ExerciseHistoryScreenProps = {
  logs: typeof logsTable.$inferSelect[];
}

type HistoryExerciseData = {
  date: string;
  volume: number;
  logs: typeof logsTable.$inferSelect[];
}

export default function ExerciseHistoryScreen({ logs }: ExerciseHistoryScreenProps) {
  const [cards, setCards] = useState<HistoryExerciseData[]>();
  const [year, setYear] = useState<string>('ALL');
  const [month, setMonth] = useState<string>('ALL');

  const [modalYearVisible, setModalYearVisible] = useState(false);
  const [modalMonthVisible, setModalMonthVisible] = useState(false);


  useEffect(() => {
    const filtered = filterLogsByYearAndMonth(logs, year, month)
    const formated = groupLogsByDay(filtered)

    setCards(formated);

  }, [logs, year, month])



  const currentYear = new Date().getFullYear();
  const yearOptions: string[] = ['ALL'].concat(Array.from({ length: 30 }, (_, i) => (currentYear - i).toString()));
  const monthOptions: string[] = [
    'ALL',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const DateButton = ({ label, onPress }: { label: string, onPress: () => void }) => (
    <View style={{ borderRadius: BorderRadius.largest, overflow: 'hidden' }}>
      <TouchableRipple rippleColor={Colors.addOpacity(Colors.blue[400], 0.4)} onPress={onPress} style={{ padding: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={styles.filterText}>{label}</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.blue[400]} />
        </View>
      </TouchableRipple >
    </View >
  );

  return (
    <View>
      <SpinnerMenuModal initialSelectedOption={year} onSelect={setYear} visible={modalYearVisible} onRequestClose={() => setModalYearVisible(false)} options={yearOptions} />
      <SpinnerMenuModal initialSelectedOption={month} onSelect={setMonth} visible={modalMonthVisible} onRequestClose={() => setModalMonthVisible(false)} options={monthOptions} />

      <FlatList
        contentContainerStyle={{ paddingTop: 15, paddingHorizontal: 10, paddingBottom: 25 }}
        initialNumToRender={10}
        data={cards} // Use the cards data for rendering the list
        keyExtractor={(item, index) => index.toString()} // Use index as key, or use a unique property if available
        renderItem={({ item }) => (
          <HistoryExercise
            name={item.date} // Display the date as the name
            logsData={item.logs}  // Pass the logs data to each card
            volume={(Math.round(item.volume * 100) / 100).toString()}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.filterContainer}>
            <DateButton
              label={year === 'ALL' ? 'Year' : year}
              onPress={() => setModalYearVisible(true)}
            />
            <DateButton
              label={month === 'ALL' ? 'Month' : month}
              onPress={() => setModalMonthVisible(true)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.addOpacity(Colors.blue[500], 0.2),
    padding: 8,
    borderRadius: BorderRadius.largest,
    marginBottom: 15,
  },
  filterText: {
    color: Colors.blue[400],
    fontWeight: '400',
    fontSize: 17,
  },
});