import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation, router } from 'expo-router';
import Colors from '@/constants/Colors';
import ExerciseOverviewScreen from '@/components/exercise/ExerciseOverviewScreen';
import { Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ExerciseChartsScreen from '@/components/exercise/ExerciseChartsScreen';
import ExerciseHistoryScreen from '@/components/exercise/ExerciseHistoryScreen';



const renderScene = SceneMap({
  overview: ExerciseOverviewScreen,
  charts: ExerciseChartsScreen,
  history: ExerciseHistoryScreen,
});

const routes = [
  { key: 'overview', title: 'Overview' },
  { key: 'charts', title: 'Charts' },
  { key: 'history', title: 'History' },

];

export default function Exercise() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      headerStyle: { borderBottomWidth: 0 },
      title: 'Bench press (barbell)',
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <Button
            compact
            onPressIn={() => { router.navigate({ pathname: '/log/exercise_log', params: { log_id: 'hi', name: 'Bench Press' } }); }}
            labelStyle={{ color: Colors.blue[400], marginHorizontal: 10 }}
            rippleColor={Colors.addOpacity(Colors.blue[300], 0.3)}
          >Log
          </Button>
          <Button
            style={{ transform: [{ translateY: 2 }] }}
            onPressIn={() => { router.navigate('/log/exercise_log'); }}
            labelStyle={{ color: Colors.blue[400] }}
            rippleColor={Colors.gray[200]}
            compact={true}
          ><Ionicons name="ellipsis-vertical" size={18} color={Colors.gray[950]} />
          </Button>
        </View>
      )
    })
  })

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      contentContainerStyle={{}}
      indicatorStyle={{ backgroundColor: Colors.blue[500], height: 3 }}
      activeColor={Colors.blue[500]}
      pressColor='transparent'
      style={{ marginTop: -5, backgroundColor: Colors.gray[50], borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.gray[300] }}
    />
  );


  return (
    <TabView
      swipeEnabled={false}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}




