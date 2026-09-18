import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
  Keyboard,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { publiStyle } from "../../../styles/publiStyle.js";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import api from "../../../service/service.js";
import { useUsuario } from "../../../context/UsuarioContext.jsx";

export default function Publicacao() {
  const { id } = useLocalSearchParams();
  const { usuario } = useUsuario();

  const [publicacao, setPublicacao] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoComentario, setNovoComentario] = useState("");
  const [error, setError] = useState(null);
  const [isSalvo, setIsSalvo] = useState(false);
  const [salvoId, setSalvoId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [isCurtido, setIsCurtido] = useState(false);

  useEffect(() => {
    if (id) {
      carregarDados();
    }
  }, [id]);

  const carregarDados = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const publiResponse = await api.get(`/publicacoes/${id}`);
      setPublicacao(publiResponse.data);

      if (usuario?.id) {
        try {
          const salvosResponse = await api.get(
            `/salvos?usuarioId=${usuario.id}&publicacaoId=${id}`
          );
          if (salvosResponse.data && salvosResponse.data.length > 0) {
            setIsSalvo(true);
            setSalvoId(salvosResponse.data[0].id);
          } else {
            setIsSalvo(false);
            setSalvoId(null);
          }
        } catch (sErr) {
          console.warn("Erro ao verificar salvos:", sErr);
        }
      }

      try {
        const comentariosResponse = await api.get(`/comentarios?publicacaoId=${id}`);
        setComentarios(comentariosResponse.data);
      } catch (comentErr) {
        console.warn("Rota /comentarios não encontrada ou sem dados.");
        setComentarios([]);
      }
    } catch (err) {
      console.error(`Erro ao carregar publicação:`, err);
      setError(`Publicação não encontrada.`);
    } finally {
      setLoading(false);
    }
  };

  const alternarCurtida = async () => {
    if (!publicacao) return;

    const jaCurtido = isCurtido;
    const qtdAtual = publicacao.curtidas || 0;
    const novaQtd = jaCurtido ? Math.max(0, qtdAtual - 1) : qtdAtual + 1;

    setIsCurtido(!jaCurtido);
    setPublicacao((prev) => ({ ...prev, curtidas: novaQtd }));

    try {
      await api.put(`/publicacoes/${id}`, {
        ...publicacao,
        curtidas: novaQtd,
      });
    } catch (err) {
      console.error("Erro ao atualizar curtidas:", err);
      setIsCurtido(jaCurtido);
      setPublicacao((prev) => ({ ...prev, curtidas: qtdAtual }));
      Alert.alert("Erro", "Não foi possível registrar a curtida.");
    }
  };

  const alternarSalvar = async () => {
    if (!usuario?.id) {
      Alert.alert("Aviso", "Você precisa estar logado para salvar.");
      return;
    }

    try {
      if (isSalvo) {
        if (salvoId) {
          await api.delete(`/salvos/${salvoId}`);
        }
        setIsSalvo(false);
        setSalvoId(null);
      } else {
        const novoSalvo = {
          usuarioId: String(usuario.id),
          publicacaoId: String(id),
          imagem: publicacao?.imagem || null,
          texto: publicacao?.texto || "",
        };

        const response = await api.post("/salvos", novoSalvo);
        setIsSalvo(true);
        setSalvoId(response.data.id);
      }
    } catch (err) {
      console.error("Erro ao alternar salvamento:", err);
      Alert.alert("Erro", "Não foi possível salvar a publicação.");
    }
  };

  const adicionarComentario = async () => {
    const textoLimpo = novoComentario.trim();

    if (!textoLimpo) {
      Alert.alert("Aviso", "Escreva um comentário!");
      return;
    }

    Keyboard.dismiss();

    const novoComentarioObj = {
      publicacaoId: String(id),
      usuarioId: usuario?.id ? String(usuario.id) : "1",
      nomeUsuario: usuario?.nome || usuario?.user || "Usuário",
      fotoPerfil: usuario?.foto || null,
      data: new Date().toLocaleDateString("pt-BR"),
      texto: textoLimpo,
    };

    try {
      const response = await api.post("/comentarios", novoComentarioObj);

      setComentarios((listaAtual) => [
        ...listaAtual,
        response.data || { ...novoComentarioObj, id: Date.now().toString() },
      ]);
      setNovoComentario("");
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
      setComentarios((listaAtual) => [
        ...listaAtual,
        { ...novoComentarioObj, id: Date.now().toString() },
      ]);
      setNovoComentario("");
    }
  };

  const deletarPublicacao = () => {
    setModalVisible(false);
    Alert.alert(
      "Apagar Publicação",
      "Tem certeza que deseja apagar esta publicação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/publicacoes/${id}`);
              Alert.alert("Sucesso", "Publicação apagada com sucesso!");
              router.back();
            } catch (err) {
              console.error("Erro ao apagar publicação:", err);
              Alert.alert("Erro", "Não foi possível apagar a publicação.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={publiStyle.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#FF6600" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !publicacao) {
    return (
      <SafeAreaView style={publiStyle.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            <Text style={{ color: "#FFF" }}>Voltar</Text>
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
        keyboardShouldPersistTaps="handled"
      >
        <View style={publiStyle.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={publiStyle.buttonBack}
          >
            <Ionicons name="chevron-back-outline" size={28} color="#FF6600" />
          </TouchableOpacity>

          <Text style={[publiStyle.title, publiStyle.fonte]}>Publicação</Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="share-social" size={28} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={publiStyle.cardPublicacao}>
          <View style={publiStyle.linhaPerfil}>
            <View style={publiStyle.cardPerfil}>
              {publicacao.fotoPerfil ? (
                <Image
                  source={{ uri: publicacao.fotoPerfil }}
                  style={{ width: "100%", height: "100%", borderRadius: 50 }}
                />
              ) : (
                <Ionicons name="person-circle-outline" size={40} color="#ccc" />
              )}
            </View>

            <View style={publiStyle.infoPerfil}>
              <Text style={[publiStyle.nomePerfil, publiStyle.fonte]}>
                {publicacao.nomeUsuario}
              </Text>
              <Text style={[publiStyle.nomePerfilData, publiStyle.fonte]}>
                {publicacao.data}
              </Text>
            </View>

            <View style={publiStyle.containerLocalizacao}>
              <Ionicons name="location-outline" size={16} color="#686666" />
              <Text style={[publiStyle.textoLocalizacao, publiStyle.fonte]}>
                {publicacao.localizacao || "São Paulo, SP"}
              </Text>
            </View>
          </View>

          <Text style={[publiStyle.descricaoPublicacao, publiStyle.fonte]}>
            {publicacao.texto}
          </Text>

          {publicacao.imagem && (
            <Image
              style={publiStyle.imagePost}
              source={{ uri: publicacao.imagem }}
            />
          )}

          <View style={publiStyle.linhaAcoes}>
            <TouchableOpacity style={publiStyle.botaoCurtir} onPress={alternarCurtida}>
              <Ionicons
                name={isCurtido ? "heart" : "heart-outline"}
                size={22}
                color={isCurtido ? "#E53935" : "#000000"}
              />
              <Text style={publiStyle.textoAcao}>{publicacao.curtidas || 0}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={publiStyle.botaoComentar}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color="#000000" />
              <Text style={publiStyle.textoAcao}>{comentarios.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={publiStyle.botaoSalvar} onPress={alternarSalvar}>
              <Ionicons
                name={isSalvo ? "bookmark" : "bookmark-outline"}
                size={22}
                color={isSalvo ? "#FF6600" : "#000000"}
              />
              <Text style={publiStyle.textoAcao}>
                {(publicacao.salvamentos || 0) + (isSalvo ? 1 : 0)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[publiStyle.subtitle, publiStyle.fonte]}>
          Comentários ({comentarios.length})
        </Text>

        {comentarios.map((comentario, index) => (
          <View key={comentario.id || index} style={publiStyle.cardComentario}>
            <View style={publiStyle.linhaPerfil}>
              <View style={publiStyle.cardPerfil}>
                {comentario.fotoPerfil ? (
                  <Image
                    source={{ uri: comentario.fotoPerfil }}
                    style={{ width: "100%", height: "100%", borderRadius: 50 }}
                  />
                ) : (
                  <Ionicons name="person-circle-outline" size={36} color="#ccc" />
                )}
              </View>

              <View style={publiStyle.infoPerfil}>
                <Text style={[publiStyle.nomePerfil, publiStyle.fonte]}>
                  {comentario.nomeUsuario}
                </Text>
                <Text style={[publiStyle.nomePerfilData, publiStyle.fonte]}>
                  {comentario.data}
                </Text>
              </View>
            </View>

            <Text style={[publiStyle.descricaoPublicacao, publiStyle.fonte]}>
              {comentario.texto}
            </Text>
          </View>
        ))}

        <View style={publiStyle.cardComentario2}>
          <TextInput
            style={[publiStyle.descricaoPublicacao, { flex: 1, paddingLeft: 0 }]}
            placeholder="Escreva um comentário..."
            placeholderTextColor="#999"
            value={novoComentario}
            onChangeText={setNovoComentario}
            onSubmitEditing={adicionarComentario}
            returnKeyType="send"
          />

          <TouchableOpacity
            style={publiStyle.botaoPost}
            onPress={adicionarComentario}
          >
            <Ionicons name="paper-plane" size={24} color="#FD7509" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={publiStyle.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={publiStyle.modalContent}>
            <View style={publiStyle.modalDragIndicator} />

            <TouchableOpacity
              style={publiStyle.modalOption}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="share-outline" size={22} color="#000" />
              <Text style={[publiStyle.modalOptionText, publiStyle.fonte]}>
                Compartilhar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={publiStyle.modalOption}
              onPress={deletarPublicacao}
            >
              <Ionicons name="trash-outline" size={22} color="#E53935" />
              <Text style={[publiStyle.modalOptionText, { color: "#E53935" }, publiStyle.fonte]}>
                Apagar publicação
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[publiStyle.modalOption, { borderBottomWidth: 0, marginTop: 6 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[publiStyle.modalOptionText, { color: "#888", textAlign: "center", width: "100%" }, publiStyle.fonte]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}