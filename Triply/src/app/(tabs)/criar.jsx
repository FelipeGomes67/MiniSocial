import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, Image, TextInput, Modal } from "react-native";
import { criarStyle } from "../../styles/criarStyle";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Botao from "../../components/botao/botao";

export default function Criar() {
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState(null);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [opcoesAbertas, setOpcoesAbertas] = useState(false); // menu "Tirar foto / Galeria"
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Abre o menu de opções ao tocar em "Imagem"
  function abrirOpcoesImagem() {
    setOpcoesAbertas(true);
  }

  // Opção 1: abrir a câmera
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
      const foto = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setImagem(foto.uri);
      setCameraAberta(false);
    }
  }

  // Opção 2: abrir a galeria
  async function abrirGaleria() {
    setOpcoesAbertas(false);

    const resposta = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!resposta.granted) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  }

  return (
    <SafeAreaView style={criarStyle.container}>
      <TouchableOpacity>
        <Text style={criarStyle.close}>X</Text>
      </TouchableOpacity>

      <Text style={criarStyle.title}>Nova Publicação</Text>

      <View>
        <Text style={criarStyle.subtitle}>O que você está pensando?</Text>
        <View style={criarStyle.cardPublicacao}>
          <TextInput
            style={criarStyle.descricao}
            placeholder="Escreva algo..."
            placeholderTextColor="#9b9b9b"
            multiline={true}
            maxLength={280}
            value={texto}
            onChangeText={setTexto}
          />
          <Text style={criarStyle.caracteres}>{texto.length}/280</Text>
        </View>
      </View>

      {imagem && (
        <Image source={{ uri: imagem }} style={criarStyle.previewImagem} />
      )}

      <View style={criarStyle.botoes}>
        <TouchableOpacity style={criarStyle.botaoImagem} onPress={abrirOpcoesImagem}>
          <Ionicons name="image-outline" size={24} color="#000000" />
          <Text style={criarStyle.colorText}>Imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={criarStyle.botaoLocalizacao}>
          <Ionicons name="location-outline" size={24} color="#000000" />
          <Text style={criarStyle.colorText}>Localização</Text>
        </TouchableOpacity>
      </View>

      <View style={criarStyle.containerBotaoPublicar}>
        <Botao botao="Publicar"></Botao>
      </View>

      {/* Menu de opções: Tirar foto ou Escolher da galeria */}
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
            <TouchableOpacity style={criarStyle.itemOpcao} onPress={abrirCamera}>
              <Ionicons name="camera-outline" size={22} color="#000" />
              <Text style={criarStyle.textoItemOpcao}>Tirar foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={criarStyle.itemOpcao} onPress={abrirGaleria}>
              <Ionicons name="images-outline" size={22} color="#000" />
              <Text style={criarStyle.textoItemOpcao}>Escolher da galeria</Text>
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

      {/* Tela da câmera */}
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