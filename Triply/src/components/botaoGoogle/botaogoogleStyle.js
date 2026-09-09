import { StyleSheet } from "react-native";

export const botaoGoogleStyle = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9B9B9B",
    gap: 12, 
    paddingHorizontal: 16,
  },
  buttonText: {
    fontFamily: "RedHatText_700Bold", 
    color: "#000000",
    fontSize: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
});