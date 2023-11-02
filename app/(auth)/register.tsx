import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { TextInput } from "react-native-gesture-handler";
import { Button, colors } from "react-native-elements";
import {
  mainStyles,
  titles,
  texts,
  helpers,
  buttons,
} from "../../styles/mainStyles";
import { authStyles } from "../../styles/authStyles";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

export default function Auth() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const [dropdownItems, setDropdownItems] = useState([
    { label: "Provedor de Serviços", value: "provedor" },
    { label: "Cliente", value: "cliente" },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          account_type: dropdownValue,
          address: address,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={authStyles.authPage}>
      <View style={authStyles.authTitle}>
        <Text style={[titles.large, { color: "#fff" }]}>MyParty</Text>
        <Text style={[texts.medium, { color: "#fff" }]}>Crie uma conta</Text>
      </View>
      <View style={authStyles.inputsArea}>
        <TextInput
          placeholderTextColor={"#fff"}
          style={mainStyles.textBox}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Nome"
          keyboardType="default"
        />
        <TextInput
          placeholderTextColor={"#fff"}
          style={mainStyles.textBox}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize={"none"}
          keyboardType="email-address"
        />
        <TextInput
          placeholderTextColor={"#fff"}
          style={mainStyles.textBox}
          onChangeText={(text) => setAddress(text)}
          value={address}
          placeholder="Endereço"
          autoCapitalize={"none"}
          keyboardType="default"
        />
        <DropDownPicker
          open={dropdownOpen}
          value={dropdownValue}
          items={dropdownItems}
          setOpen={setDropdownOpen}
          setValue={setDropdownValue}
          setItems={setDropdownItems}
          style={[mainStyles.textBox, { paddingHorizontal: 16 }]}
          placeholder="Tipo de usuário"
          placeholderStyle={{ color: "#fff" }}
          textStyle={{ color: "#fff" }}
          dropDownContainerStyle={{
            backgroundColor: "#2b045a",
            borderColor: "#fff",
            paddingHorizontal: 6,
          }}
          dropDownDirection="BOTTOM"
          zIndex={99999}
          listMode="SCROLLVIEW"
        />
        <TextInput
          placeholderTextColor={"#fff"}
          style={mainStyles.textBox}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Senha"
          autoCapitalize={"none"}
          keyboardType="default"
        />
      </View>
      <TouchableOpacity
        style={[buttons.secondary, buttons.stretch]}
        disabled={loading}
        onPress={() => signUpWithEmail()}
      >
        <Text style={buttons.secondaryText}>Criar conta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[buttons.primary, buttons.stretch]}
        disabled={loading}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={buttons.primaryText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}
