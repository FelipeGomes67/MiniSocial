import { StyleSheet } from "react-native";

export const esqueceuSenhaStyle = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 45,
    height: 45,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 5
  },
  imageCadeado: {
    width: 85,
    height: 85,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FF6600",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "stretch"
  },
  inputContainer: {
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textNorm: {
    fontSize: 14,
    marginBottom: 15,
    color: '#9B9B9B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 30,
    fontFamily: "RedHatText_400Regular",
  },
  fonte: {
    fontFamily: "RedHatText_400Regular",
  }
});