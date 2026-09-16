import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { homeStyle } from "../../../styles/homeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { publiStyle } from "../../../styles/publiStyle";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import api from "../../../service/service.js";

export default function Publicacao() {
  const { id } = useLocalSearchParams();

  const [publicacao, setPublicacao] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoComentario, setNovoComentario] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarDados();
  }, [id]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);

      const publiResponse = await api.get(`/publicacoes/${id}`);
      setPublicacao(publiResponse.data);

      const comentariosResponse = await api.get(
        `/comentarios?publicacaoId=${id}`
      );

      setComentarios(comentariosResponse.data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Não foi possível carregar a publicação.");
    } finally {
      setLoading(false);
    }
  };

  const adicionarComentario = async () => {
    if (!novoComentario.trim()) {
      Alert.alert("Aviso", "Escreva um comentário!");
      return;
    }

    try {
      const comentarioData = {
        publicacaoId: id,
        usuarioId: "1",
        nomeUsuario: "Você",
        data: new Date().toLocaleDateString("pt-BR"),
        texto: novoComentario,
      };

      const response = await api.post("/comentarios", comentarioData);

      setComentarios([
        ...comentarios,
        response.data || comentarioData,
      ]);

      setNovoComentario("");
    } catch (err) {
      console.error("Erro ao adicionar comentário:", err);
      Alert.alert(
        "Erro",
        "Não foi possível adicionar o comentário."
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={publiStyle.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#FF6600" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !publicacao) {
    return (
      <SafeAreaView style={publiStyle.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[publiStyle.fonte]}>
            {error || "Publicação não encontrada."}
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: "#FF6600",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#FFF" }}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={publiStyle.container}>
      <ScrollView
        contentContainerStyle={publiStyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={publiStyle.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={publiStyle.buttonBack}
          >
            <Ionicons
              name="chevron-back-outline"
              size={28}
              color="#FF6600"
            />
          </TouchableOpacity>

          <Text style={[publiStyle.title, publiStyle.fonte]}>
            Publicação
          </Text>

          <Ionicons
            name="share-social"
            size={28}
            color="#000000"
          />
        </View>

        <View style={publiStyle.cardPublicacao}>
          <View style={publiStyle.linhaPerfil}>
            <View style={publiStyle.cardPerfil}>
              {publicacao.fotoPerfil && (
                <Image
                  source={{ uri: publicacao.fotoPerfil }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 50,
                  }}
                />
              )}
            </View>

            <View style={publiStyle.infoPerfil}>
              <Text
                style={[
                  publiStyle.nomePerfil,
                  homeStyle.fonte,
                ]}
              >
                {publicacao.nomeUsuario}
              </Text>

              <Text
                style={[
                  publiStyle.nomePerfilData,
                  homeStyle.fonte,
                ]}
              >
                {publicacao.data}
              </Text>
            </View>
          </View>

          <Text
            style={[
              publiStyle.descricaoPublicacao,
              publiStyle.fonte,
            ]}
          >
            {publicacao.texto}
          </Text>

          {publicacao.imagem && (
            <Image
              style={publiStyle.imagePost}
              source={{ uri: publicacao.imagem }}
            />
          )}

          <View style={publiStyle.botaoCurtir}>
            <TouchableOpacity style={publiStyle.botaoCurtir}>
              <Ionicons
                name="heart-outline"
                size={24}
                color="#000000"
              />

              <Text style={[publiStyle.fonte]}>
                {publicacao.curtidas}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={publiStyle.botaoComentar}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="#000000"
              />

              <Text style={[publiStyle.fonte]}>
                {publicacao.comentariosCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={publiStyle.botaoSalvar}>
              <Ionicons
                name="bookmark-outline"
                size={24}
                color="#000000"
              />

              <Text style={[publiStyle.fonte]}>
                {publicacao.salvamentos}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={[
            publiStyle.subtitle,
            publiStyle.fonte,
          ]}
        >
          Comentários ({comentarios.length})
        </Text>

        {comentarios.map((comentario) => (
          <View
            key={comentario.id}
            style={publiStyle.cardComentario}
          >
            <View style={publiStyle.linhaPerfil}>
              <View style={publiStyle.cardPerfil}>
                {comentario.fotoPerfil && (
                  <Image
                    source={{ uri: comentario.fotoPerfil }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 50,
                    }}
                  />
                )}
              </View>

              <View style={publiStyle.infoPerfil}>
                <Text
                  style={[
                    publiStyle.nomePerfil,
                    homeStyle.fonte,
                  ]}
                >
                  {comentario.nomeUsuario}
                </Text>

                <Text
                  style={[
                    publiStyle.nomePerfilData,
                    homeStyle.fonte,
                  ]}
                >
                  {comentario.data}
                </Text>
              </View>
            </View>

            <Text
              style={[
                publiStyle.descricaoPublicacao,
                publiStyle.fonte,
              ]}
            >
              {comentario.texto}
            </Text>
          </View>
        ))}

        <View style={publiStyle.cardComentario2}>
          <TextInput
            style={publiStyle.descricaoPublicacao}
            placeholder="Escreva um comentário..."
            placeholderTextColor="#999"
            value={novoComentario}
            onChangeText={setNovoComentario}
          />

          <TouchableOpacity
            style={publiStyle.botaoPost}
            onPress={adicionarComentario}
          >
            <Ionicons
              name="paper-plane"
              size={24}
              color="#FD7509"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}