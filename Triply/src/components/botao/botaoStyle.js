import { StyleSheet } from "react-native";

export const botaoStyle = StyleSheet.create({
  button: {
    backgroundColor: "#FD7509",
    height: 40,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "RedHatText_400Regular",
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: 600,
  },
  buttonCadastrar: {
    backgroundColor: 'Transparent',
    height: 40,
    width: '100%',
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9B9B9B",
  },
  buttonCadastrarText: {
    fontFamily: "RedHatText_400Regular",
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: 600,
  },
});