import { useColorScheme, View, Text, StyleSheet } from 'react-native';
import { useEffect, useState, useRef, useCallback } from 'react';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Stack, router } from 'expo-router';
import Colors from '@/constants/Colors';
import * as SystemUI from 'expo-system-ui';
import { PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import StackHeader from '@/components/common/StackHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';


export default function StackLayout() {
  const systemTheme = useColorScheme(); // Detects system theme
  const [theme, setTheme] = useState(systemTheme || 'light');
  useEffect(() => {
    setTheme("dark"); // Set the app to dark mode once after render
  }, []); // Empty array ensures it only runs once

  SystemUI.setBackgroundColorAsync(Colors.gray[50]);

  const expo = SQLite.openDatabaseSync('db.db');
  const db = drizzle(expo);

  return (
    <GestureHandlerRootView>
      <PaperProvider >
        <ThemeProvider value={DarkTheme}>
          <StatusBar backgroundColor={Colors.gray[50]} style="light" />
          <Stack initialRouteName='(drawer)' screenOptions={{
            contentStyle: { backgroundColor: Colors.gray[50] },
            header: (props) => <StackHeader {...props} />
          }}>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="exercise/[name]" options={{ title: '', }} />
            <Stack.Screen name="log/exercise_log" options={{ title: 'New Bench Press Log' }} />
            <Stack.Screen name="add_exercise/pick" options={{
              title: 'Add Exercise',
              headerRight: () => <Button
                onPressIn={() => { router.navigate({ pathname: '/add_exercise/create' }) }}
                labelStyle={{ color: Colors.blue[400] }}
                rippleColor={Colors.addOpacity(Colors.blue[300], 0.3)}
              >Create
              </Button>
            }} />
            <Stack.Screen name="add_exercise/create" options={{ title: 'Create exercise' }} />
            <Stack.Screen name="activity_calendar" options={{ title: 'Activity Calendar' }} />

          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
})