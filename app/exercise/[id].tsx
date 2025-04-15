import { StyleSheet, View, useWindowDimensions, Text, Pressable } from 'react-native'
import { useState, useEffect, memo, useRef } from 'react'
import { useNavigation, router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import ExerciseOverviewScreen from '@/components/exercise/ExerciseOverviewScreen';
import { Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ExerciseChartsScreen from '@/components/exercise/ExerciseChartsScreen';
import ExerciseHistoryScreen from '@/components/exercise/ExerciseHistoryScreen';
import { useLiveTablesQuery } from '@/db/useLiveTablesQuery';
import { addToTrackingList, deleteExercise, fetchExercise, fetchLogsForExercise, removeFromTrackingList } from '@/db/queries';
import { useDb } from '@/components/DBProvider';
import BorderRadius from '@/constants/Styles';
import MenuBottomModal, { ModalMenuElement } from '@/components/common/MenuBottomModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ErrorModal from '@/components/common/ErrorModal';


const routes = [
  { key: 'overview', title: 'Overview' },
  { key: 'charts', title: 'Charts' },
  { key: 'history', title: 'History' },

];

const MemoizedOverviewScreen = memo(({ logs, name }: { logs: any; name: string }) => {
  return <ExerciseOverviewScreen logs={logs} name={name} />;
});

const MemoizedChartsScreen = memo(({ logs }: { logs: any }) => {
  return <ExerciseChartsScreen logs={logs} />;
});

const MemoizedHistoryScreen = memo(({ logs }: { logs: any }) => {
  return <ExerciseHistoryScreen logs={logs} />;
});

export default function Exercise() {
  const { id, name } = useLocalSearchParams();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const modalRef = useRef<BottomSheetModal>(null);

  const nav = useNavigation();

  const { db } = useDb();
  const exerciseRes = useLiveTablesQuery(fetchExercise(db, Number(id)), ['exercises']);
  const logsRes = useLiveTablesQuery(fetchLogsForExercise(db, Number(id)), ['logs']);
  const nameLoaded = name ? name : (exerciseRes.data.length > 0 ? exerciseRes.data[0].name : '');
  const errorOccured = (exerciseRes.error && logsRes.error);

  useEffect(() => {
    nav.setOptions({
      headerStyle: { borderBottomWidth: !errorOccured ? 0 : StyleSheet.hairlineWidth },
      title: nameLoaded,
      headerRight: () => (
        !errorOccured && <View style={{ flexDirection: 'row' }}>
          <Button
            compact
            onPressIn={() => { router.navigate({ pathname: '/log/exercise_log', params: { exerciseId: id, name: nameLoaded } }); }}
            labelStyle={{ color: Colors.blue[500], marginHorizontal: 10 }}
            rippleColor={Colors.addOpacity(Colors.blue[300], 0.3)}
          >Log
          </Button>
          <Button
            style={{ transform: [{ translateY: 2 }] }}
            onPressIn={() => { modalRef.current?.present() }}
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
        return exerciseRes.data.length > 0 ? <MemoizedOverviewScreen logs={logsRes.data} name={exerciseRes.data[0].name} /> : undefined;
      case 'charts':
        return <MemoizedChartsScreen logs={logsRes.data} />;
      case 'history':
        return <MemoizedHistoryScreen logs={logsRes.data} />;
      default:
        return null;
    }
  };

  async function onAddToTracked() {
    try {
      const res = addToTrackingList(db, Number(id))
    } catch (e) {
      setIsErrorVisible(true);
    }

  }

  async function onRemoveFromTracked() {
    try {
      const res = removeFromTrackingList(db, Number(id))
    } catch (e) {
      setIsErrorVisible(true);
    }
  }

  async function onDeleteExercise() {
    try {
      const res = deleteExercise(db, Number(id))
      router.back()
    } catch (e) {
      setIsErrorVisible(true);
    }
  }


  return (
    <View style={{ flex: 1 }}>
      <View>
        <ErrorModal title='Error occured' message='An issue occurred while updating the data. Please try again.' visible={isErrorVisible} onClose={() => { setIsErrorVisible(false) }} />
      </View>

      {!errorOccured ?
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
        :
        <View style={styles.container}>
          <Ionicons name="warning-outline" size={40} color={Colors.red[400] || '#ff6b6b'} style={styles.icon} />
          <Text style={styles.title}>Error occured</Text>
          <Text style={styles.subtitle}>An issue occured while loading data.</Text>
        </View>}

      <MenuBottomModal
        modalRef={modalRef}
        elements={[
          exerciseRes.data.length > 0 && exerciseRes.data[0].is_tracked && { label: 'Stop tracking', iconName: 'remove', onPress: onRemoveFromTracked },
          exerciseRes.data.length > 0 && !exerciseRes.data[0].is_tracked && { label: 'Start tracking', iconName: 'add', onPress: onAddToTracked },
          // exerciseRes.data.length > 0 && exerciseRes.data[0].is_user_added && { label: 'Edit', iconName: 'build-outline' },
          exerciseRes.data.length > 0 && exerciseRes.data[0].is_user_added && { color: '#ff6b6b', label: 'Delete', iconName: 'trash-bin-outline', onPress: onDeleteExercise }
        ].filter((item) => item != false) as ModalMenuElement[]} />

    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray[950],
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray[750],
    textAlign: 'center',
  },
});

