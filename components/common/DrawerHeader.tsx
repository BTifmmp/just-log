import React from 'react';
import { View, Text, Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';

export default function DrawerHeader({ layout, navigation, options, route, }: DrawerHeaderProps) {
  const title = options.title !== undefined ? options.title : route.name;

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <View style={[styles.headerContainer, StyleSheet.flatten(options.headerStyle) as ViewStyle]}>

        <Pressable onPress={navigation.openDrawer} style={styles.backButton}>
          <Ionicons name="menu-outline" size={24} color={Colors.gray[950]} />
        </Pressable>
        <Text numberOfLines={1} style={[styles.headerTitle, StyleSheet.flatten(options.headerTitleStyle) as TextStyle]}>{title}</Text>
        {options.headerRight ? options.headerRight({ canGoBack: false }) : undefined}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: Colors.gray[50],
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray[300]
  },
  backButton: {
    padding: 10,
    marginLeft: 5
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 400,
    color: Colors.gray[950],
  },
});
