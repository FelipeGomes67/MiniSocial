import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { loginStyle } from "../styles/loginStyle.js";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/Logo.png";
import { useState } from "react";
import Botao from "../components/botao/botao.jsx";

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <View style={loginStyle.container}>

        <TouchableOpacity onPress={() => router.back()} style={loginStyle.buttonBack}>
          <Ionicons name="chevron-back-outline" size={28} color="#FF6600" />
        </TouchableOpacity>

        <Image source={logo} style={loginStyle.image} />
        <Text style={loginStyle.title}>Entrar</Text>

        <View style={loginStyle.formContainer}>
          <View style={loginStyle.inputContainer}>

            <Text style={loginStyle.text}>E-mail</Text>
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

            <Text style={loginStyle.text}>Senha</Text>
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

          <Text style={loginStyle.esqueceuSenha}>Esqueceu a senha?</Text>


          <Botao botao="Entrar" onPress={() => router.push('/login')} />

          <View style={loginStyle.dividerContainer}>
            <View style={loginStyle.line} />
            <Text style={loginStyle.dividerText}>OU</Text>
            <View style={loginStyle.line} />
          </View>

          <Botao botao="Entrar com Google" onPress={() => { }} />

          <Text style={loginStyle.signupText}>
            Não tem uma conta?{""}
            <Text style={loginStyle.signupLink} onPress={() => router.push("/cadastro")}>
              Cadastre-se
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}