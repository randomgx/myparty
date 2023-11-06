import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  getEvent,
  getProviderDetails,
  getServiceType,
  getServicesByType,
  updateEvent,
} from "../../../calls/calls";
import { Event, Service, ServiceType, User } from "../../../types/collections";
import { Text, View } from "../../../components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { formatter, getDate, getTime } from "../../../utils/helpers";
import { texts, titles } from "../../../styles/mainStyles";
import DropDownPicker from "react-native-dropdown-picker";
import { CheckBox } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

export default function EventScreen() {
  const { typeId } = useLocalSearchParams();

  const [services, setServices] = useState<Service[]>([]);
  const [type, setType] = useState<ServiceType>();
  const [providers, setProviders] = useState<Partial<User>[]>([]);

  const handleGetServiceType = async () => {
    const type = await getServiceType(typeId.toString());
    setType(type);
    setServices(await getServicesByType(type.type));
  };

  useEffect(() => {
    handleGetServiceType();
  }, []);

  const ServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity style={styles.serviceTypeItem}>
      <View
        style={{
          backgroundColor: "#2b045a",
          gap: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#2b045a",
            gap: 4,
          }}
        >
          <Text style={[texts.medium, { color: "white", fontWeight: "bold" }]}>
            {item.description}
          </Text>
          <Text style={[texts.small, { color: "white" }]}>
            Por {item.provider_name}
          </Text>
        </View>
        <Text style={[texts.small, { color: "white", fontWeight: "bold" }]}>
          {formatter.format(item.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: type?.type || "Tipo de Serviço",
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
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
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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
    width: "100%",
  },
  providersList: {
    flex: 1,
  },
  serviceTypeItem: {
    backgroundColor: "#2b045a",
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
