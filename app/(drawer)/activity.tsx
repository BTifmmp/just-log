import { StyleSheet, Text, View, } from 'react-native'
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import Colors from '@/constants/Colors';
import DayBox from '@/components/activity/DayBox';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import ActivityExercise from '@/components/activity/ActivityExercise';
import { useDb } from '@/components/DBProvider';
import { useLiveTablesQuery } from '@/db/useLiveTablesQuery';
import { fetchActivityByDay, fetchLogsForDay } from '@/db/queries';
import { groupLogsByExercise, getDaysInMonth } from '@/scripts/activity';
import { formatUnixDateHourMinute, getMonthUnixSpread } from '@/scripts/date';
import { getCurrentDayStartMs } from '@/scripts/date';
import { useDaySelection } from '@/components/activity/DaySelectionContext';
import { useAnimatedRef } from 'react-native-reanimated';
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/component/ScrollView';

export default function activity() {
  const { selectedDay } = useDaySelection()
  const { db } = useDb()

  const [dayStartMs, setDayStartMs] = useState<number>(getCurrentDayStartMs()); // Initialize with current day's start
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date(dayStartMs).getDate() - 1)
  const scrollHorizRef = useAnimatedRef<AnimatedScrollView>();
  useLayoutEffect(() => {
    if (selectedDay) {
      const newIndex = new Date(selectedDay).getDate() - 1
      setDayStartMs(selectedDay);
      setSelectedDayIndex(newIndex);
      setScroll(newIndex * (55 + 8))
    }
  }, [selectedDay])

  const setScroll = (val: number) => {
    setTimeout(() => {
      if (scrollHorizRef) {
        scrollHorizRef.current?.scrollTo({ x: val, y: 0, animated: false })
      }
    }, 1)

  }

  const days = getDaysInMonth(new Date(dayStartMs));
  const { start, end } = getMonthUnixSpread(new Date(dayStartMs))

  const { data, error } = useLiveTablesQuery(fetchLogsForDay(db, dayStartMs), ['logs', 'exercises'], [dayStartMs]);
  const { data: activity, error: activityError } = useLiveTablesQuery(fetchActivityByDay(db, start, end), ['logs', 'exercises'], [dayStartMs]);

  const grouped = groupLogsByExercise(data); // Group logs by exercise
  // const workoutDuration = calculateWorkoutDuration(data); // Calculate workout duration
  // const totalVolume = calculateTotalVolume(data); // Calculate total volume

  return (
    error || activityError
      ?
      <View style={styles.container}>
        <Ionicons name="warning-outline" size={40} color={Colors.red[400] || '#ff6b6b'} style={styles.icon} />
        <Text style={styles.title}>Error occured</Text>
        <Text style={styles.subtitle}>An issue occured while loading data.</Text>
      </View>
      :
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <Text style={styles.selectedDayText}>{days[selectedDayIndex]?.day} {new Date(dayStartMs).getFullYear() != new Date().getFullYear() ? new Date(dayStartMs).getFullYear() : ''}</Text>
          <ScrollView ref={scrollHorizRef} horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <View style={styles.dayRow} >
              {days.map((day, index) => (
                <DayBox
                  onLayout={index == days.length - 1 ? () => setScroll(selectedDayIndex * (55 + 8)) : undefined}
                  key={index}
                  onPress={() => { setSelectedDayIndex(index), setDayStartMs(day.startMs) }}
                  dayWeekName={day.weekday}
                  dayNumber={index + 1}
                  selected={selectedDayIndex == index}
                  hasActivity={activity.some((val: any) => (val.dayStart >= day.startMs && val.dayStart < day.startMs + 86400000))}
                />
              ))}
            </View>
          </ScrollView>
          {data.length > 0 ?
            <>
              {/* <Text style={styles.exercisesTitle}>Logs</Text> */}
              {grouped.map((item, index) =>
                <ActivityExercise
                  key={index + item.volume}
                  volume={item.volume}
                  exerciseId={item.exerciseId ?? undefined}
                  name={item.exerciseName ?? 'Not found'}
                  logsData={item.logs.map((log: any) => ({
                    time: formatUnixDateHourMinute(log.date),
                    reps: log.reps,
                    weight: log.weight
                  }))}
                />
              )}
            </>
            :
            <View style={styles.noLogsContainer}>
              <Text style={styles.noLogsTitle}>No logs</Text>
              <Text style={styles.noLogsText}>
                Looks like you have not logged any exercises for this day.
              </Text>
            </View>
          }

          <View style={{ height: 5 }} />
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  selectedDayText: {
    fontWeight: '500',
    fontSize: 24,
    color: Colors.gray[950],
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 5
  },
  horizontalScroll: {
    marginHorizontal: -15,
    marginBottom: 20
  },
  dayRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 15
  },
  exercisesTitle: {
    color: Colors.gray[950],
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5
  },
  noLogsContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  noLogsTitle: {
    fontSize: 20,
    color: Colors.gray[950],
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 15,
    fontWeight: '500'
  },
  noLogsText: {
    fontSize: 16,
    color: Colors.gray[750],
    textAlign: 'center',
    width: '70%'
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
