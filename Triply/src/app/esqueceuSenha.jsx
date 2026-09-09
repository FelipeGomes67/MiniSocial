import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Importação do SafeAreaView
import { esqueceuSenhaStyle } from "../styles/esqueceuSenhaStyle.js";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/Logo.png";
import { useState } from "react";
import Botao from "../components/botao/botao.jsx";
import cadeado from "../../assets/cadeado.png";

export default function EsqueceuSenha() {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={esqueceuSenhaStyle.container}>

        <TouchableOpacity onPress={() => router.back()} style={esqueceuSenhaStyle.buttonBack}>
          <Ionicons name="chevron-back-outline" size={28} color="#FF6600" />
        </TouchableOpacity>

        <Image source={logo} style={esqueceuSenhaStyle.image} />
        <Text style={esqueceuSenhaStyle.title}>Esqueceu a senha?</Text>
        <Image source={cadeado} style={esqueceuSenhaStyle.imageCadeado} />

        <View style={esqueceuSenhaStyle.formContainer}>
          <Text style={esqueceuSenhaStyle.text}>Encontre sua Conta</Text>
          <Text style={esqueceuSenhaStyle.textNorm}>Insira seu email cadastrado para receber o código de recuperação</Text>

          <View style={esqueceuSenhaStyle.inputContainer}>
            <Text style={esqueceuSenhaStyle.text}>E-mail</Text>
            <TextInput
              style={esqueceuSenhaStyle.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#0000005d"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

        

          <Botao botao="Enviar Código" onPress={() => router.replace('/home')} />

        </View>
      </View>
    </SafeAreaView>
  );
}