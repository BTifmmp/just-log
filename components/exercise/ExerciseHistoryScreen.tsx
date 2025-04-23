import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { useState, useEffect } from 'react'
import HistoryExercise from './ExerciseHistoryCard';
import { logsTable } from '@/db/schema';
import { TouchableRipple } from 'react-native-paper';
import SpinnerMenuModal from '../common/SpinnerMenuModal';
import { filterLogsByYearAndMonth, groupLogsByDay } from '@/scripts/history';
import { deleteLog } from '@/db/queries';
import { useDb } from '../DBProvider';
import Animated, { FadeIn, SlideInDown, SlideInUp, SlideOutDown } from 'react-native-reanimated';
import ErrorModal from '../common/ErrorModal';
import { usePreferredWeightUnit } from '../common/PrefferedWeightUnitProvider';
import { convertWeight } from '@/scripts/converter';

type ExerciseHistoryScreenProps = {
  logs: typeof logsTable.$inferSelect[];
}

type HistoryExerciseData = {
  date: string;
  volume: number;
  logs: typeof logsTable.$inferSelect[];
}

export default function ExerciseHistoryScreen({ logs }: ExerciseHistoryScreenProps) {
  const { db } = useDb();
  const [cards, setCards] = useState<HistoryExerciseData[]>();
  const [year, setYear] = useState<string>('ALL');
  const [month, setMonth] = useState<string>('ALL');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const [modalYearVisible, setModalYearVisible] = useState(false);
  const [modalMonthVisible, setModalMonthVisible] = useState(false);

  const [selectedLogId, setSelectedLogId] = useState<number | undefined>(undefined);
  const { unit } = usePreferredWeightUnit();


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

  async function removeLog(id: number) {
    try {
      const res = await deleteLog(db, id);
      setSelectedLogId(undefined);
    } catch (e) {
      setIsErrorVisible(true);
    }
  }

  function getSelectedOrUndefined(logs: any[]) {
    return logs.some(log => log.id == selectedLogId) ? selectedLogId : undefined
  }

  const DateButton = ({ label, onPress }: { label: string, onPress: () => void }) => (
    <View style={{ borderRadius: BorderRadius.medium, overflow: 'hidden' }}>
      <TouchableRipple rippleColor={Colors.gray[500]} onPress={onPress} style={{ padding: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={styles.filterText}>{label}</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.gray[950]} />
        </View>
      </TouchableRipple >
    </View >
  );

  return (
    logs.length == 0 ?
      <View style={styles.container}>
        <Text style={styles.title}>No actvitiy yet</Text>
        <Text style={styles.subtitle}>Once you add your first log, all your activity for this exercise will be tracked here.</Text>
      </View>
      :
      <View style={{ flex: 1 }}>
        <ErrorModal title='Error occured' message='An issue occurred while removing the log. Please try again.' visible={isErrorVisible} onClose={() => { setIsErrorVisible(false) }} />
        <SpinnerMenuModal initialSelectedOption={year} onSelect={setYear} visible={modalYearVisible} onRequestClose={() => setModalYearVisible(false)} options={yearOptions} />
        <SpinnerMenuModal initialSelectedOption={month} onSelect={setMonth} visible={modalMonthVisible} onRequestClose={() => setModalMonthVisible(false)} options={monthOptions} />
        <FlatList
          contentContainerStyle={{ paddingTop: 15, paddingHorizontal: 10, paddingBottom: 25 }}
          initialNumToRender={10}
          data={cards} // Use the cards data for rendering the list
          keyExtractor={(item, index) => index.toString()} // Use index as key, or use a unique property if available
          renderItem={({ item }) => (
            <HistoryExercise
              unit={unit}
              name={item.date} // Display the date as the name
              logsData={item.logs}
              volume={(convertWeight(item.volume, unit)).toString()}
              selectedLogId={getSelectedOrUndefined(item.logs)}
              onLogSelect={setSelectedLogId}
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

        {selectedLogId != undefined && <Animated.View exiting={SlideOutDown} style={styles.removeModalContainer}>
          <View style={{ borderRadius: BorderRadius.medium, overflow: 'hidden', flex: 1 }}>
            <TouchableRipple
              rippleColor={Colors.gray[400]}
              onPress={() => setSelectedLogId(undefined)}
              style={styles.modalButton}
            >
              <Text style={{ color: Colors.gray[950] }}>Dismiss</Text>
            </TouchableRipple>
          </View>
          <View style={{ borderRadius: BorderRadius.medium, overflow: 'hidden', flex: 1 }}>
            <TouchableRipple
              rippleColor={Colors.gray[400]}
              onPress={() => removeLog(selectedLogId)}
              style={styles.modalButton}
            >
              <Text style={{ color: Colors.red[400] }}>Remove log</Text>
            </TouchableRipple>
          </View>
        </Animated.View>}

      </View >
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
    backgroundColor: Colors.gray[150],
    padding: 10,
    paddingVertical: 5,
    marginTop: 5,
    borderRadius: BorderRadius.medium,
    marginBottom: 20,
  },
  filterText: {
    color: Colors.gray[950],
    fontWeight: '400',
    fontSize: 17,
  },

  removeModalContainer: {
    backgroundColor: Colors.gray[150],
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    gap: 10,
    borderTopWidth: 1,
    borderColor: Colors.gray[400],
    elevation: 10,
  },

  modalButton: {
    padding: 10,
    backgroundColor: Colors.gray[300],
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
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
    width: '70%',
    fontSize: 14,
    color: Colors.gray[750],
    textAlign: 'center',
  },

});