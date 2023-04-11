import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons'

import { styles } from './styles';
import { WebView } from "react-native-webview"


export function VideoView({ handleClose, videoUrl}) {
  return (
    <SafeAreaView style={styles.container}>
     <TouchableOpacity 
      style={styles.backButton}
      onPress={handleClose}
     >
      <Feather name='arrow-left' size={24} color="#FFF"/>
      <Text style={styles.backText}>Voltar</Text>
     </TouchableOpacity>

     <WebView
      style={styles.contentView}
      source={{ uri: videoUrl }}
    />
    </SafeAreaView>
  );
}