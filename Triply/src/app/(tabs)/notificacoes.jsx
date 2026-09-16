import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { notificacoesStyle } from "../../styles/notificacoesStyle";

import comentario from "../../../assets/Comentario.png";
import curtida from "../../../assets/Curtida.png";
import seguidor from "../../../assets/Seguindo.png";

import api from "../../service/service.js";

// Mapeamento dos Ícones pelo campo "tipo"
const tipoImagemMap = {
  comentario: comentario,
  curtida: curtida,
  seguidor: seguidor,
};

// Mapeamento das Mensagens Predefinidas
const mensagemPadraoMap = {
  comentario: "comentou na sua publicação.",
  curtida: "curtiu a sua publicação.",
  seguidor: "começou a te seguir.",
};

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const carregarNotificacoes = async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await api.get("/notificacoes");
      setNotificacoes(response.data || []);
    } catch (err) {
      console.error("Erro ao carregar notificações:", err);
      setError("Não foi possível carregar as notificações.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  const onRefresh = useCallback(() => {
    carregarNotificacoes(true);
  }, []);

  // Formata a string ISO "2026-09-16T12:54:00.000Z" para apenas as horas "12:54"
  const formatarHorario = (dataiso) => {
    if (!dataiso) return "";
    const data = new Date(dataiso);
    return data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderNotificacao = ({ item }) => {
    // Busca a mensagem padronizada de acordo com o tipo
    const mensagemTexto =
      item.mensagem || mensagemPadraoMap[item.tipo] || "interagiu com você.";

    // Busca o ícone de acordo com o tipo
    const iconeImagem = tipoImagemMap[item.tipo] || seguidor;

    return (
      <View style={notificacoesStyle.card}>
        <Image source={iconeImagem} style={notificacoesStyle.logo} />

        <View style={notificacoesStyle.caixaTextos}>
          <View style={notificacoesStyle.linhaNome}>
            <Text style={notificacoesStyle.nome}>{item.nomeUsuario}</Text>
            <Text style={notificacoesStyle.horario}>
              {formatarHorario(item.datahora)}
            </Text>
          </View>

          <Text style={notificacoesStyle.mensagem}>{mensagemTexto}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1 }}>
        <View style={notificacoesStyle.container}>
          <Text style={notificacoesStyle.title}>Notificações</Text>

          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#FF6600" />
            </View>
          ) : error ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
              <Text style={{ textAlign: "center", marginBottom: 12, color: "#333" }}>
                {error}
              </Text>
              <TouchableOpacity
                onPress={() => carregarNotificacoes()}
                style={{
                  backgroundColor: "#FF6600",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#FFF", fontWeight: "bold" }}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={notificacoes}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderNotificacao}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={notificacoesStyle.scrollContent}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#FF6600"]}
                  tintColor="#FF6600"
                />
              }
              ListEmptyComponent={
                <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
                  <Text style={{ color: "#888" }}>Nenhuma notificação encontrada.</Text>
                </View>
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}