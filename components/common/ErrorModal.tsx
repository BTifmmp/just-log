import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';

type ErrorModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function ErrorModal({
  visible,
  onClose,
  title = 'Oops!',
  message = 'Something went wrong. Please try again.',
}: ErrorModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFillObject} />
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.footer}>
            <Button
              mode="text"
              onPress={onClose}
              textColor="white"
              labelStyle={{ fontSize: 16, fontWeight: 400, fontFamily: 'sans-serif', marginVertical: 10 }}
              style={{ borderRadius: BorderRadius.largest, marginTop: 20, margin: 10 }}
            >
              Ok
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.gray[150],
    borderRadius: BorderRadius.largest,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    alignItems: 'center'
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 400,
    color: Colors.red[500],
    margin: 15,
  },
  message: {
    fontSize: 16,
    marginHorizontal: 20,
    color: Colors.gray[750],
    textAlign: 'center',
  },
  footer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
});
