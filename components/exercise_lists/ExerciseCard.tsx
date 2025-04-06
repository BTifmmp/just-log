// import { Button } from '@/components/buttons/Buttons';
import { Image } from 'expo-image';
import { Href, Link, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Divider, Menu } from 'react-native-paper';


type ExerciseCardProps = {
  title: string
  lastLog: string
  img: any
  exerciseHref: string
}


export default function ExerciseCard({ title, lastLog, img, exerciseHref }: ExerciseCardProps) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', }} >
        <Pressable onPress={() => { router.navigate(exerciseHref as Href) }} style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Image source={img} style={styles.imageStyle} />
            <View>
              <Text style={styles.cardText}>{title}</Text>
              <Text style={styles.cardTextSecondary}>{lastLog}</Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.buttonCenterWrap}>
          <Button
            mode='text'
            dark={true}
            style={{ borderRadius: BorderRadius.large, }}
            onPress={() => { router.navigate({ pathname: '/log/exercise_log', params: { log_id: 'hi', name: 'Bench Press' } }); }}
            labelStyle={{ color: Colors.blue[500], fontWeight: 400, fontFamily: 'sans-serif', marginHorizontal: 0, fontSize: 15 }}
            rippleColor={Colors.addOpacity(Colors.blue[300], 0.3)}
          >Log
          </Button>
        </View>
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  buttonCenterWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageStyle: {
    width: 55,
    height: 55,
    borderRadius: BorderRadius.medium,
  },

  card: {
    padding: 11,
    backgroundColor: Colors.gray[150],
    borderRadius: BorderRadius.largest,
    marginBottom: 10,
  },

  cardText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 400,
  },

  cardTextSecondary: {
    color: Colors.gray[750],
    fontSize: 14,
  },

});