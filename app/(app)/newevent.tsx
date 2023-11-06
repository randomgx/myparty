import React, { useEffect, useState } from "react";
import { Text, View } from "../../components/Themed";
import { Stack, useRouter } from "expo-router";
import {
  buttons,
  containers,
  mainStyles,
  texts,
} from "../../styles/mainStyles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Pressable, StyleSheet, Touchable } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { createEvent, getEventTypes } from "../../calls/calls";
import { Event, EventType } from "../../types/collections";
import { Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function NewEventStep1() {
  const { user } = useAuth();
  const router = useRouter();
  const currentDate = new Date();

  const [event, setEvent] = useState<Partial<Event>>({
    name: "",
    description: "",
    local: "",
    guests: 0,
    event_type: 0,
    date: currentDate.toString(),
  });

  const [dropdownItems, setDropdownItems] = React.useState<[]>([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [dropdownValue, setDropdownValue] = React.useState(null);

  const [date, setDate] = useState<Date>(new Date());

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [local, setLocal] = useState("");
  const [guests, setGuests] = useState(0);

  const handleGetEventTypes = async () => {
    const eventTypes = await getEventTypes();
    const dropdownItems: any = eventTypes.map((eventType: EventType) => {
      return {
        label: eventType.type,
        value: eventType.id,
      };
    });
    setDropdownItems(dropdownItems);
  };

  const handleCreateEvent = async () => {
    const newEvent = {
      name: name,
      description: description,
      local: local,
      guests: guests,
      event_type: dropdownValue,
      date: date.toISOString(),
      owner_id: user?.id,
    };
    await createEvent(newEvent as Event);
    Alert.alert(
      "Evento criado com sucesso!",
      "A seguir, selecione os provedores de serviço para o seu evento."
    );
    router.replace("/(app)/selectProviders");
  };

  useEffect(() => {
    handleGetEventTypes();
  }, []);
  return (
    <View>
      <View style={containers.mainContainer}>
        <View style={styles.eventFields}>
          <View style={styles.eventField}>
            <Text style={texts.medium}>Nome</Text>
            <TextInput
              placeholderTextColor={"#000"}
              style={mainStyles.whiteTextBox}
              placeholder="Nome"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View style={styles.eventField}>
            <Text style={texts.medium}>Descrição</Text>
            <TextInput
              placeholderTextColor={"#000"}
              style={mainStyles.whiteTextBox}
              placeholder="Descrição"
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
          </View>
          <View style={styles.eventField}>
            <Text style={texts.medium}>Local</Text>
            <TextInput
              placeholderTextColor={"#000"}
              style={mainStyles.whiteTextBox}
              placeholder="Local"
              onChangeText={(text) => setLocal(text)}
              value={local}
            />
          </View>
          <View style={styles.eventField}>
            <Text style={texts.medium}>Convidados</Text>
            <TextInput
              placeholderTextColor={"#000"}
              style={mainStyles.whiteTextBox}
              keyboardType="numeric"
              placeholder="Quantidade"
              onChangeText={(text) => setGuests(parseInt(text))}
              value={guests.toString()}
            />
          </View>
          <View style={[styles.eventField, { zIndex: 999 }]}>
            <Text style={texts.medium}>Tipo de evento</Text>
            <DropDownPicker
              open={dropdownOpen}
              value={dropdownValue}
              items={dropdownItems}
              setOpen={setDropdownOpen}
              setValue={setDropdownValue}
              setItems={setDropdownItems as any}
              style={[mainStyles.whiteTextBox, { paddingHorizontal: 16 }]}
              placeholder="Tipo de usuário"
              placeholderStyle={{ color: "#000000" }}
              textStyle={{ color: "#000000" }}
              dropDownContainerStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#d4d4d4",
                paddingHorizontal: 6,
              }}
              dropDownDirection="BOTTOM"
              zIndex={99999}
              listMode="SCROLLVIEW"
            />
          </View>
          <View style={styles.eventField}>
            <Text style={texts.medium}>Data</Text>
            <DateTimePicker
              value={date}
              onChange={(e) =>
                setDate(new Date(e.nativeEvent.timestamp || new Date()))
              }
              mode="datetime"
            />
          </View>
        </View>
        <TouchableOpacity
          style={[buttons.primary, buttons.stretch]}
          onPress={() => handleCreateEvent()}
        >
          <Text style={buttons.primaryText}>
            Criar evento e selecionar provedores
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventField: {
    flexDirection: "column",
    gap: 10,
  },
  eventFields: {
    gap: 10,
  },
});
