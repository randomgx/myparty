import { StyleSheet } from "react-native";

import EditScreenInfo from "../../../components/EditScreenInfo";
import { Text, View } from "../../../components/Themed";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo ao MyParty, {user?.name}</Text>
      <Text style={styles.title}> Você é um {user?.account_type}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
