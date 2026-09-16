import { StyleSheet } from "react-native";

export const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
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
        paddingLeft: 10,
    },
    image: {
        width: 40,
        height: 40,
        marginBottom: "auto",
    },
    botaoPesquisar: {
        alignItems: "center",
        marginTop: 10,
        marginLeft: "auto",
    },
    cardPublicacao: {
        backgroundColor: "#fff",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
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
    cardPerfilText: {
        fontWeight: "bold",
        color: "#fff",
    },
    infoPerfil: {
        flexDirection: "column",
    },
    nomePerfil: {
        fontWeight: "bold",
        fontSize: 16,
    },
    nomePerfilData: {
        fontSize: 14,
        color: "#686666",
    },
    descricaoPublicacao: {
        fontSize: 16,
        textAlign: "justify",
    },
    linhaAcoes: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 14,
    },
    botaoCurtir: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    botaoComentar: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16,
        gap: 6,
    },
    botaoSalvar: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        gap: 6,
    },
    textoAcao: {
        fontSize: 14,
        color: "#000000",
    },
    fonte: {},
});