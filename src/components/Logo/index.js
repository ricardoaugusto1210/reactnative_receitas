import { Text } from "react-native";
import { styles } from "./styles";
import { View } from "moti"

export function Logo() {
  return(
    <View 
      style={styles.container}
      from={{
        opacity: 0,
        translateX: -50,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      transition={{ 
        type: "timing",
        duration: 850,
      }}
    >
      <Text style={styles.logo}>Receita Fácil</Text>
    </View>
  )
}