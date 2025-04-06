import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native'
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';
import { Link, RelativePathString } from 'expo-router';

type PickCardProps = {
  title: string
  imgSrc: string
  exerciseHref?: string
  onAdd?: () => void
}


export default function PickCard({ title, imgSrc, exerciseHref = "/", onAdd }: PickCardProps) {
  return (
    <View style={styles.card}>
      <Link href={exerciseHref as RelativePathString} style={{ flex: 0 }}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 15, alignItems: 'center' }}>
          <Image source={imgSrc} style={styles.image} />
          <Text style={styles.cardText}>{title}</Text>
        </View>
      </Link>
      <IconButton
        onPress={onAdd}
        style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: -5, }}
        size={30}
        rippleColor={Colors.addOpacity(Colors.blue[300], 0.3)}
        icon={() =>
          <Ionicons name="add" size={26} color={Colors.blue[500]} />
        }
      >
      </IconButton>
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
    alignItems: 'center'
  },

  cardText: {
    color: Colors.gray[950],
    fontSize: 18,
    fontWeight: 400,
  },

  cardTextSecondary: {
    color: Colors.gray[750],
    fontSize: 14,
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 999
  }

});