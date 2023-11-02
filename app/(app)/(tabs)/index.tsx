import { StyleSheet } from "react-native";

import EditScreenInfo from "../../../components/EditScreenInfo";
import { Text, View } from "../../../components/Themed";
import { useAuth } from "../../../contexts/AuthContext";

export default function TabOneScreen() {
  const { session } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {session?.user.user_metadata.name} é um frexco
      </Text>
      <Text style={styles.title}> Eu sou um {session?.user.email}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
