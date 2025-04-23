import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';

type ThumbnailProps = {
  name: string;
  size?: number;
  borderRadius?: number;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return '';
  const initials = words.slice(0, 2).map(word => word[0]).join('');
  return initials.toUpperCase();
}

export function Thumbnail({
  name,
  size = 48,
  borderRadius = 24,
  fontSize = 18,
  backgroundColor = '#888',
  textColor = '#fff',
}: ThumbnailProps) {
  const initials = getInitials(name);

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const textStyle: TextStyle = {
    fontSize,
    color: textColor,
    fontWeight: 500,
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{initials}</Text>
    </View>
  );
}
