import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import BorderRadius from '@/constants/Styles'
import { TouchableRipple } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

type DayBoxProps = {
  dayNumber: number
  dayWeekName: String
  hasActivity?: boolean
  selected?: boolean
  onPress?: () => void
}

export default function DayBox({ dayNumber, dayWeekName, hasActivity = false, selected = false, onPress }: DayBoxProps) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.wrapper}>
        <TouchableRipple style={[styles.container, { borderColor: selected ? Colors.blue[500] : Colors.gray[150] }]} onPress={onPress}>
          <View style={styles.content}>
            <Text style={[styles.dayWeekName, { color: Colors.gray[650] }]}>{dayWeekName}</Text>
            <Text style={[styles.dayNumber, { color: selected ? Colors.gray[950] : Colors.gray[700] }]}>{dayNumber}</Text>
          </View>
        </TouchableRipple>
      </View>
      {hasActivity && <Ionicons name="ellipse" size={12} color={Colors.blue[500]} style={styles.activityIcon} />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: BorderRadius.medium,
    overflow: 'hidden',
    marginBottom: 25,
  },
  container: {
    height: 70,
    width: 55,
    // backgroundColor: Colors.gray[150],
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
  },
  content: {
    alignItems: 'center',
    gap: 5,
  },
  dayWeekName: {
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 5,
  },
  dayNumber: {
    fontSize: 22,
    fontWeight: '400',
  },
  activityIcon: {
    position: 'absolute',
    bottom: 5,

  },



  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
})