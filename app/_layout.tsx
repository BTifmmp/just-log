import { StyleSheet } from 'react-native';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Stack, router } from 'expo-router';
import Colors from '@/constants/Colors';
import * as SystemUI from 'expo-system-ui';
import { PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import StackHeader from '@/components/common/StackHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { DbProvider } from '@/components/DBProvider';
import { PersistentSnackbarProvider } from '@/components/common/PersistantSnackbarProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DaySelectionProvider } from '@/components/activity/DaySelectionContext';
import Storage from 'expo-sqlite/kv-store';
import { PreferredWeightUnitProvider } from '@/components/common/PrefferedWeightUnitProvider';

const expo = SQLite.openDatabaseSync('tracky1.db', { enableChangeListener: true });
const db = drizzle(expo);

export default function StackLayout() {
  useDrizzleStudio(expo)
  const { success, error } = useMigrations(db, migrations);

  db.run('PRAGMA foreign_keys = ON');

  const weightUnit = Storage.getItemSync('weight_unit');
  if (weightUnit == null) {
    Storage.setItemSync('weight_unit', 'kg');
  }
  const chartVibration = Storage.getItemSync('chart_vibration');
  if (chartVibration == null) {
    Storage.setItemSync('chart_vibration', 'on');
  }

  SystemUI.setBackgroundColorAsync(Colors.gray[50]);

  if (error) {
    return undefined;
  }

  if (!success) {
    return undefined;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.gray[50]} style="light" />
      <DbProvider db={db}>
        <PaperProvider >
          <ThemeProvider value={DarkTheme}>
            <PreferredWeightUnitProvider>
              <PersistentSnackbarProvider>
                <DaySelectionProvider>
                  <BottomSheetModalProvider>
                    <Stack initialRouteName='(drawer)' screenOptions={{
                      statusBarBackgroundColor: Colors.gray[50],
                      statusBarStyle: 'light',
                      contentStyle: { backgroundColor: Colors.gray[50] },
                      header: (props) => <StackHeader {...props} />
                    }}>
                      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                      <Stack.Screen name="exercise/[id]" options={{ title: '', }} />
                      <Stack.Screen name="log/exercise_log" options={{ title: 'New Bench Press Log' }} />
                      <Stack.Screen name="add_exercise/pick" options={{
                        title: 'Add Exercise',
                        headerRight: () => <Button
                          onPressIn={() => { router.navigate({ pathname: '/add_exercise/create' }) }}
                          labelStyle={{ color: Colors.blue[500] }}
                          rippleColor={Colors.addOpacity(Colors.blue[300], 0.3)}
                        >Create
                        </Button>
                      }} />
                      <Stack.Screen name="add_exercise/create" options={{ title: 'Create exercise' }} />
                      <Stack.Screen name="activity_calendar" options={{ title: 'Activity Calendar' }} />
                    </Stack>
                  </BottomSheetModalProvider >
                </DaySelectionProvider>
              </PersistentSnackbarProvider>
            </PreferredWeightUnitProvider>
          </ThemeProvider>
        </PaperProvider>
      </DbProvider>
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