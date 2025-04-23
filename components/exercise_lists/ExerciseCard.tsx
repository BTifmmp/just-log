// import { Button } from '@/components/buttons/Buttons';
import { Image } from 'expo-image';
import { Href, Link, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { Button } from 'react-native-paper';
import { RelativePathString } from 'expo-router';
import { Thumbnail } from '@/components/exercise/ExerciseThumbnail';


type ExerciseCardProps = {
  title: string
  lastLog: string
  color: string
  exerciseId: any
}


export default function ExerciseCard({ title, lastLog, color, exerciseId }: ExerciseCardProps) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', }} >
        <Pressable onPress={() => {
          router.navigate({
            pathname: `/exercise/${exerciseId}` as RelativePathString,
            params: { exerciseId: Number(exerciseId), name: title }
          })
        }} style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 10, marginRight: 60 }}>
            <Thumbnail name={title} borderRadius={BorderRadius.small} fontSize={22} backgroundColor={color} textColor={Colors.gray[950]} size={50} />
            <View>
              <Text style={styles.cardText}>{title}</Text>
              <Text style={styles.cardTextSecondary}>{lastLog}</Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.buttonCenterWrap}>
          <Button
            compact
            mode='contained'
            buttonColor={Colors.gray[750]}
            dark={true}
            style={{ borderRadius: BorderRadius.large, backgroundColor: Colors.gray[300] }}
            onPress={() => { router.navigate({ pathname: '/log/exercise_log', params: { exerciseId: Number(exerciseId), name: title } }); }}
            labelStyle={{ color: Colors.gray[750], fontWeight: 400, fontFamily: 'sans-serif', marginHorizontal: 10, marginVertical: 7, fontSize: 14 }}
            rippleColor={Colors.gray[500]}
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

  card: {
    padding: 11,
    backgroundColor: Colors.gray[150],
    borderRadius: BorderRadius.medium,
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