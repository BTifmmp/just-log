import { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Button } from 'react-native-paper';
import BorderRadius from '@/constants/Styles';


type ExercisePickHeaderProps = NativeStackHeaderProps & {
  categories?: string[]
  onCategoryChange?: (text: string) => void
  onSearchChange?: (text: string) => void
};

export default function ExercisePickHeader({ navigation, back, options, route, categories, onCategoryChange, onSearchChange }: ExercisePickHeaderProps) {
  const title = options.title !== undefined ? options.title : route.name;

  const [searchText, setSearchText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<View>(null);
  const safeViewRef = useRef<View>(null);


  const handleLayout = (event: any) => {
    const pos = { x: 0, y: 0 }
    if (buttonRef.current) {
      buttonRef.current.measureInWindow((x, y, width, height) => {
        pos.x += x + width;
        pos.y += y + height
      });
    }
    if (safeViewRef.current) {
      safeViewRef.current.measureInWindow((x, y, width, height) => {
        pos.y -= y;
      });
    }

    setMenuPos({ x: pos.x, y: pos.y + 10 });
  };

  return (
    <SafeAreaView ref={safeViewRef} onLayout={handleLayout}>
      <View style={[styles.headerContainer, options.headerStyle]}>
        <Pressable onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={Colors.gray[950]} />
        </Pressable>
        <Text numberOfLines={1} style={[styles.headerTitle, options.headerTitleStyle]}>{title}</Text>
        {options.headerRight ? options.headerRight({}) : undefined}
      </View>
      <View style={styles.subheaderContainer}>
        <TextInput
          placeholder="Search exercise"
          value={searchText}
          onChangeText={(text) => { setSearchText(text), onSearchChange && onSearchChange(text) }}
          style={styles.searchInput}
          placeholderTextColor={Colors.gray[750]}
        />
        <Button
          ref={buttonRef}
          onLayout={handleLayout}
          mode="contained"
          onPress={() => setMenuVisible(true)}
          style={styles.categoryButton}
          labelStyle={{ marginHorizontal: 0 }}
          contentStyle={{ height: 40 }}
          rippleColor={Colors.gray[300]}
          compact>
          <View style={styles.categoryView}>
            <View style={{ flex: 1 }}>
              <Text style={styles.categoryText}>{selectedCategory}</Text>
            </View>
            <Ionicons
              name={menuVisible ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={Colors.gray[950]} />
          </View>
        </Button>

        <Menu
          contentStyle={styles.menu}
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={{ x: menuPos.x, y: menuPos.y }}>
          {categories?.map((cat, index) => (
            <Menu.Item
              dense={true}
              style={{ width: 170, height: 40 }}
              key={index}
              onPress={() => {
                onCategoryChange && onCategoryChange(cat);
                setSelectedCategory(cat);
                setMenuVisible(false);
              }}
              title={cat} />
          ))}
        </Menu>
      </View >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  // Header styles
  headerContainer: {
    height: 52,
    backgroundColor: Colors.gray[50],
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  backButton: {
    padding: 10,
    marginLeft: 5
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    marginLeft: 5,
    fontWeight: 400,
    color: Colors.gray[950],
  },

  // Subheader Style
  subheaderContainer: {
    backgroundColor: Colors.gray[50],
    borderColor: Colors.gray[300],
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 15,
  },

  searchInput: {
    flex: 2,
    height: 40,
    backgroundColor: Colors.gray[250],
    borderRadius: BorderRadius.small,
    paddingHorizontal: 10,
    color: Colors.gray[950],
    marginRight: 5

  },

  // Category button
  categoryButton: {
    height: 40,
    flex: 1,
    borderRadius: BorderRadius.small,
    backgroundColor: Colors.gray[250],
  },

  categoryView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15, gap: 5
  },

  categoryText: {
    fontSize: 14,
    color: Colors.gray[950],
    fontWeight: '400',
  },

  // Menu
  menu: {
    // paddingVertical: 0,
    borderRadius: BorderRadius.largest,
    overflow: 'hidden',
    backgroundColor: Colors.gray[300]
  }
});
