import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput, Alert} from "react-native";
import { cadastroStyle } from "../styles/cadastroStyle";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Button } from "@expo/ui";
import Botao from "../components/botao/botao";
import { botaoStyles } from "../components/botao/botaoStyle";
import { router } from "expo-router";
import logo from "../../assets/Logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../service/service.js";

export default function Cadastro() {
  const [novoEmail, setNovoEmail] = useState('');
  const [novoNomeCompleto, setNovoNomeCompleto] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const cadastrar = async () => {
    if (!novoNomeCompleto || !novoEmail || !novaSenha) {
      Alert.alert("Aviso", "Preencha todos os campos!");
      return;
    }

    const emailLimpo = novoEmail.trim().toLowerCase();

    try {
      const usuariosExistentes = await api.get(`/usuarios?email=${emailLimpo}`);

      if (usuariosExistentes.data.length > 0) {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
        return;
      }

      const novoUsuario = {
        nome: novoNomeCompleto,
        email: emailLimpo,
        senha: novaSenha
      };

      await api.post("/usuarios", novoUsuario);

      Alert.alert("Sucesso", "Conta criada com sucesso!");
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor. Tente novamente."
      );
    }
  };




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={cadastroStyle.container}>

        <TouchableOpacity onPress={() => router.back()} style={cadastroStyle.buttonBack}>
          <Ionicons name="chevron-back-outline" size={28} color="#FF6600" />
        </TouchableOpacity>

        <Image source={logo} style={cadastroStyle.image} />
        <Text style={cadastroStyle.title}>Criar Conta</Text>

        <View style={cadastroStyle.formContainer}>
          <View style={cadastroStyle.inputContainer}>

            <Text style={cadastroStyle.text}>Nome Completo</Text>
            <TextInput
              style={cadastroStyle.input}
              placeholder="Digite seu Nome Completo"
              placeholderTextColor="#0000005d"
              autoCapitalize="none"
              keyboardType="default"
              value={novoNomeCompleto}
              onChangeText={setNovoNomeCompleto}
            />
          </View>
          <View style={cadastroStyle.inputContainer}>

            <Text style={cadastroStyle.text}>E-mail</Text>
            <TextInput
              style={cadastroStyle.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#0000005d"
              autoCapitalize="none"
              keyboardType="email-address"
              value={novoEmail}
              onChangeText={setNovoEmail}
            />
          </View>
          <View style={cadastroStyle.inputContainer}>

            <Text style={cadastroStyle.text}>Senha</Text>
            <TextInput
              style={cadastroStyle.input}
              placeholder="Digite sua senha"
              secureTextEntry={true}
              placeholderTextColor="#0000005d"
              autoComplete="current-password"
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
          </View>



        </View>

        <TouchableOpacity style={cadastroStyle.button} onPress={cadastrar}>
          <Text style={cadastroStyle.buttonText}>Criar Conta</Text>
        </TouchableOpacity>

        <View style={cadastroStyle.footer}>
        <Text style={cadastroStyle.signupText}>
          Já tem uma conta?{""}
          <Text style={cadastroStyle.signupLink} onPress={() => router.push("/login")}>
            Entrar
          </Text>
        </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}