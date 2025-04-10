import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation, router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import ExerciseOverviewScreen from '@/components/exercise/ExerciseOverviewScreen';
import { Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ExerciseChartsScreen from '@/components/exercise/ExerciseChartsScreen';
import ExerciseHistoryScreen from '@/components/exercise/ExerciseHistoryScreen';
import { useLiveTablesQuery } from '@/db/useLiveTablesQuery';
import { fetchExercise, fetchLogsForExercise } from '@/db/queries';
import { useDb } from '@/components/DBProvider';


const routes = [
  { key: 'overview', title: 'Overview' },
  { key: 'charts', title: 'Charts' },
  { key: 'history', title: 'History' },

];

export default function Exercise() {
  const { id, name } = useLocalSearchParams();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const nav = useNavigation();

  const { db } = useDb();
  const exerciseRes = useLiveTablesQuery(fetchExercise(db, Number(id)), ['exercises']);
  const logsRes = useLiveTablesQuery(fetchLogsForExercise(db, Number(id)), ['logs']);
  const nameLoaded = name ? name : (exerciseRes.data.length > 0 ? exerciseRes.data[0].name : '');

  useEffect(() => {
    nav.setOptions({
      headerStyle: { borderBottomWidth: 0 },
      title: nameLoaded,
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <Button
            compact
            onPressIn={() => { router.navigate({ pathname: '/log/exercise_log', params: { exerciseId: id, name: nameLoaded } }); }}
            labelStyle={{ color: Colors.blue[500], marginHorizontal: 10 }}
            rippleColor={Colors.addOpacity(Colors.blue[300], 0.3)}
          >Log
          </Button>
          <Button
            style={{ transform: [{ translateY: 2 }] }}
            onPressIn={() => { router.navigate('/log/exercise_log'); }}
            labelStyle={{ color: Colors.blue[500] }}
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

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'overview':
        return exerciseRes.data.length > 0 ? <ExerciseOverviewScreen logs={logsRes.data} name={exerciseRes.data[0].name} /> : undefined;
      case 'charts':
        return exerciseRes.data.length > 0 ? <ExerciseChartsScreen logs={logsRes.data} /> : undefined;
      case 'history':
        return exerciseRes.data.length > 0 ? <ExerciseHistoryScreen logs={logsRes.data} /> : undefined;
      default:
        return undefined;
    }
  };

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




