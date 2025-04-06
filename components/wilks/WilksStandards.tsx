import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';

export default function WilksStandards() {
  const wilksRanges = [
    { range: "< 200", level: "Beginner", description: "New to lifting. Focus on building technique and consistency." },
    { range: "200 - 300", level: "Novice", description: "Developing strength and gaining experience with heavier weights." },
    { range: "300 - 350", level: "Intermediate", description: "Stronger than most gym-goers. Solid lifting experience." },
    { range: "350 - 400", level: "Advanced", description: "Well-developed strength. Competitive at a local level." },
    { range: "400 - 450", level: "Elite", description: "Exceptional strength. Competitive at a national level." },
    { range: "450 - 500", level: "World-Class", description: "Among the strongest lifters. Competitive at an international level." },
    { range: "500 +", level: "Legendary", description: "A rare level of strength, achieved by top-tier athletes." },
  ];

  return (
    <View style={{ backgroundColor: Colors.gray[150], borderRadius: BorderRadius.largest, padding: 10, marginTop: 10 }}>
      {wilksRanges.map((item, index) => (
        <View key={index} style={[{ paddingVertical: 10, borderColor: Colors.gray[500], }, index !== 0 && { borderTopWidth: StyleSheet.hairlineWidth }]}>
          <Text numberOfLines={1} style={styles.rowText}>{item.range}</Text>
          <Text style={styles.descriptionText}>
            {item.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 15,
    color: Colors.gray[750],
    lineHeight: 20,
    marginTop: -5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  rowText: {
    flex: 1,
    color: Colors.gray[950],
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5
  },
});
