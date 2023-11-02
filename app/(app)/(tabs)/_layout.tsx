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
  const { signOut } = useAuth();

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
            headerRight: () => (
              <Link href="/(app)/profile" replace>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="sign-out"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="newevent"
          options={{
            title: "Criar Evento",
            tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Meus Eventos",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="glass" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="financeiro"
          options={{
            title: "Finanças",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="money" color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
