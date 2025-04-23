import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Button, IconButton } from 'react-native-paper';
import BorderRadius from '@/constants/Styles';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

type ImagePickProps = {
  onImageSelect: (uri: string) => void
}

export default function ImagePick({ onImageSelect }: ImagePickProps) {
  const [selectedImage, setSelectedImage] = useState<string>('')


  const pickImageCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0].uri);
      setSelectedImage(result.assets[0].uri)
    }
  };

  const pickImageLib = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0].uri);
      setSelectedImage(result.assets[0].uri)
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingBottom: 10 }}>
        <View style={styles.imagePlaceholder}>
          {!selectedImage ? <Ionicons name='image' color={Colors.gray[750]} size={24} /> : <Image source={selectedImage} style={styles.imagePlaceholder} />}
          {selectedImage && <IconButton
            onPress={() => { setSelectedImage(''); onImageSelect('') }}
            style={{ position: 'absolute', top: -12, right: -12 }}
            containerColor={Colors.red[500]}
            size={8}
            rippleColor={Colors.red[300]}
            icon={() => <Ionicons name='close' color={Colors.gray[950]} size={18} />}
          />}
        </View>
        <Button
          mode="text"
          onPress={pickImageLib}
          textColor={Colors.gray[850]}
          labelStyle={{ fontSize: 15, fontFamily: 'sans-serif' }}
          rippleColor={Colors.gray[300]}
          icon={() => <Ionicons name='albums' color={Colors.gray[750]} size={18} />}
        >
          Library
        </Button>
        <Button
          mode="text"
          onPress={pickImageCamera}
          textColor={Colors.gray[850]}
          labelStyle={{ fontSize: 15, fontFamily: 'sans-serif' }}
          rippleColor={Colors.gray[300]}
          icon={() => <Ionicons name='camera' color={Colors.gray[750]} size={18} />}
        >
          Camera
        </Button>
      </View>
      <View style={{ flexDirection: 'row', borderRadius: BorderRadius.medium }}>
        <Text style={styles.imageNote}>If no image provided, one will be generated based on name.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePlaceholder: {
    height: 60,
    width: 60,
    borderRadius: BorderRadius.medium,
    backgroundColor: Colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageNote: {
    color: Colors.gray[650],
    fontSize: 13,
    flex: 1
  },
})