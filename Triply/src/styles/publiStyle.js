import { StyleSheet } from "react-native";

export const publiStyle = StyleSheet.create({

  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FD7509",
    paddingLeft: 80,
    paddingRight: 70,
    // textAlign: "center"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    paddingLeft: 10,
    
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 'auto',
  },
  cardPublicacao: {
    backgroundColor: "#fff",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginRight: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  cardComentario: {
      borderColor: "#9B9B9B",
      backgroundColor: "#fff",
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 20,
      paddingHorizontal: 20,
      marginBottom: 20,
      marginRight: 20,
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
    },
    cardComentario2: {
        backgroundColor: "#f5f5f5",
        borderColor: "#9B9B9B",
        borderWidth: 1,
        borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  imagePost: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  linhaPerfil: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardPerfil: {
    backgroundColor: "#000000",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  infoPerfil: {
    flexDirection: "column",
  },
  cardPerfilText: {
    fontWeight: "bold",
    color: "#fff",
  },
  nomePerfil: {
    fontWeight: "bold",
    fontSize: 16,
  },
  infoPerfil: {
    flexDirection: "column",
  },
  descricaoPublicacao: {
    fontSize: 16,
    textAlign: "justify",
  },
  nomePerfilData: {
    fontSize: 14,
    color: "#686666",
  },
  botaoCurtir: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginRight: "auto",
  },
  botaoComentar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  botaoSalvar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 180,
  },
  botaoPost: {
   
    // // marginTop: 10,
   
  },
  fonte: {
    fontFamily: "RedHatText_400Regular",
  },
});