import { StyleSheet, Text, View } from 'react-native'
import React, { RefObject } from 'react'
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { TouchableRipple } from 'react-native-paper'
import Colors from '@/constants/Colors'
import BorderRadius from '@/constants/Styles'

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
        handleIndicatorStyle={{ backgroundColor: Colors.gray[650] }}
        backgroundStyle={styles.background}
        handleStyle={styles.handle}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          {elements.map((item, index) => {
            const isFirst = index === 0
            const isLast = index === elements.length - 1

            const borderRadiusStyle = {
              borderTopLeftRadius: isFirst ? BorderRadius.largest : BorderRadius.small,
              borderTopRightRadius: isFirst ? BorderRadius.largest : BorderRadius.small,
              borderBottomLeftRadius: isLast ? BorderRadius.largest : BorderRadius.small,
              borderBottomRightRadius: isLast ? BorderRadius.largest : BorderRadius.small,
              borderRadius: !isFirst && !isLast ? BorderRadius.small : undefined,
            }

            return (
              <View key={index} style={[styles.elementsContainer, borderRadiusStyle]}>
                <TouchableRipple
                  onPress={() => {
                    item.onPress?.()
                    modalRef?.current?.close()
                  }}
                  rippleColor={Colors.gray[400]}
                  style={[styles.touchableRipple, borderRadiusStyle]}
                >
                  <Text style={styles.label}>{item.label}</Text>
                </TouchableRipple>
              </View>

            )
          })}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
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
    backgroundColor: Colors.gray[150],
    borderTopLeftRadius: BorderRadius.largest,
    borderTopRightRadius: BorderRadius.largest,
  },

  elementsContainer: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 5
  },

  touchableRipple: {
    height: 60,
    overflow: 'hidden',
    backgroundColor: Colors.gray[250],
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 16,
    color: Colors.gray[950],
  },
})
