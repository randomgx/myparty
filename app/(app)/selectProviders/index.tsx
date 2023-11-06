import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { Link, Stack, useRouter } from "expo-router";
import {
  buttons,
  containers,
  mainStyles,
  texts,
} from "../../../styles/mainStyles";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import {
  createEvent,
  getEventTypes,
  getServiceTypes,
} from "../../../calls/calls";
import { Event, EventType, ServiceType } from "../../../types/collections";
import { Alert } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";

export default function ServiceTypeListScreen() {
  const router = useRouter();
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  const ServiceTypeItem = ({ item }: { item: ServiceType }) => (
    <Link
      href={{
        pathname: "/(app)/selectProviders/[typeId]",
        params: {
          typeId: item.id,
        },
      }}
      style={styles.serviceTypeItem}
    >
      <Text style={{ color: "white" }}>{item.type}</Text>
    </Link>
  );

  const handleGetServiceTypes = async () => {
    const serviceTypes = await getServiceTypes();
    setServiceTypes(serviceTypes);
  };

  useEffect(() => {
    handleGetServiceTypes();
  }, []);

  return (
    <View>
      <Stack.Screen options={{ title: "Selecione o tipo" }} />
      <View style={containers.mainContainer}>
        <View style={{ flex: 1, gap: 20 }}>
          <Text style={texts.medium}>Selecione o tipo de serviço</Text>
          <FlatList
            style={styles.providersList}
            data={serviceTypes}
            numColumns={2}
            renderItem={({ item }) => <ServiceTypeItem item={item} />}
            keyExtractor={(item) => item.id as any}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  providersList: {
    flex: 1,
  },
  serviceTypeItem: {
    backgroundColor: "#2b045a",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
