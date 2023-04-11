import React from 'react';
import { Text, View, } from 'react-native';

import { styles } from './styles';

export function Instructions({ data, index }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{index + 1}- </Text>
      <Text style={styles.text}>{data.text}</Text>
    </View>
  );
}