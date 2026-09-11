import { StyleSheet } from "react-native";

export const notificacoesStyle = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6B00",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 35,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  card: {
    width: "100%",
    minHeight: 45,

    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,
    paddingVertical: 10 ,

    marginBottom: 20,
  },

  logo: {
    width: 26,
    height: 26,
    resizeMode: "contain",
    marginRight: 12,
  },

  caixaTextos: {
    flex: 1,
    minWidth: 0,
  },

  linhaNome: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap"
  },

  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginRight: 4,
    flexShrink: 1,
  },

  horario: {
    fontSize: 13,
    color: "#888",
    flexShrink: 1
  },

  mensagem: {
    fontSize: 14,
    color: "#111",
    flexShrink: 1
  },

});
