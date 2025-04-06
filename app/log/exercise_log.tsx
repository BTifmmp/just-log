import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput, Button } from 'react-native-paper';
import StyledTextInput from '@/components/common/StyledTextInput';


type LogRowProps = {
  onRemove: (id: number) => void;
  onChange: (id: number, field: 'reps' | 'weight', value: string) => void;
  showRemove: boolean,
  reps?: string;
  weight?: string;
  id: number;
}

function LogRow({ onChange, onRemove, weight = '', reps = '', id, showRemove }: LogRowProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', padding: 5, left: Number(showRemove) * -45, backgroundColor: Colors.gray[150], borderRadius: BorderRadius.largest, marginBottom: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 5, justifyContent: 'center' }}>
        <View style={[styles.buttonWrapper, {
        }]}>
          <Button
            compact
            onPress={() => onChange(id, 'reps', Math.max(Number(reps) - 1, 0).toString())}
            style={[styles.sideButton, {
            }]}
            labelStyle={styles.buttonLabel}>
            <Ionicons name="remove" size={20} color={Colors.gray[750]} />
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <StyledTextInput
            value={reps}
            onChangeText={(val) => { onChange(id, 'reps', val) }}
            placeholder='Reps'
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            compact
            onPress={() => onChange(id, 'reps', (Number(reps) + 1).toString())}
            style={[styles.sideButton, {
            }]}
            labelStyle={styles.buttonLabel}>
            <Ionicons name="add" size={20} color={Colors.gray[750]} />
          </Button>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 5, justifyContent: 'center' }}>
        <View style={[styles.buttonWrapper, {
        }]}>
          <Button
            compact
            onPress={() => onChange(id, 'weight', Math.max(Number(weight) - 10, 0).toString())}
            style={[styles.sideButton, {
            }]}
            labelStyle={styles.buttonLabel}>
            <Ionicons name="remove" size={20} color={Colors.gray[750]} />
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <StyledTextInput
            value={weight}
            onChangeText={(val) => { onChange(id, 'weight', val) }}
            placeholder='Reps'
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            compact
            onPress={() => onChange(id, 'weight', (Number(weight) + 10).toString())}
            style={[styles.sideButton, {}]}
            labelStyle={styles.buttonLabel}>
            <Ionicons name="add" size={20} color={Colors.gray[750]} />
          </Button>
        </View>
      </View>

      {showRemove && <Button compact={true} rippleColor={Colors.gray[400]} onPress={() => { onRemove(id) }} labelStyle={{ marginVertical: 4, marginHorizontal: 4 }} style={{ position: 'absolute', right: -45, borderRadius: 99 }}><Ionicons name="close" size={20} color={Colors.gray[950]} style={{ paddingHorizontal: 5 }} /></Button>}
    </View >)
}


export default function ExerciseLog() {
  const { log_id, name } = useLocalSearchParams();
  const nav = useNavigation();

  const [showRemove, setShowRemove] = useState(false);

  useEffect(() => { nav.setOptions({ title: `New ${name} Log` }); })


  const [setsList, setSetsList] = useState<{ id: number, reps: string | undefined, weight: string | undefined }[]>([]);

  function addSet() {
    const newSet = {
      id: Date.now(),
      reps: '8',
      weight: '80',
    };
    setSetsList([...setsList, newSet]);
  }

  function removeSet(id: number) {
    setSetsList(setsList.filter(set => set.id !== id));
    setShowRemove(false)
  }

  function updateSet(id: number, field: 'reps' | 'weight', value: string) {
    setSetsList((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [field]: value } : set))
    );
  }

  useEffect(() => {
    addSet();
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: 15, paddingTop: 20 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 500, marginTop: 0, marginBottom: 15 }}>Weight Step <Text style={{ color: Colors.blue[400], fontSize: 14, flex: 1, fontWeight: 400, textAlign: 'center' }}>(kg)</Text></Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20, }}>
          <View style={{ padding: 4, paddingHorizontal: 20, borderWidth: 2, borderColor: Colors.blue[500], borderRadius: BorderRadius.large, backgroundColor: Colors.gray[200] }}><Text style={{ color: Colors.gray[950], fontSize: 16, textAlign: 'center', fontWeight: 500 }}>10</Text></View>
          <View style={{ padding: 5, paddingHorizontal: 20, borderWidth: 1, borderColor: Colors.gray[200], borderRadius: BorderRadius.large, backgroundColor: Colors.gray[200] }}><Text style={{ color: Colors.gray[750], fontSize: 16, textAlign: 'center', fontWeight: 400 }}>5</Text></View>
          <View style={{ padding: 5, paddingHorizontal: 20, borderWidth: 1, borderColor: Colors.gray[200], borderRadius: BorderRadius.large, backgroundColor: Colors.gray[200] }}><Text style={{ color: Colors.gray[750], fontSize: 16, textAlign: 'center', fontWeight: 400 }}>2.5</Text></View>
          <View style={{ padding: 5, paddingHorizontal: 20, borderWidth: 1, borderColor: Colors.gray[200], borderRadius: BorderRadius.large, backgroundColor: Colors.gray[200] }}><Text style={{ color: Colors.gray[750], fontSize: 16, textAlign: 'center', fontWeight: 400 }}>1.25</Text></View>
        </View>
        <Text style={{ color: Colors.gray[950], fontSize: 16, fontWeight: 500, marginTop: 0, marginBottom: 0 }}>Sets</Text>

        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingBottom: 10 }}>
          <Text style={{ color: Colors.gray[700], fontSize: 12, flex: 1, fontWeight: 600, marginTop: 0, marginBottom: 0, textAlign: 'center' }}>REPS</Text>
          <Text style={{ color: Colors.gray[700], fontSize: 12, flex: 1, fontWeight: 600, marginTop: 0, marginBottom: 0, textAlign: 'center' }}>WEIGHT</Text>

        </View>

        {
          setsList.map((log, index) => {
            return (
              <LogRow showRemove={showRemove} key={index} id={log.id} onRemove={removeSet} onChange={updateSet} reps={log.reps} weight={log.weight} />
            )
          })
        }
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 15, marginBottom: 60, paddingHorizontal: '10%' }}>
          <Button
            onPress={addSet}
            style={{ flex: 1, borderRadius: 99, backgroundColor: Colors.gray[200] }}
            rippleColor={Colors.gray[450]}
            labelStyle={{ color: Colors.gray[950], fontSize: 15, marginVertical: 8 }}
          >Add</Button>
          <Button
            onPress={() => setShowRemove(!showRemove)}
            style={{ flex: 1, borderRadius: 99, backgroundColor: Colors.gray[200] }}
            rippleColor={Colors.gray[450]}
            labelStyle={{ color: Colors.gray[950], fontSize: 15, marginVertical: 8 }}
          >{showRemove ? "Discard" : "Remove"}</Button>
        </View></View>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20, marginTop: 20 }}>
        <Button
          onPress={() => { }}
          style={{ borderRadius: BorderRadius.largest, backgroundColor: Colors.blue[500] }}
          rippleColor={Colors.blue[300]}
          labelStyle={{ color: Colors.gray[950], fontSize: 16, paddingVertical: 3 }}
        >Log</Button>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButton: {
    backgroundColor: Colors.gray[350],
    height: 40,
    width: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    marginHorizontal: 0,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    backgroundColor: Colors.gray[50],
    color: Colors.gray[950],
  },
});