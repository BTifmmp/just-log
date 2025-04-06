import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { Button } from 'react-native-paper';

type CategoryPickProps = {
  categories: string[]
  onCategoryChange: (category: string) => void
}

export default function CategoryPick({ categories, onCategoryChange }: CategoryPickProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  return (
    <View style={styles.categoryContainer}>
      {categories.map((category, index) => (
        <Button
          onPress={() => { setSelectedCategory(category); onCategoryChange(category) }}
          key={index}
          textColor={Colors.gray[650]}
          rippleColor={Colors.gray[300]}
          style={[styles.categoryBadge, selectedCategory == category && styles.categoryBadgeSelected]}
          labelStyle={[styles.categoryText, selectedCategory == category && styles.categoryTextSelected]}
        >
          {category}
        </Button>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 20
  },
  categoryBadge: {
    borderColor: Colors.gray[300],
    borderWidth: 1,
    borderRadius: 999
  },
  categoryText: {
    color: Colors.gray[650],
    fontSize: 15,
    fontFamily: 'sans-serif',
    fontWeight: '400',
    marginVertical: 8,
    marginHorizontal: 15
  },

  categoryTextSelected: {
    color: Colors.gray[950],
    fontWeight: '500',
  },

  categoryBadgeSelected: {
    borderColor: Colors.blue[500],
  },
})