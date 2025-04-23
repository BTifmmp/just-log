import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native'
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';
import { Link, RelativePathString } from 'expo-router';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
import BorderRadius from '@/constants/Styles';
import { Thumbnail } from '@/components/exercise/ExerciseThumbnail';

type PickCardProps = {
  title: string
  color: string
  id: number
  isTracked: boolean
  onActionPress?: () => void
}


export default function PickCard({ title, color, id, onActionPress, isTracked }: PickCardProps) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={() => {
            router.navigate({
              pathname: `/exercise/${id}` as RelativePathString,
              params: { exerciseId: Number(id), name: title }
            })
          }}
          style={{ flex: 0 }}>
          <View style={{ flex: 1, flexDirection: 'row', gap: 15, alignItems: 'center' }}>
            <Thumbnail name={title} borderRadius={999} fontSize={18} backgroundColor={color} textColor={Colors.gray[950]} size={45} />
            <Text numberOfLines={1} style={styles.cardText}>{title}</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ width: 50, alignItems: 'flex-end' }}><IconButton
        onPress={onActionPress}
        style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: -5, borderWidth: 1, borderColor: Colors.gray[250], borderRadius: 999 }}
        size={18}
        rippleColor={Colors.gray[300]}
        icon={() =>
          !isTracked ?
            <Ionicons name="add" size={18} color={Colors.gray[750]} />
            : <Ionicons name="remove" size={18} color={'#ff6b6b'} />
        }
      >
      </IconButton></View>
    </View >
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center',
  },

  cardText: {
    color: Colors.gray[950],
    fontSize: 17,
    fontWeight: 400,
  },

  cardTextSecondary: {
    color: Colors.gray[750],
    fontSize: 14,
  },

});