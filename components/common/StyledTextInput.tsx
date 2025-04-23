import { StyleSheet, View, TextInput } from 'react-native'
import Colors from '@/constants/Colors';
import BorderRadius from '@/constants/Styles';


import { useState } from 'react';

type StyledTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export default function StyledTextInput({ value, onChangeText, placeholder }: StyledTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{
      borderWidth: Number(isFocused) + 0,
      borderColor: isFocused ? Colors.gray[750] : Colors.gray[450],
      paddingVertical: 10 + Number(!isFocused),
      padding: 5 + Number(!isFocused),
      borderRadius: BorderRadius.medium
    }}>
      <TextInput
        numberOfLines={1}
        style={[styles.input, { fontWeight: value ? '500' : '400' }]}
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor={Colors.gray[650]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.blue[500],
    padding: 10,
    borderRadius: BorderRadius.medium,
    backgroundColor: "white",
  },
  input: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.gray[950],
  },
})