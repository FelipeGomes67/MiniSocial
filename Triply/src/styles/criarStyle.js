import { StyleSheet } from "react-native";

export const criarStyle = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizoltal: 20,
    },
    close: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FD7509",
        position: "absolute",
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FD7509",
        textAlign: "center",
        marginBottom: 55,
    },
    subtitle: {
        fontSize: 16,
        marginLeft: 30,
        color: "#9b9b9b",
    },
    cardPublicacao: {
        backgroundColor: "#F5F3F4",
        borderColor: "#686666",
        borderWidth: 1,
        borderRadius: 8,
        width: "90%",
        height: 200,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        flexDirection: "column",
    },
    descricao: {
        fontSize: 16,
        color: "#9b9b9b",
        width: "100%",
        height: "100%",
        paddingLeft: 10,
        paddingTop: 10,
        textAlignVertical: "top",
    },
    caracteres: {
        fontSize: 16,
        color: "#9b9b9b",
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    botoes: {
        color: "#9b9b9b",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 25,
    },
    colorText: {
        color: "#9b9b9b",
    },
    botaoImagem: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 25,
    },
    botaoLocalizacao: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 100,
    },
    containerBotaoPublicar: {
        marginTop: 25,
        width: "90%",
        alignSelf: "center",
    },
});