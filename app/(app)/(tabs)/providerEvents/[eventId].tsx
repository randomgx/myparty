import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getEvent, updateEvent } from "../../../../calls/calls";
import { Event } from "../../../../types/collections";
import { Text, View } from "../../../../components/Themed";
import { StyleSheet } from "react-native";
import { getDate, getTime } from "../../../../utils/helpers";
import { texts, titles } from "../../../../styles/mainStyles";
import DropDownPicker from "react-native-dropdown-picker";
import { CheckBox } from "react-native-elements";

export default function EventScreen() {
  const { eventId } = useLocalSearchParams();

  const [event, setEvent] = useState<Event>();

  const handleGetEvent = async () => {
    const event = await getEvent(eventId.toString());
    setEvent(event);
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

  const handleActiveEvent = async () => {
    const updatedEvent = {
      ...event,
      active: !event?.active,
    } as Event;
    setEvent(updatedEvent);
    await updateEvent(updatedEvent);
  };

  useEffect(() => {
    handleGetEvent();
  }, []);

  return (
    <View>
      <Stack.Screen options={{ title: event?.name || "Evento" }} />
      <View style={styles.eventItem}>
        <View style={styles.eventTitle}>
          <Text style={titles.large}>{event?.name}</Text>
          {handleEventStatus(event as Event)}
        </View>
        <Text style={texts.small}>{event?.description}</Text>
      </View>
      <CheckBox
        title="Ativo"
        checked={event?.active}
        onPress={() => handleActiveEvent()}
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
});
