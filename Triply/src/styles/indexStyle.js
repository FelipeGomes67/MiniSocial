import { StyleSheet } from "react-native";

export const indexStyle = StyleSheet.create({
  BackGround: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)", 
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 70,
    alignSelf: "center",
    resizeMode: "contain",
  },
  tittle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "RedHatText_700Bold",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 40,
    color: "#E0E0E0",
    fontFamily: "RedHatText_400Regular",
    lineHeight: 22,
    width: "85%",
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});