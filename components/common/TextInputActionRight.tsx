import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput, Button } from 'react-native-paper';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';

type TextInputActionRightProps = {
  placeholder?: string,
  actionText?: string,
  actionButton?: boolean
  onChange?: (text: string) => void
  onActionPress?: () => void

}

export default function TextInputActionRight({ placeholder, actionText, actionButton = true, onChange, onActionPress }: TextInputActionRightProps) {
  return (
    <View style={styles.container}>
      <TextInput
        keyboardType='numeric'
        onChangeText={onChange}
        placeholder={placeholder}
        mode='outlined'
        style={styles.textInput}
        contentStyle={styles.textInputContent}
        outlineStyle={styles.textInputOutline}
        outlineColor={Colors.gray[400]}
        activeOutlineColor={Colors.gray[650]}
        placeholderTextColor={Colors.gray[550]}
      />
      {actionText && !actionButton &&
        <View style={styles.actionContainer}>
          <View style={styles.divider} />
          <Text style={[styles.actionText, { color: Colors.gray[650] }]}>{actionText}</Text>
        </View>
      }
      {actionText && actionButton &&
        <View style={styles.actionContainer}>
          <View style={styles.divider} />
          <Button style={styles.actionButton} labelStyle={{ marginHorizontal: 10 }} compact onPress={onActionPress}>
            <Text style={styles.actionText}>{actionText}</Text>
          </Button>
        </View>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: Colors.gray[50],
    color: Colors.gray[950],
    fontSize: 16,
    paddingVertical: 3,
    height: 45,
  },
  textInputContent: {
    borderRadius: BorderRadius.medium,
  },
  textInputOutline: {
    borderRadius: BorderRadius.large,
    borderWidth: 1,
  },
  actionContainer: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%'
  },
  divider: {
    borderLeftWidth: 1,
    borderColor: Colors.gray[400],
    height: "60%",
  },
  actionText: {
    fontSize: 15,
    color: Colors.blue[500],
    fontWeight: '400',
    padding: 10,
    paddingHorizontal: 12,
  },
  actionButton: {
    borderRadius: BorderRadius.medium,
    margin: 5,
  },
});