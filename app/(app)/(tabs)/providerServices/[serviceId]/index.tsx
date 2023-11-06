import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getService, updateEvent } from "../../../../../calls/calls";
import { Event, Service } from "../../../../../types/collections";
import { Text, View } from "../../../../../components/Themed";
import { StyleSheet } from "react-native";
import { getDate, getTime } from "../../../../../utils/helpers";
import { buttons, texts, titles } from "../../../../../styles/mainStyles";
import DropDownPicker from "react-native-dropdown-picker";
import { CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";

export default function EventScreen() {
  const router = useRouter();
  const { serviceId } = useLocalSearchParams();

  const [service, setService] = useState<Service>();

  const handleGetService = async () => {
    const service = await getService(serviceId.toString());
    setService(service);
  };

  const handleEventStatus = (event: Event) => {
    if (event?.active) {
      return (
        <View
          style={{ backgroundColor: "#25ab25", padding: 5, borderRadius: 5 }}
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Ativo</Text>
        </View>
      );
    }
  };

  useEffect(() => {
    handleGetService();
  }, []);

  return (
    <View>
      <Stack.Screen options={{ title: service?.service_type || "Serviço" }} />
      <View style={styles.eventItem}>
        <View style={styles.eventTitle}>
          <Text style={titles.large}>{service?.service_type}</Text>
        </View>
        <Text style={texts.small}>{service?.description}</Text>
      </View>
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
});
