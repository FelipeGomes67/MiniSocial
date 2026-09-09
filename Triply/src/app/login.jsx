import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Importação do SafeAreaView
import { loginStyle } from "../styles/loginStyle.js";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/Logo.png";
import { useState } from "react";
import Botao from "../components/botao/botao.jsx";
import BotaoGoogle from "../components/botaoGoogle/botaogoogle.jsx";

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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



          <Botao botao="Entrar" onPress={() => router.push('/login')} />

          <Text style={[loginStyle.esqueceuSenha, loginStyle.fonte]} >Esqueceu a senha?</Text>
          </TouchableOpacity>

          <Botao botao="Entrar" onPress={() => router.replace('/home')} />


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