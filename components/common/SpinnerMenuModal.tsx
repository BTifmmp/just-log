import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, useAnimatedScrollHandler, Extrapolation, useAnimatedRef, scrollTo } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';
import { Button, IconButton } from 'react-native-paper';
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/component/ScrollView';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const ITEM_HEIGHT = 60;
const ITEMS_VISIBLE = 3;

type SpinnerMenuModalProps = {
  options: string[];
  visible: boolean;
  onRequestClose: () => void;
  onSelect: (val: string) => void;
  initialSelectedOption?: string; // optional initial selected option
};

export default function SpinnerMenuModal({ options, visible, onRequestClose, onSelect, initialSelectedOption }: SpinnerMenuModalProps) {
  const scrollOffset = useSharedValue(0);  // This shared value will control the scroll position
  const scrollViewRef = useAnimatedRef<AnimatedScrollView>()  // Ref for the ScrollView

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const setScroll = () => {
    setTimeout(() => {
      const initialIndex = options.indexOf(initialSelectedOption || options[0]);
      if (scrollViewRef) {
        scrollOffset.value = initialIndex * ITEM_HEIGHT;
        scrollViewRef.current?.scrollTo({ x: 0, y: initialIndex * ITEM_HEIGHT, animated: false })
      }
    }, 1)
  }

  useEffect(() => {
    setScroll()
  })

  const tap = Gesture.Tap()
    .maxDuration(150)
    .onEnd((e) => {
      let move = -1;
      move = e.y < ITEM_HEIGHT ? scrollOffset.value - ITEM_HEIGHT : move;
      move = e.y > ITEM_HEIGHT * 2 ? scrollOffset.value + ITEM_HEIGHT : move;
      move = move === -1 ? scrollOffset.value : move;
      if (scrollViewRef) {
        scrollTo(scrollViewRef, 0, move, true);
      }
    });

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onRequestClose}>
      <GestureHandlerRootView>
        <View style={styles.backdrop}>
          <Pressable onPress={onRequestClose} style={StyleSheet.absoluteFillObject} />
          <View style={{ backgroundColor: Colors.gray[150], width: '100%', borderRadius: BorderRadius.medium, maxWidth: 400 }}>
            <View style={{ alignItems: 'flex-end' }}>
              <IconButton onPress={onRequestClose} icon="close" size={20} style={{ margin: 10 }} />
            </View>
            <GestureDetector gesture={tap}>
              <Animated.View style={{ height: ITEM_HEIGHT * 3 }}>
                <View style={{ height: ITEM_HEIGHT, borderBottomWidth: StyleSheet.hairlineWidth, borderTopWidth: StyleSheet.hairlineWidth, position: 'absolute', width: '60%', left: '20%', borderColor: Colors.gray[500], top: ITEM_HEIGHT }}></View>
                <Animated.ScrollView
                  onLayout={setScroll}
                  ref={scrollViewRef}  // Attach the ref to the ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ height: ITEM_HEIGHT * ITEMS_VISIBLE }}
                  onScroll={scrollHandler}
                  snapToOffsets={Array.from({ length: options.length }, (_, i) => i * ITEM_HEIGHT)}
                  decelerationRate={0.95}
                >
                  <View style={{ height: ITEM_HEIGHT }} />
                  {options.map((item, index) => {
                    const offset = index * ITEM_HEIGHT;
                    let distance = 0;

                    const animatedStyle = useAnimatedStyle(() => {
                      distance = Math.abs(scrollOffset.value - offset);

                      if (distance > ITEM_HEIGHT * 2) {
                        return {};
                      }

                      const scale = interpolate(distance, [0, ITEM_HEIGHT, ITEM_HEIGHT * 2], [1, 0.8, 0.7], Extrapolation.CLAMP);
                      const opacity = interpolate(distance, [0, ITEM_HEIGHT, ITEM_HEIGHT * 2], [1, 0.5, 0.2], Extrapolation.CLAMP);

                      return {
                        transform: [{ scale: scale }],
                        opacity: opacity,
                      };
                    });

                    return (
                      <Animated.View key={index} style={[{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }, animatedStyle]}>
                        <Text style={{ fontSize: 27, color: 'white' }}>{item}</Text>
                      </Animated.View>
                    );
                  })}
                  <View style={{ height: ITEM_HEIGHT }} />
                </Animated.ScrollView>
              </Animated.View>
            </GestureDetector>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button
                mode="text"
                textColor={Colors.blue[400]}
                onPress={() => {
                  const currentIndex = Math.round(scrollOffset.value / ITEM_HEIGHT);
                  const selectedOption = options[currentIndex];
                  onSelect(selectedOption);
                  onRequestClose();
                }}
                labelStyle={{ fontSize: 18, fontWeight: 400, fontFamily: 'sans-serif', marginVertical: 10 }}
                style={{ borderRadius: BorderRadius.medium, marginTop: 20, margin: 10 }}
              >
                Select
              </Button>
            </View>
          </View>
        </View >
      </GestureHandlerRootView>
    </Modal >
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
});
