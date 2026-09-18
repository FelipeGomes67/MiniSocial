import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { homeStyle } from "../../../styles/homeStyle.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import api from "../../../service/service.js";
import { useUsuario } from "../../../context/UsuarioContext.jsx";

export default function Home() {
  const router = useRouter();
  const { usuario } = useUsuario();
  const [publicacoes, setPublicacoes] = useState([]);
  const [salvosMap, setSalvosMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [curtidosMap, setCurtidosMap] = useState({});

  useEffect(() => {
    carregarPublicacoes();
  }, [usuario?.id]);

  const carregarPublicacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/publicacoes");
      setPublicacoes(response.data);

      if (usuario?.id) {
        try {
          const salvosResp = await api.get(`/salvos?usuarioId=${usuario.id}`);
          const mapa = {};
          salvosResp.data.forEach((item) => {
            mapa[item.publicacaoId] = item.id;
          });
          setSalvosMap(mapa);
        } catch (sErr) {
          console.warn("Erro ao carregar salvos:", sErr);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar publicações:", err);
      setError("Não foi possível carregar as publicações.");
    } finally {
      setLoading(false);
    }
  };

  const alternarCurtida = async (publicacao) => {
    const pubId = String(publicacao.id);
    const jaCurtido = Boolean(curtidosMap[pubId]);
    const qtdAtual = publicacao.curtidas || 0;
    const novaQtd = jaCurtido ? Math.max(0, qtdAtual - 1) : qtdAtual + 1;

    setCurtidosMap((prev) => ({ ...prev, [pubId]: !jaCurtido }));
    setPublicacoes((prev) =>
      prev.map((p) =>
        String(p.id) === pubId ? { ...p, curtidas: novaQtd } : p
      )
    );

    try {
      await api.put(`/publicacoes/${pubId}`, {
        ...publicacao,
        curtidas: novaQtd,
      });
    } catch (err) {
      console.error("Erro ao atualizar curtida:", err);
      setCurtidosMap((prev) => ({ ...prev, [pubId]: jaCurtido }));
      setPublicacoes((prev) =>
        prev.map((p) =>
          String(p.id) === pubId ? { ...p, curtidas: qtdAtual } : p
        )
      );
      Alert.alert("Erro", "Não foi possível registrar a curtida.");
    }
  };

  const alternarSalvar = async (publicacao) => {
    if (!usuario?.id) {
      Alert.alert("Aviso", "Faça login para salvar!");
      return;
    }

    const pubId = String(publicacao.id);
    const salvoId = salvosMap[pubId];

    try {
      if (salvoId) {
        await api.delete(`/salvos/${salvoId}`);
        setSalvosMap((prev) => {
          const novo = { ...prev };
          delete novo[pubId];
          return novo;
        });
      } else {
        const novoSalvo = {
          usuarioId: String(usuario.id),
          publicacaoId: pubId,
          imagem: publicacao.imagem || null,
          texto: publicacao.texto || "",
        };

        const res = await api.post("/salvos", novoSalvo);
        setSalvosMap((prev) => ({
          ...prev,
          [pubId]: res.data.id,
        }));
      }
    } catch (err) {
      console.error("Erro ao salvar/remover publicação:", err);
      Alert.alert("Erro", "Não foi possível realizar esta ação.");
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {publicacoes.map((publicacao) => {
            const pubId = String(publicacao.id);
            const estaSalvo = Boolean(salvosMap[pubId]);
            const estaCurtido = Boolean(curtidosMap[pubId]);

            return (
              <TouchableOpacity
                key={publicacao.id}
                style={homeStyle.cardPublicacao}
                onPress={() => {
                  router.push({
                    pathname: "/(tabs)/home/[id]",
                    params: { id: publicacao.id },
                  });
                }}
              >
                <View style={homeStyle.linhaPerfil}>
                  <View style={homeStyle.cardPerfil}>
                    {publicacao.fotoPerfil ? (
                      <Image
                        source={{ uri: publicacao.fotoPerfil }}
                        style={{ width: "100%", height: "100%", borderRadius: 20 }}
                      />
                    ) : (
                      <Text style={[homeStyle.cardPerfilText, homeStyle.fonte]}>
                        {publicacao.nomeUsuario
                          ? publicacao.nomeUsuario.charAt(0).toUpperCase()
                          : "U"}
                      </Text>
                    )}
                  </View>

                  <View style={homeStyle.infoPerfil}>
                    <Text style={[homeStyle.nomePerfil, homeStyle.fonte]}>
                      {publicacao.nomeUsuario}
                    </Text>

                    <Text style={[homeStyle.nomePerfilData, homeStyle.fonte]}>
                      {publicacao.data}
                    </Text>
                  </View>

                  <View style={homeStyle.containerLocalizacao}>
                    <Ionicons name="location-outline" size={16} color="#686666" />
                    <Text style={[homeStyle.textoLocalizacao, homeStyle.fonte]}>
                      {publicacao.localizacao || "São Paulo, SP"}
                    </Text>
                  </View>
                </View>

                <Text style={[homeStyle.descricaoPublicacao, homeStyle.fonte]}>
                  {publicacao.texto}
                </Text>

                {publicacao.imagem && (
                  <Image
                    source={{ uri: publicacao.imagem }}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 10,
                      marginVertical: 10,
                    }}
                    resizeMode="cover"
                  />
                )}

                <View style={homeStyle.linhaAcoes}>
                  <TouchableOpacity
                    style={homeStyle.botaoCurtir}
                    onPress={() => alternarCurtida(publicacao)}
                  >
                    <Ionicons
                      name={estaCurtido ? "heart" : "heart-outline"}
                      size={22}
                      color={estaCurtido ? "#E53935" : "#000000"}
                    />
                    <Text style={homeStyle.textoAcao}>{publicacao.curtidas || 0}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={homeStyle.botaoComentar}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={22}
                      color="#000000"
                    />
                    <Text style={homeStyle.textoAcao}>{publicacao.comentariosCount}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={homeStyle.botaoSalvar}
                    onPress={() => alternarSalvar(publicacao)}
                  >
                    <Ionicons
                      name={estaSalvo ? "bookmark" : "bookmark-outline"}
                      size={22}
                      color={estaSalvo ? "#FF6600" : "#000000"}
                    />
                    <Text style={homeStyle.textoAcao}>
                      {(publicacao.salvamentos || 0) + (estaSalvo ? 1 : 0)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}