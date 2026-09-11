import { Text, View, TouchableOpacity, Image, TextInput, Alert } from "react-native"; // 1. Importado Alert aqui
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyle } from "../styles/loginStyle.js";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/Logo.png";
import { useState } from "react";
import Botao from "../components/botao/botao.jsx";
import BotaoGoogle from "../components/botaoGoogle/botaogoogle.jsx";
import api from "../service/service.js";

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
    if (!email || !senha) {
      Alert.alert("Aviso", "Preencha todos os campos!");
      return;
    }

    const emailLimpo = email.trim().toLowerCase();

    try {
        const response = await api.get(`/usuarios?email=${emailLimpo}`);

      if (response.data.length > 0) {
        const usuarioEncontrado = response.data[0];

        if (usuarioEncontrado.senha === senha) {
          console.log("Login realizado com sucesso:", usuarioEncontrado);
          router.replace("/(tabs)");
        } else {
          Alert.alert("Erro", "Senha incorreta.");
        }
      } else {
        Alert.alert("Erro", "E-mail não encontrado.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={loginStyle.container}>

        <TouchableOpacity onPress={() => router.back()} style={loginStyle.buttonBack}>
          <Ionicons name="chevron-back-outline" size={28} color="#FF6600" />
        </TouchableOpacity>

        <Image source={logo} style={loginStyle.image} />
        <Text style={[loginStyle.title, loginStyle.fonte]}>Entrar</Text>

        <View style={loginStyle.formContainer}>
          <View style={loginStyle.inputContainer}>
            <Text style={[loginStyle.text, loginStyle.fonte]}>E-mail</Text>
            <TextInput
              style={loginStyle.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#0000005d"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={loginStyle.inputContainer}>
            <Text style={[loginStyle.text, loginStyle.fonte]}>Senha</Text>
            <TextInput
              style={loginStyle.input}
              placeholder="Digite sua senha"
              secureTextEntry={true}
              placeholderTextColor="#0000005d"
              autoComplete="current-password"
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity onPress={() => router.push("/esqueceuSenha")}>
            <Text style={[loginStyle.esqueceuSenha, loginStyle.fonte]}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          {/* 2. Chamando a função de login no onPress */}
          <Botao botao="Entrar" onPress={login} />

          <View style={loginStyle.dividerContainer}>
            <View style={loginStyle.line} />
            <Text style={[loginStyle.dividerText, loginStyle.fonte]}>OU</Text>
            <View style={loginStyle.line} />
          </View>

          <BotaoGoogle onPress={() => { }} />

          <Text style={[loginStyle.signupText, loginStyle.fonte]}>
            Não tem uma conta?{" "}
            <Text style={[loginStyle.signupLink, loginStyle.fonte]} onPress={() => router.push("/cadastro")}>
              Cadastre-se
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}