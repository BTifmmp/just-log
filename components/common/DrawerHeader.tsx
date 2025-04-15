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

        <View style={[styles.expand, styles.start]}>
          <Pressable onPress={navigation.openDrawer} style={[styles.backButton]}>
            <View style={{ width: 5 }}></View>
            <Ionicons name="menu-outline" size={24} color={Colors.gray[950]} />
          </Pressable>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text numberOfLines={1} style={[styles.headerTitle, StyleSheet.flatten(options.headerTitleStyle) as TextStyle]}>{title}</Text>
        </View>

        <View style={[styles.expand, styles.end]}>
          {options.headerRight ? options.headerRight({ canGoBack: false }) : undefined}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
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
    fontSize: 17,
    fontWeight: 400,
    color: Colors.gray[950],
  },

  expand: {
    flexGrow: 1,
    flexBasis: 0,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  start: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
