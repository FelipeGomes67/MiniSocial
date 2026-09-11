import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { criarStyle } from "../../styles/criarStyle";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Botao from "../../components/botao/botao";

export default function Criar() {
  const [texto, setTexto] = useState("");

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
          <Text style={criarStyle.caracteres}>0/280</Text>
        </View>
      </View>

      <View style={criarStyle.botoes}>
        <TouchableOpacity style={criarStyle.botaoImagem}>
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

    </SafeAreaView>
  );
}
