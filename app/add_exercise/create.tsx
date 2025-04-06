import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { TextInput, Button } from 'react-native-paper';
import BorderRadius from '@/constants/Styles';
import ImagePick from '@/components/create/ImagePick';
import CategoryPick from '@/components/create/CategoryPick';

export default function Create() {
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')



  return (
    <ScrollView style={{ paddingHorizontal: 15 }} contentContainerStyle={styles.contentContainer}>
      <View style={styles.formContainer}>
        {/* Image */}
        <Text style={styles.label}>Add Image</Text>
        <ImagePick onImageSelect={(uri: string) => { }} />
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          onChangeText={setName}
          placeholder="Name"
          mode='outlined'
          style={styles.textInput}
          contentStyle={{ borderRadius: BorderRadius.largest }}
          outlineStyle={{ borderRadius: BorderRadius.large, borderWidth: 1 }}
          outlineColor={Colors.gray[400]}
          activeOutlineColor={Colors.gray[650]}
          placeholderTextColor={Colors.gray[550]}
        />
        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <CategoryPick onCategoryChange={setCategory} categories={["Chest", "Legs", "Biceps", "Triceps", "Shoulders", "Abs & Core", "Full body", "Cardio"]} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 20 }}>
        <Button
          onPress={() => { console.log({ name, category }) }}
          style={styles.createButton}
          rippleColor={Colors.blue[300]}
          labelStyle={styles.buttonLabel}
        >Create
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
    borderRadius: BorderRadius.largest,
    backgroundColor: Colors.blue[500],
    marginTop: 60
  },

  buttonLabel: {
    color: Colors.gray[950],
    fontSize: 16,
    paddingVertical: 3
  }
});
