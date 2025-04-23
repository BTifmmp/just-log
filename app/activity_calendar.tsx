import { FlatList, StyleSheet, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import Colors from '@/constants/Colors';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { IconButton, TouchableRipple } from 'react-native-paper';
import BorderRadius from '@/constants/Styles';
import { generateMonthsForQuarter } from '@/scripts/date';
import { useDaySelection } from '@/components/activity/DaySelectionContext';
import { router } from 'expo-router';
import { useDb } from '@/components/DBProvider';
import { Ionicons } from '@expo/vector-icons';
import { useLiveTablesQuery } from '@/db/useLiveTablesQuery';
import { fetchActivityByDay } from '@/db/queries';
import SpinnerMenuModal from '@/components/common/SpinnerMenuModal';

function wrapQuarter(index: number): number {
  return ((index % 4) + 4) % 4;
}

type DayCellProps = {
  day: { day: number | undefined; isActive: boolean };
  year: number;
  month: number;
  onSelect: (timestamp: number) => void;
};

const DayCell = ({ day, year, month, onSelect }: DayCellProps) => {
  if (!day.day) {
    return <View style={styles.dayContainer} />;
  }

  return (
    <View style={styles.dayBox}>
      <TouchableHighlight
        underlayColor={Colors.gray[200]}
        onPress={() => onSelect(new Date(year, month, day.day, 0).getTime())}
      >
        <View style={styles.dayContainer}>
          <Text style={[styles.day, day.isActive && { color: Colors.blue[500] }]}>{day.day}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

type MonthBlockProps = {
  name: string;
  year: number;
  month: number;
  daysArray: { day: number | undefined; isActive: boolean }[];
  onSelect: (timestamp: number) => void;
};

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const MonthBlock = ({ name, year, month, daysArray, onSelect }: MonthBlockProps) => {
  return (
    <View style={styles.monthContainer}>
      <Text style={styles.category}>{name}</Text>
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((label, index) => (
          <Text key={index} style={styles.weekdayLabel}>{label}</Text>
        ))}
      </View>
      <FlatList
        data={daysArray}
        keyExtractor={(day, index) => index.toString()}
        initialNumToRender={35}
        removeClippedSubviews
        numColumns={7}
        columnWrapperStyle={{ marginBottom: 5 }}
        renderItem={({ item }) => (
          <DayCell
            day={item}
            year={year}
            month={month}
            onSelect={onSelect}
          />
        )}
      />
    </View>
  );
};


export default function ActivityCalendar() {
  const { db } = useDb();
  const { selectedDay, setSelectedDay } = useDaySelection();

  const { data: activity, error } = useLiveTablesQuery(fetchActivityByDay(db, 0, 2 * 1745358300534), ['logs', 'exercises']);
  const [selectedQuareter, setSelectedQuareter] = useState(Math.floor((new Date().getMonth()) / 4) + 1)

  const activeDaySet = new Set(
    activity.map((val: any) => new Date(val.dayStart).setHours(0, 0, 0, 0))
  );

  const months = generateMonthsForQuarter(new Date(Date.now()).getFullYear() + Math.floor(selectedQuareter / 4), wrapQuarter(selectedQuareter)).map(({ name, year, month, days }) => {
    const daysArray: { day: number | undefined; isActive: boolean }[] = [];

    const firstDayOfWeek = new Date(year, month, 0).getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push({ day: undefined, isActive: false });
    }
    for (let d = 1; d <= days; d++) {
      const timestamp = new Date(year, month, d).setHours(0, 0, 0, 0);
      daysArray.push({
        day: d,
        isActive: activeDaySet.has(timestamp),
      });
    }
    const totalCells = daysArray.length;
    const extra = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < extra; i++) {
      daysArray.push({ day: undefined, isActive: false });
    }

    return { name, year, month, daysArray };
  });


  const handleSelect = (timestamp: number) => {
    setSelectedDay(timestamp);
    router.back();
  };

  const DateButton = ({ label, onPress }: { label: string, onPress: () => void }) => (
    <View style={{ borderRadius: BorderRadius.medium, overflow: 'hidden' }}>
      <TouchableRipple rippleColor={Colors.gray[500]} onPress={onPress} style={{ padding: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={styles.filterText}>{label}</Text>
        </View>
      </TouchableRipple >
    </View >
  );

  const [modalSpinnerVisible, setModalSpinnerVisible] = useState(false);
  const quarterStrings = Array.from({ length: 120 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i * 3);
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const year = date.getFullYear();
    return `${quarter}Q ${year}`;
  });

  const parseQuarterString = (quarterString: string) => {
    const [quarter, year] = quarterString.split('Q').map((s) => s.trim());
    return { quarter: parseInt(quarter, 10), year: parseInt(year, 10) };
  };

  const calculateQuarterDifference = (targetQuarter: number, targetYear: number): number => {
    const now = new Date();
    const currentQuarter = Math.floor(now.getMonth() / 3) + 1;
    const currentYear = now.getFullYear();
    const currentQuarterIndex = (currentYear * 4) + currentQuarter;
    const targetQuarterIndex = (targetYear * 4) + targetQuarter;
    return targetQuarterIndex - currentQuarterIndex + 1;
  };


  return (
    error
      ?
      <View style={styles.container}>
        <Ionicons name="warning-outline" size={40} color={Colors.red[400] || '#ff6b6b'} style={styles.icon} />
        <Text style={styles.title}>Error occured</Text>
        <Text style={styles.subtitle}>An issue occured while loading data.</Text>
      </View>
      :
      <View style={{ flex: 1 }}>
        <SpinnerMenuModal initialSelectedOption={`${wrapQuarter(selectedQuareter) + 1}Q ${new Date(Date.now()).getFullYear() + Math.floor(selectedQuareter / 4)}`} onSelect={(val) => { setSelectedQuareter(calculateQuarterDifference(parseQuarterString(val).quarter, parseQuarterString(val).year)) }} visible={modalSpinnerVisible} onRequestClose={() => setModalSpinnerVisible(false)} options={quarterStrings} />
        <FlatList
          style={{ paddingHorizontal: 15, paddingTop: 15 }}
          data={months}
          initialNumToRender={4}
          keyExtractor={({ year, month }) => `${year}-${month}`}
          ListHeaderComponent={() => (
            <View style={styles.filterContainer}>
              <IconButton
                style={{ margin: 0 }}
                onPress={() => { setSelectedQuareter(selectedQuareter - 1) }}
                icon={() => (
                  <Ionicons name="chevron-back" size={20} color={Colors.gray[950]} />
                )}
              />
              <DateButton
                label={`Q${wrapQuarter(selectedQuareter) + 1} ${new Date(Date.now()).getFullYear() + Math.floor(selectedQuareter / 4)}`}
                onPress={() => { setModalSpinnerVisible(true) }}
              />
              <IconButton
                style={{ margin: 0 }}
                onPress={() => { setSelectedQuareter(selectedQuareter + 1) }}
                icon={() => (
                  <Ionicons name="chevron-forward" size={20} color={Colors.gray[950]} />
                )}
              />
            </View>
          )}
          renderItem={({ item }) => (
            <MonthBlock
              name={item.name}
              year={item.year}
              month={item.month}
              daysArray={item.daysArray}
              onSelect={handleSelect}
            />
          )}
        /></View>

  );
}

const styles = StyleSheet.create({
  activeDayIndicator: {
    width: 6,
    height: 6,
    position: 'absolute',
    backgroundColor: Colors.blue[500],
    bottom: 3,
    borderRadius: 999,
  },

  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  monthContainer: {
    marginBottom: 20,
  },

  category: {
    color: Colors.gray[950],
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 12,
    paddingBottom: 10,
  },

  day: {
    color: Colors.gray[950],
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
    flex: 1,
  },
  dayBox: {
    flex: 1,
    borderRadius: 999,
    overflow: 'hidden',
  },
  filterContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.gray[150],
    padding: 5,
    paddingVertical: 5,
    borderRadius: BorderRadius.medium,
    marginBottom: 15,
    marginHorizontal: -5
  },
  filterText: {
    color: Colors.gray[950],
    fontWeight: '400',
    fontSize: 17,
  },

  weekdayRow: {
    flexDirection: 'row',

  },
  weekdayLabel: {
    flex: 1,
    color: Colors.gray[600],
    fontSize: 14,
    textAlign: 'center',
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
});
