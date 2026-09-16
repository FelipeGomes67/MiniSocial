import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

import { notificacoesStyle } from "../../styles/notificacoesStyle";

import comentario from "../../../assets/Comentario.png";
import curtida from "../../../assets/Curtida.png";
import seguidor from "../../../assets/Seguindo.png";

import api from "../../service/service.js";

const tipoImagemMap = {
  comentario: comentario,
  curtida: curtida,
  seguidor: seguidor,
};

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  const carregarNotificacoes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/notificacoes");
      setNotificacoes(response.data);
    } catch (err) {
      console.error("Erro ao carregar notificações:", err);
      setError("Não foi possível carregar as notificações.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1 }}>
        <View style={notificacoesStyle.container}>
          <Text style={notificacoesStyle.title}>Notificações</Text>

          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#FF6600" />
            </View>
          ) : error ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{error}</Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={notificacoesStyle.scrollContent}
            >
              {notificacoes.map((notificacao) => (
                <View
                  key={notificacao.id}
                  style={notificacoesStyle.card}
                >
                  <Image
                    source={
                      tipoImagemMap[notificacao.imagemTipo] || seguidor
                    }
                    style={notificacoesStyle.logo}
                  />

                  <View style={notificacoesStyle.caixaTextos}>
                    <View style={notificacoesStyle.linhaNome}>
                      <Text style={notificacoesStyle.nome}>
                        {notificacao.nomeUsuario}
                      </Text>

                      <Text style={notificacoesStyle.horario}>
                        {notificacao.horario}
                      </Text>
                    </View>

                    <Text style={notificacoesStyle.mensagem}>
                      {notificacao.mensagem}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}