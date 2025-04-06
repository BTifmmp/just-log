import { FlatList, StyleSheet, View, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { TouchableRipple } from 'react-native-paper';
import BorderRadius from '@/constants/Styles';
import { generateMonths } from '@/scripts/date';

export default function ActivityCalendar() {
  const activeDays: Record<number, Record<number, number[]>> = {
    2025: {
      3: [1, 5, 10], // March
      4: [3, 15, 20], // April
      5: [7, 14, 21], // May
      6: [2, 18, 25], // June
    },
  };

  const months = generateMonths()

  const isActiveDay = (year: number, month: number, day: number) =>
    activeDays[year]?.[month]?.includes(day);

  return (
    <FlatList
      style={{ paddingHorizontal: 15, paddingTop: 10 }}
      data={months}
      keyExtractor={({ year, month }) => `${year}-${month}`}
      renderItem={({ item: { name, year, month, days } }) => {
        const fullWeeks = Math.floor(days / 7) * 7;
        const extraDays = days % 7;

        // Generate the days including empty placeholders for last row
        const daysArray = [
          ...Array.from({ length: days }, (_, i) => i + 1),
          ...Array(7 - extraDays).fill(null), // Fill last row with placeholders
        ];

        return (
          <View style={styles.monthContainer}>
            <Text style={styles.category}>{name} {year}</Text>
            <FlatList
              data={daysArray}
              keyExtractor={(day, index) => index.toString()}
              numColumns={7}
              columnWrapperStyle={{ marginBottom: 5 }}
              renderItem={({ item: day }) =>
                day ? (
                  <View style={{ flex: 1, borderRadius: BorderRadius.largest, overflow: 'hidden' }}>
                    <TouchableRipple rippleColor={Colors.gray[300]} onPress={() => { }}>
                      <View style={styles.dayContainer}>
                        <Text style={[styles.day]}>{day}</Text>
                        {isActiveDay(year, month, day) && <View style={styles.activeDayIndicator} />}
                      </View>
                    </TouchableRipple>
                  </View>
                ) : (
                  <View style={[styles.dayContainer]} />
                )
              }
            />
          </View >
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  activeDayIndicator: {
    width: 6,
    height: 6,
    position: 'absolute',
    backgroundColor: Colors.blue[500],
    bottom: 3,
    borderRadius: 999
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
    color: Colors.gray[750],
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
    flex: 1,
  },
});