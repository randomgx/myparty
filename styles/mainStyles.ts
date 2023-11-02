import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
  textBox: {
    borderColor: "rgb(191, 166, 222)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    color: "#fff",
    backgroundColor: "#2b045a",
  },
});

export const titles = StyleSheet.create({
  large: {
    fontSize: 24,
    fontWeight: "bold",
  },
  medium: {
    fontSize: 18,
    fontWeight: "bold",
  },
  small: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export const texts = StyleSheet.create({
  large: {
    fontSize: 24,
  },
  medium: {
    fontSize: 18,
  },
  small: {
    fontSize: 14,
  },
});

export const helpers = StyleSheet.create({
  flexCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gap10: {
    gap: 10,
  },
});

export const buttons = StyleSheet.create({
  primary: {
    backgroundColor: "#2b045a",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#2b045a",
  },
  stretch: {
    width: "100%",
  },
});
