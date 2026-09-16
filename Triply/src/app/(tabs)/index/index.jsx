import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { homeStyle } from "../../../styles/homeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import api from "../../../service/service.js";

export default function Home() {
  const router = useRouter();
  const [publicacoes, setPublicacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarPublicacoes();
  }, []);

  const carregarPublicacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/publicacoes");
      setPublicacoes(response.data);
    } catch (err) {
      console.error("Erro ao carregar publicações:", err);
      setError("Não foi possível carregar as publicações.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={homeStyle.container}>
      <View style={homeStyle.header}>
        <Image
          source={require("../../../../assets/Logo.png")}
          style={homeStyle.image}
        />

        <Text style={homeStyle.title}>Triply</Text>

        <TouchableOpacity
          style={homeStyle.botaoPesquisar}
          onPress={() => router.push("/pesquisa")}
        >
          <Ionicons name="search-sharp" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#FF6600" />
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={[homeStyle.fonte]}>{error}</Text>
          <TouchableOpacity
            onPress={carregarPublicacoes}
            style={{ marginTop: 10, padding: 10, backgroundColor: "#FF6600", borderRadius: 5 }}
          >
            <Text style={{ color: "#FFF" }}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {publicacoes.map((publicacao) => (
            <TouchableOpacity
              key={publicacao.id}
              style={homeStyle.cardPublicacao}
              onPress={() => {
                router.push({ 
                  pathname: "/[id]",
                  params: { id: publicacao.id }
                });
              }}
            >
              <View style={homeStyle.linhaPerfil}>
                <View style={homeStyle.cardPerfil}>
                  <Text style={[homeStyle.cardPerfilText, homeStyle.fonte]}>
                    P
                  </Text>
                </View>

                <View style={homeStyle.infoPerfil}>
                  <Text style={[homeStyle.nomePerfil, homeStyle.fonte]}>
                    {publicacao.nomeUsuario}
                  </Text>

                  <Text style={[homeStyle.nomePerfilData, homeStyle.fonte]}>
                    {publicacao.data}
                  </Text>
                </View>
              </View>

              <Text style={[homeStyle.descricaoPublicacao, homeStyle.fonte]}>
                {publicacao.texto}
              </Text>

              <View style={homeStyle.botaoCurtir}>
                <TouchableOpacity style={homeStyle.botaoCurtir}>
                  <Ionicons name="heart-outline" size={24} color="#000000" />
                  <Text style={[homeStyle.fonte]}>{publicacao.curtidas}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={homeStyle.botaoComentar}>
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={24}
                    color="#000000"
                  />
                  <Text style={[homeStyle.fonte]}>{publicacao.comentariosCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={homeStyle.botaoSalvar}>
                  <Ionicons name="bookmark-outline" size={24} color="#000000" />
                  <Text style={[homeStyle.fonte]}>{publicacao.salvamentos}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}