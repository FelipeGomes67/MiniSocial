import { StyleSheet } from "react-native";

export const cadastroStyle = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#FF6600",
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 15,
  },

  signupLink: {
    color: '#FF6600',
    fontWeight: '700',
  },
  signupText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#FD7509",
    height: 45,
    width: "100%",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: 300,
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 5
  },
});