import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { styles }  from './styles'

export function FoodList({ data }){
  const navigation = useNavigation()

  function handleNavigate() {
    navigation.navigate("Detail", { data: data })
  }

  return(
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={styles.container}
      onPress={handleNavigate}
    >
      <Image 
        source={{ uri: data.cover }}
        style={styles.cover}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description}>{data.total_ingredients} ingredientes | {data.time} min</Text>
      </View>
      <LinearGradient 
        style={styles.gradient}
        colors={['transparent', 'rgba(0,0,0, 0.70)', 'rgba(0,0,0, 0.95)']}
      />
    </TouchableOpacity>
  )
}