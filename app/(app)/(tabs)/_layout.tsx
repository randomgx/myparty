import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../../constants/Colors";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../../components/Themed";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { signOut, user } = useAuth();
  const isPrestador = user?.account_type === "provedor";

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "MyParty",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerRight: () =>
              !isPrestador ? (
                <TouchableOpacity
                  onPress={() => router.push("/(app)/newevent")}
                >
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="plus-square-o"
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </TouchableOpacity>
              ) : null,
          }}
        />
        <Tabs.Screen
          name="providerServices"
          options={{
            href: isPrestador ? "/(app)/(tabs)/providerServices" : null,
            headerShown: false,
            title: "Serviços",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="truck" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="clientEvents"
          options={{
            href: !isPrestador ? "/(app)/(tabs)/clientEvents" : null,
            headerShown: false,
            title: "Meus Eventos",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="glass" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="providerEvents"
          options={{
            href: isPrestador ? "/(app)/(tabs)/providerEvents" : null,
            headerShown: false,
            title: "Eventos",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="glass" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="agenda"
          options={{
            title: "Agenda",
            href: isPrestador ? "/(app)/(tabs)/agenda" : null,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar-o" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="user-circle" color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
