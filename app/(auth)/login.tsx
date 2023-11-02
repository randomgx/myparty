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

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
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
        <Text style={[texts.medium, { color: "#fff" }]}>
          Entre na sua conta
        </Text>
      </View>
      <View style={authStyles.inputsArea}>
        <TextInput
          placeholderTextColor={"rgb(191, 166, 222)"}
          style={mainStyles.textBox}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize={"none"}
        />
        <TextInput
          placeholderTextColor={"rgb(191, 166, 222)"}
          style={mainStyles.textBox}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Senha"
          autoCapitalize={"none"}
        />
      </View>
      <TouchableOpacity
        style={[buttons.secondary, buttons.stretch]}
        disabled={loading}
        onPress={() => signInWithEmail()}
      >
        <Text style={buttons.secondaryText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[buttons.primary, buttons.stretch]}
        disabled={loading}
        onPress={() => router.push("/(auth)/register")}
      >
        <Text style={buttons.primaryText}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
