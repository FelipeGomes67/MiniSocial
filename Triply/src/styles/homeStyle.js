import { StyleSheet } from "react-native";

export const homeStyle = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FD7509",
        paddingLeft: 10,
    },
    image: {
        width: 40,
        height: 40,
        marginBottom: 'auto',
    },

    botaoPesquisar: {
        alignItems: "center",
        marginTop: 10,
        marginLeft: 'auto',
    },
    cardPublicacao: {
        backgroundColor: "#fff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        marginRight: 20,
        flexDirection: "column",
        alignItems: "flex-start",
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
        marginLeft: 167,
    },
});