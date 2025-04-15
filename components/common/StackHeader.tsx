import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StackHeader({ navigation, back, options, route, }: NativeStackHeaderProps) {
  const title = options.title !== undefined ? options.title : route.name;

  return (
    <SafeAreaView>
      <View style={[styles.headerContainer, options.headerStyle]}>
        {back ?
          <Pressable onPress={navigation.goBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={Colors.gray[950]} />
          </Pressable>
          :
          undefined
        }
        <Text numberOfLines={1} style={[styles.headerTitle, options.headerTitleStyle]}>{title}</Text>
        {options.headerRight ? options.headerRight({}) : undefined}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    backgroundColor: Colors.gray[50],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray[300],
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  backButton: {
    padding: 10,
    marginLeft: 5
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    marginLeft: 5,
    fontWeight: 400,
    color: Colors.gray[950],
  },
});
