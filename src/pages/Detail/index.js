import { useLayoutEffect, useState } from "react";
import { 
  View, 
  Text, 
  Pressable, 
  ScrollView,
  Image, 
  Modal,
  Share
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

import { Ingredients } from "../../components/Ingredients"
import { Instructions } from "../../components/Instructions"
import { VideoView } from "../../components/Video";
import { isFavorite, saveFavorite, removeItem } from '../../utils/storage'

import { styles } from "./styles";

export function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const [showVideo, setShowVideo] = useState(false)
  const [favorite, setFavorite] = useState(false)

  useLayoutEffect(() => {
    
     async function getStatusFavorites(){
      const receipeFavorites = await isFavorite(route.params?.data)
      setFavorite(receipeFavorites)
     }

     getStatusFavorites()

    navigation.setOptions({
      title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
      headerRight: () => (
        <Pressable onPress={() => handleFavoriteReceipe(route.params?.data)}>
          { favorite ? (
            <Entypo 
              name="heart" 
              size={28} 
              color="#FF4141" 
            />
          ) : (
            <Entypo 
              name="heart-outlined" 
              size={28} 
              color="#FF4141" 
            />
          )}
        </Pressable>
      )
    });

  }, [navigation, route.params?.data, favorite]);

  async function handleFavoriteReceipe(receipe){
    if(favorite){
      await removeItem(receipe.id)
      setFavorite(false)
    }else{
      await saveFavorite("@appreceitas", receipe)
      setFavorite(true)
    }
  }

  function handleOpenVideo() {
    setShowVideo(true)
  }

  async function shareReceipe(){
    try {
      await Share.share({
        url: "https://sujeitoprogramador.com",
        message: 
        `Receita: ${route.params?.data.name}\nIngredientes: ${route.params?.data.total_ingredients}\n `
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 14 }}
    >
      <Pressable onPress={handleOpenVideo}>
        <View style={styles.playIcon}>
          <AntDesign name="playcircleo" size={48} color="#FAFAFA"/>
        </View>
        <Image 
          source={{ uri: route.params?.data.cover }}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientsText}>Ingredientes ({route.params?.data.total_ingredients})</Text>
        </View>
        <Pressable onPress={shareReceipe}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>

      {/* Arrow function tipo () => () pois quer retornar algo */}
      {route.params?.data.ingredients.map((item) => (
        <Ingredients data={item} key={item.id}/>
      ))}

      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>Modo de Preparo</Text>
        <Feather 
            name="arrow-down"
            size={24}
            color="#FFF"
          />
      </View>

      {route.params?.data.instructions.map((item, index) => (
        <Instructions 
          key={item.id} 
          data={item}
          index={index}
        />
      ))}

      <Modal visible={showVideo} animationType="slide">
        <VideoView 
          handleClose={ () => setShowVideo(false)}
          videoUrl={route.params?.data.video}
        />
      </Modal>

    </ScrollView>
  );
}
