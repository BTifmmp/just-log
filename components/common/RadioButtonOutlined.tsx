import { StyleSheet } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';

interface RadioButtonOutlinedProps {
  isSelected: boolean;
  onPress: () => void;
  text: string;
}

export default function RadioButtonOutlined({ isSelected, onPress, text }: RadioButtonOutlinedProps) {
  return (
    <Button
      mode="outlined"
      compact
      onPress={onPress}
      rippleColor={Colors.gray[300]}
      style={[
        styles.button,
        { borderColor: isSelected ? Colors.blue[500] : Colors.gray[200] },
      ]}
      labelStyle={[
        styles.label, {
          color: isSelected ? Colors.gray[950] : Colors.gray[750],
          fontWeight: isSelected ? '500' : '400',
        },
      ]}
    >
      {text}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: BorderRadius.large,
  },
  label: {
    fontSize: 15,
    textAlign: 'center',
  },
});