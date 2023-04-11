import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { View, Text, SafeAreaView, FlatList } from "react-native";
import { getFavorites } from "../../utils/storage"
import { FoodList } from "../../components/FoodList"

import { styles } from "./styles";

export function Favorites() {
  const [receipes, setReceipes] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    let isActive = true
    async function getReceipes() {
      const result = await getFavorites("@appreceitas")
      if(isActive){
        setReceipes(result)
      }
    }

    if(isActive){
      getReceipes()
    }

    return () => {
      isActive = false
    }
  },[isFocused])

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Receitas Favoritas</Text>

      {receipes.length === 0 && (
        <Text>Você ainda não tem nenhuma receita salva</Text>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 14 }}
        data={receipes}
        keyExtractor={ (item) => String(item.id)}
        renderItem={( {item} ) => <FoodList data={item}/>}
      />

    </SafeAreaView>
  )
}