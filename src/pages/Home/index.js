import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { Logo } from '../../components/Logo';
import { FoodList } from '../../components/FoodList';
import { useNavigation } from '@react-navigation/native';

import { Text as MotiText } from 'moti';

import api from '../../services/api';

export function Home() {
  const [inputValue, setInputValue] = useState('');
  const [foods, setFood] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get('/foods');
      setFood(response.data);
    }

    fetchApi();
  }, []);

  function handleSearch() {
    if(!inputValue) return

    let input = inputValue
    setInputValue("")
    navigation.navigate("Search", { name: input })

    console.log('Você digitou');
    console.log(inputValue);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      {/* <Text style={styles.title}>Encontre a receita</Text>
     <Text style={styles.title}>que combina com você</Text> */}

      <MotiText 
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 18,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{ 
          delay: 200,
          type: "timing",
          duration: 850,
        }}
      >
          Encontre a receita {'\n'}que combina com você
      </MotiText>
      <View style={styles.form}>
        <TextInput
          placeholder="Digite o nome da comida..."
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#4CBE6C" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => String(item.id)}
        // keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
