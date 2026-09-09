import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#FF6600",
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 15,
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
  esqueceuSenha: {
    fontSize: 14,
    color: '#FF6600',
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC', 
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: '#888888',
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
  signupLink: {
    color: '#FF6600',
    fontWeight: 'bold',
  },
});