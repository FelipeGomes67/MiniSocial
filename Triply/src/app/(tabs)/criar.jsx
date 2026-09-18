import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { criarStyle } from "../../styles/criarStyle";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Botao from "../../components/botao/botao";
import * as Location from "expo-location";
import { router } from "expo-router";
import api from "../../service/service.js";
import { useUsuario } from "../../context/UsuarioContext";

export default function Criar() {
  const { usuario } = useUsuario();

  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState(null);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [opcoesAbertas, setOpcoesAbertas] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [localizacao, setLocalizacao] = useState("Buscando local...");
  const [publicando, setPublicando] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    pegarLocalizacaoAutomatica();
  }, []);

  async function redimensionarEConverterBase64(uri) {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    return `data:image/jpeg;base64,${result.base64}`;
  }

  async function pegarLocalizacaoAutomatica() {
    try {
      setLocalizacao("Buscando local...");
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocalizacao("São Paulo, SP");
        return;
      }

      const local = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const endereco = await Location.reverseGeocodeAsync({
        latitude: local.coords.latitude,
        longitude: local.coords.longitude,
      });

      if (endereco.length > 0) {
        const dados = endereco[0];
        const bairro = dados.district || dados.subregion;
        const cidade = dados.city;

        let enderecoFormatado = "";

        if (bairro && cidade) {
          enderecoFormatado = `${bairro}, ${cidade}`;
        } else if (cidade) {
          enderecoFormatado = `${cidade}, ${dados.region || ""}`;
        } else {
          enderecoFormatado = dados.street || "São Paulo, SP";
        }

        setLocalizacao(enderecoFormatado);
      } else {
        setLocalizacao("São Paulo, SP");
      }
    } catch (error) {
      console.log("Erro ao pegar localização automática:", error);
      setLocalizacao("São Paulo, SP");
    }
  }

  async function publicarPublicacao() {
    if (!texto.trim()) {
      Alert.alert("Aviso", "Escreva algo para publicar!");
      return;
    }

    if (!usuario || !usuario.id) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      setPublicando(true);

      // Converte a foto de perfil para Base64 caso seja um URI local (file://)
      let fotoPerfilBase64 = usuario.foto || null;
      if (fotoPerfilBase64 && fotoPerfilBase64.startsWith("file://")) {
        try {
          fotoPerfilBase64 = await redimensionarEConverterBase64(fotoPerfilBase64);
        } catch (err) {
          console.error("Erro ao converter foto de perfil:", err);
        }
      }

      const novaPublicacao = {
        usuarioId: String(usuario.id),
        nomeUsuario: usuario.nome || usuario.user || "Usuário",
        fotoPerfil: fotoPerfilBase64,
        data: new Date().toLocaleDateString("pt-BR"),
        texto: texto.trim(),
        imagem: imagem || null,
        localizacao: localizacao || "São Paulo, SP",
        curtidas: 0,
        comentariosCount: 0,
        salvamentos: 0,
      };

      const response = await api.post("/publicacoes", novaPublicacao);
      const novoId = response.data.id;

      Alert.alert("Sucesso", "Publicação criada com sucesso!");

      setTexto("");
      setImagem(null);

      router.push(`/home/${novoId}`);
    } catch (error) {
      console.error("Erro ao publicar:", error);
      Alert.alert("Erro", "Não foi possível publicar. Tente novamente.");
    } finally {
      setPublicando(false);
    }
  }

  function abrirOpcoesImagem() {
    setOpcoesAbertas(true);
  }

  async function abrirCamera() {
    setOpcoesAbertas(false);

    if (!permission?.granted) {
      const resposta = await requestPermission();

      if (!resposta.granted) return;
    }

    setCameraAberta(true);
  }

  async function tirarFoto() {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      const imagemRedimensionada = await redimensionarEConverterBase64(foto.uri);
      
      setImagem(imagemRedimensionada);
      setCameraAberta(false);
    }
  }

  async function abrirGaleria() {
    setOpcoesAbertas(false);

    const resposta = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!resposta.granted) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!resultado.canceled && resultado.assets[0]) {
      const imagemRedimensionada = await redimensionarEConverterBase64(resultado.assets[0].uri);
      setImagem(imagemRedimensionada);
    }
  }

  return (
    <SafeAreaView style={criarStyle.container}>
      <Text style={criarStyle.title}>Nova Publicação</Text>

      <View>
        <Text style={criarStyle.subtitle}>O que você está pensando?</Text>

        <View style={criarStyle.cardPublicacao}>
          <TextInput
            style={criarStyle.descricao}
            placeholder="Escreva algo..."
            placeholderTextColor="#9b9b9b"
            multiline={true}
            maxLength={500}
            value={texto}
            onChangeText={setTexto}
          />

          <Text style={criarStyle.caracteres}>{texto.length}/500</Text>
        </View>
      </View>

      {imagem && (
        <Image
          source={{ uri: imagem }}
          style={criarStyle.previewImagem}
        />
      )}

      <View style={criarStyle.botoes}>
        <TouchableOpacity
          style={criarStyle.botaoImagem}
          onPress={abrirOpcoesImagem}
        >
          <Ionicons
            name="image-outline"
            size={24}
            color="#000000"
          />
          <Text style={criarStyle.colorText}>Imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={criarStyle.botaoLocalizacao}
          onPress={pegarLocalizacaoAutomatica}
        >
          <Ionicons
            name="location-outline"
            size={24}
            color="#000000"
          />
          <Text
            style={criarStyle.textoLocalizacao}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {localizacao}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={criarStyle.containerBotaoPublicar}>
        <Botao
          botao="Publicar"
          onPress={publicarPublicacao}
          disabled={publicando}
        />
      </View>

      <Modal
        visible={opcoesAbertas}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpcoesAbertas(false)}
      >
        <TouchableOpacity
          style={criarStyle.overlayOpcoes}
          activeOpacity={1}
          onPress={() => setOpcoesAbertas(false)}
        >
          <View style={criarStyle.menuOpcoes}>
            <TouchableOpacity
              style={criarStyle.itemOpcao}
              onPress={abrirCamera}
            >
              <Ionicons
                name="camera-outline"
                size={22}
                color="#000"
              />
              <Text style={criarStyle.textoItemOpcao}>Tirar foto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={criarStyle.itemOpcao}
              onPress={abrirGaleria}
            >
              <Ionicons
                name="images-outline"
                size={22}
                color="#000"
              />
              <Text style={criarStyle.textoItemOpcao}>
                Escolher da galeria
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={criarStyle.itemOpcaoCancelar}
              onPress={() => setOpcoesAbertas(false)}
            >
              <Text style={criarStyle.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={cameraAberta} animationType="slide">
        <CameraView style={{ flex: 1 }} ref={cameraRef} facing="back">
          <View style={criarStyle.camaraControles}>
            <TouchableOpacity
              style={criarStyle.botaoFecharCamera}
              onPress={() => setCameraAberta(false)}
            >
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={criarStyle.botaoCapturar}
              onPress={tirarFoto}
            >
              <View style={criarStyle.circuloCapturar} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </Modal>
    </SafeAreaView>
  );
}