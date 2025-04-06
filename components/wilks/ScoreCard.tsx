import { StyleSheet, Text, View } from 'react-native'
import Colors from '@/constants/Colors'
import BorderRadius from '@/constants/Styles'
import React from 'react'

export type ScoreCardProps = {
  gender?: string
  bodyweight?: string
  score?: string
  benchpress?: string
  deadlift?: string
  squat?: string
  total?: string
  isSeparate?: boolean
}

export default function ScoreCard({ gender, bodyweight, score, benchpress, deadlift, squat, total, isSeparate = false }: ScoreCardProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.highlightedText]}>Wilks score</Text>
      <Text style={[styles.highlightedText, styles.highlightedTextLarge]}>{score}</Text>
      <Text style={styles.subTitle}>
        Based on
      </Text>
      <View style={[styles.row, styles.rowBorder]}>
        <Text numberOfLines={1} style={styles.rowText}>Gender</Text>
        <Text numberOfLines={1} style={styles.rowText}>{gender}</Text>
      </View>
      <View style={[styles.row, styles.rowBorder]}>
        <Text numberOfLines={1} style={styles.rowText}>Bodyweight</Text>
        <Text numberOfLines={1} style={styles.rowText}>{bodyweight} kg</Text>
      </View>
      {!isSeparate ?
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.rowText}>Total</Text>
          <Text numberOfLines={1} style={styles.rowText}>{total} kg</Text>
        </View>
        :
        <View>
          <View style={[styles.row, styles.rowBorder]}>
            <Text numberOfLines={1} style={styles.rowText}>Bench press</Text>
            <Text numberOfLines={1} style={styles.rowText}>{benchpress} kg</Text>
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Text numberOfLines={1} style={styles.rowText}>Deadlift</Text>
            <Text numberOfLines={1} style={styles.rowText}>{deadlift} kg</Text>
          </View>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.rowText}>Squat</Text>
            <Text numberOfLines={1} style={styles.rowText}>{squat} kg</Text>
          </View>
        </View>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.gray[150],
    marginBottom: 20,
    borderRadius: BorderRadius.largest,
    marginTop: 35,
    paddingBottom: 5,
  },

  subTitle: {
    color: Colors.gray[750],
    fontWeight: '400',
    fontSize: 17,
    marginTop: 20,
  },

  highlightedText: {
    fontSize: 16,
    color: Colors.gray[950],
    fontWeight: '600',
  },

  highlightedTextLarge: {
    fontSize: 40,
    fontWeight: '500',
    marginLeft: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  rowBorder: {
    borderBottomColor: Colors.gray[400],
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowText: {
    fontWeight: '400',
    color: Colors.gray[950],
    fontSize: 16,
  },
})
