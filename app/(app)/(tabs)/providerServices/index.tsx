import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../../../../components/Themed";
import { Link, Stack, useRouter } from "expo-router";
import {
  getEvents,
  getProviderServices,
  getServiceTypes,
} from "../../../../calls/calls";
import { useEffect, useState } from "react";
import { Event, Service } from "../../../../types/collections";
import { useAuth } from "../../../../contexts/AuthContext";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { getTime, getDate } from "../../../../utils/helpers";
import { buttons, texts, titles } from "../../../../styles/mainStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "../../../../constants/Colors";

export default function EventsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const colorScheme = useColorScheme();

  const [services, setServices] = useState<Service[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetProviderServices = async () => {
    setRefreshing(true);
    const services = await getProviderServices();
    setServices(services);
    setRefreshing(false);
  };

  useEffect(() => {
    handleGetProviderServices();
  }, []);

  const ServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(app)/(tabs)/providerServices/${item.id}`)}
    >
      <View style={styles.eventItem}>
        <View style={styles.eventTitle}>
          <Text style={titles.large}>{item.service_type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Serviços",
        }}
      />
      <FlatList
        style={styles.eventsList}
        data={services}
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginVertical: 20,
              height: 1,
              width: "100%",
              backgroundColor: "#000000",
              opacity: 0.1,
            }}
          />
        )}
        renderItem={({ item }) => <ServiceItem item={item} />}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleGetProviderServices}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 20,
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
  eventItem: {
    borderColor: "#000000",
    borderWidth: 1,
    width: "100%",
    padding: 20,
    borderRadius: 10,
  },
  eventTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  eventsList: {
    paddingVertical: 20,
  },
});
