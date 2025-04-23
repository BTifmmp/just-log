import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { TextInput, Button } from 'react-native-paper';
import BorderRadius from '@/constants/Styles';
import CategoryPick from '@/components/create/CategoryPick';
import ErrorModal from '@/components/common/ErrorModal';
import { createExercise, updateExercise } from '@/db/queries';
import { useDb } from '@/components/DBProvider';
import { Ionicons } from '@expo/vector-icons';
import { useSnackbar } from '@/components/common/PersistantSnackbarProvider';
import { router, useLocalSearchParams } from 'expo-router';

export default function Edit() {
  const { db } = useDb();
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const { registerSnackbar, showSnackbar } = useSnackbar();

  const { id: paramId, name: paramName, category: paramCategory } = useLocalSearchParams();

  if (!paramId || !paramName || !paramCategory) {
    router.back()
  }

  useLayoutEffect(() => {
    console.log(paramName, paramId, paramCategory)
    setName(paramName as string)
    setCategory(paramCategory as string)
  }, [])

  async function createExerciseCallback() {
    try {
      if (name != '' && category != '') {
        const res = await updateExercise(db, Number(paramId), name, category)
        if (res.changes == 0) {
          setIsErrorVisible(true)
        } else {
          registerSnackbar('edit_exercise_snack',
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 10 }}>
              <Ionicons name='checkmark-sharp' size={18} color={Colors.gray[50]} style={{ backgroundColor: 'rgb(58, 199, 88)', padding: 2, borderRadius: 99 }} />
              <Text style={{ fontSize: 15, color: Colors.gray[950] }}>{`${name} updated succesfully`}</Text>
            </View>,
            3000);
          showSnackbar('edit_exercise_snack')
          router.back();
        }
      }
    } catch {
      setIsErrorVisible(true)
    }

  }

  return (
    <ScrollView style={{ paddingHorizontal: 15 }} contentContainerStyle={styles.contentContainer}>
      <ErrorModal title='Error occured' message='An issue occurred while saving the data. Please try again.' visible={isErrorVisible} onClose={() => { setIsErrorVisible(false) }} />
      <View style={styles.formContainer}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="Name"
          mode='outlined'
          style={styles.textInput}
          contentStyle={{ borderRadius: BorderRadius.medium }}
          outlineStyle={{ borderRadius: BorderRadius.large, borderWidth: 1 }}
          outlineColor={Colors.gray[400]}
          activeOutlineColor={Colors.gray[650]}
          placeholderTextColor={Colors.gray[550]}
        />
        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <CategoryPick selectedCategory={category} onCategoryChange={setCategory} categories={[
          'Chest',
          'Back',
          'Shoulders',
          'Biceps',
          'Triceps',
          'Forearms',
          'Core & Abs',
          'Calves',
          'Legs',
          'Other'
        ]} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 20 }}>
        <Button
          onPress={createExerciseCallback}
          style={styles.createButton}
          rippleColor={Colors.blue[300]}
          labelStyle={styles.buttonLabel}
        >Save
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  label: {
    color: Colors.gray[950],
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10
  },

  textInput: {
    backgroundColor: Colors.gray[50],
    color: Colors.gray[950],
    fontSize: 16,
    paddingVertical: 3,
    height: 45
  },


  createButton: {
    flex: 1,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.blue[500],
    marginTop: 60
  },

  buttonLabel: {
    color: Colors.gray[950],
    fontSize: 16,
    paddingVertical: 3
  }
});
