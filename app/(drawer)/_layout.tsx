import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '@/constants/Colors';
import DrawerHeader from '@/components/common/DrawerHeader';
import { IconButton } from 'react-native-paper';


export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        sceneStyle: {
          backgroundColor: Colors.gray[50],
        },
        header: (props) => <DrawerHeader {...props} />
      }}>
        <Drawer.Screen name="activity" options={{
          drawerLabel: 'Activity', title: 'Activity', headerRight: () =>
          (<IconButton onPress={() => { router.navigate('/activity_calendar') }} icon={() =>
            (<Ionicons name='calendar-outline' color={Colors.gray[950]} size={24} />)} />)
        }} />
        <Drawer.Screen name="index" options={{ drawerLabel: 'Track list', title: 'Track list' }} />
        <Drawer.Screen name="one_rep_max" options={{ drawerLabel: '1RM Calculator', title: '1RM Calculator' }} />
        <Drawer.Screen name="wilks_calculator" options={{ drawerLabel: 'Wilks Calculator', title: 'Wilks Calculator' }} />
        <Drawer.Screen name="settings" options={{ drawerLabel: 'Settings', title: 'Settings' }} />
        <Drawer.Screen name="weekly_stats" options={{ drawerLabel: 'Weekly Stats', title: 'Weekly Stats' }} />
        <Drawer.Screen name="monthly_stats" options={{ drawerLabel: 'Monthly Stats', title: 'Monthly Stats' }} />
        <Drawer.Screen name="all_time_stats" options={{ drawerLabel: 'All Time Stats', title: 'All Time Stats' }} />



      </Drawer>
    </GestureHandlerRootView >
  );
}
