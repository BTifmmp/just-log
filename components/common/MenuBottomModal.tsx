import { StyleSheet, Text, View } from 'react-native'
import React, { RefObject, useEffect, useCallback, useRef } from 'react'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, TouchableRipple } from 'react-native-paper';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';

type ModalMenuElement = {
  iconName?: string
  label: string
  onPress?: () => void
}

type MenuBottomModalProps = {
  modalRef?: RefObject<BottomSheetModal>
  elements?: ModalMenuElement[]
}

export default function MenuBottomModal({ modalRef, elements = [] }: MenuBottomModalProps) {

  return (
    <View>
      <BottomSheetModal
        ref={modalRef}
        handleIndicatorStyle={{ backgroundColor: Colors.gray[650], }}
        backgroundStyle={styles.background}
        handleStyle={styles.handle}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.elementsContainer}>
            {elements.map((item, index) =>
              <View key={index} style={{ borderRadius: BorderRadius.largest, overflow: 'hidden', }}>
                <TouchableRipple
                  onPress={() => { item.onPress && item.onPress(); modalRef?.current?.close() }}
                  key={index} style={styles.touchableRipple}
                  rippleColor={Colors.gray[400]}>
                  <Text style={styles.label}>
                    {item.label}
                  </Text>
                </TouchableRipple>
              </View>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View >
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    padding: 15,
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: Colors.gray[150],
  },

  background: {
    backgroundColor: Colors.gray[150],
    elevation: 10,
  },

  handle: {
    backgroundColor: Colors.gray[250],
    borderTopLeftRadius: BorderRadius.largest,
    borderTopRightRadius: BorderRadius.largest,
  },

  elementsContainer: {
    width: '100%',
    gap: 15,
  },

  touchableRipple: {
    height: 60,
    overflow: 'hidden',
    backgroundColor: Colors.gray[250],
    borderRadius: BorderRadius.largest,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.gray[950],
  },
});