import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../../../../components/Themed";
import { Link, Stack, useRouter } from "expo-router";
import { getEvents } from "../../../../calls/calls";
import { useEffect, useState } from "react";
import { Event } from "../../../../types/collections";
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

  const [events, setEvents] = useState<Event[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetEvents = async () => {
    setRefreshing(true);
    const events = await getEvents();
    setEvents(events);
    setRefreshing(false);
  };

  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleEventStatus = (event: Event) => {
    if (event.active) {
      return (
        <View
          style={{ backgroundColor: "#25ab25", padding: 5, borderRadius: 5 }}
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Ativo</Text>
        </View>
      );
    }
  };

  const EventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(app)/(tabs)/providerEvents/${item.id}`)}
    >
      <View style={styles.eventItem}>
        <View style={styles.eventTitle}>
          <Text style={titles.large}>{item.name}</Text>
          {handleEventStatus(item)}
        </View>
        <Text style={texts.small}>{getDate(item.date)}</Text>
        <Text style={texts.small}>{getTime(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Eventos",
        }}
      />
      <View style={styles.container}>
        <FlatList
          style={styles.eventsList}
          data={events}
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
          renderItem={({ item }) => <EventItem item={item} />}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={handleGetEvents}
        />
      </View>
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
