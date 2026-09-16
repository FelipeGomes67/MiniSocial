import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { notificacoesStyle } from "../../styles/notificacoesStyle";
import api from "../../service/service";

import comentario from "../../../assets/Comentario.png";
import curtida from "../../../assets/Curtida.png";
import seguidor from "../../../assets/Seguindo.png";

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarNotificacoes();
  }, []);

  const buscarNotificacoes = async () => {
    try {
      const resposta = await api.get("/notificacoes");
      setNotificacoes(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    } finally {
      setCarregando(false);
    }
  };

  const obterDetalhesTipo = (tipo) => {
    switch (tipo) {
      case "comentario":
        return {
          imagem: comentario,
          mensagem: "Comentou em sua Publicação.",
        };
      case "seguidor":
        return {
          imagem: seguidor,
          mensagem: "Começou a Seguir você!",
        };
      case "curtida":
        return {
          imagem: curtida,
          mensagem: "Curtiu uma Publicação sua!",
        };
      default:
        return {
          imagem: comentario,
          mensagem: "Interagiu com você.",
        };
    }
  };

  const formatarDataHora = (dataiso) => {
    if (!dataiso) return "";
    const data = new Date(dataiso);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes} às ${horas}:${minutos}`;
  };

  if (carregando) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6600" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1 }}>
        <View style={notificacoesStyle.container}>
          <Text style={notificacoesStyle.title}>Notificações</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={notificacoesStyle.scrollContent}
          >
            {notificacoes.map((item) => {
              const detalhes = obterDetalhesTipo(item.tipo);

              return (
                <View key={item.id} style={notificacoesStyle.card}>
                  <Image
                    source={detalhes.imagem}
                    style={notificacoesStyle.logo}
                  />

                  <View style={notificacoesStyle.caixaTextos}>
                    <View style={notificacoesStyle.linhaNome}>
                      <Text style={notificacoesStyle.nome}>
                        {item.nomeUsuario}
                      </Text>

                      <Text style={notificacoesStyle.horario}>
                        {formatarDataHora(item.datahora)}
                      </Text>
                    </View>

                    <Text style={notificacoesStyle.mensagem}>
                      {detalhes.mensagem}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}