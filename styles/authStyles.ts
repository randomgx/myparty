import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  authPage: {
    paddingHorizontal: 20,
    textAlign: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    backgroundColor: "#2b045a",
    color: "#fff",
  },
  inputsArea: {
    width: "100%",
    gap: 10,
    color: "#fff",
    zIndex: 1,
  },
  myPartyAuthSplash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  authTitle: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
  },
});
