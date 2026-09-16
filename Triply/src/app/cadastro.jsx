import { Text, View, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from "react-native";
import { cadastroStyle } from "../styles/cadastroStyle";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router, Redirect } from "expo-router";
import logo from "../../assets/Logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUsuario } from "../context/UsuarioContext";
import api from "../service/service";

export default function Cadastro() {
  const [novoEmail, setNovoEmail] = useState('');
  const [novoNomeCompleto, setNovoNomeCompleto] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [carregandoCadastro, setCarregandoCadastro] = useState(false);

  const { usuario, setUsuario, carregando } = useUsuario();

  if (carregando) return null;

  if (usuario) {
    return <Redirect href="/(tabs)" />;
  }

  const handleCadastro = async () => {
    if (!novoNomeCompleto.trim() || !novoEmail.trim() || !novaSenha.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setCarregandoCadastro(true);

      const checarEmail = await api.get(`/usuarios?email=${novoEmail.toLowerCase().trim()}`);
      if (checarEmail.data.length > 0) {
        Alert.alert("Erro", "Este e-mail já está em uso.");
        setCarregandoCadastro(false);
        return;
      }

      const usernameGerado = novoEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

      const novoUsuario = {
        nome: novoNomeCompleto.trim(),
        user: usernameGerado,
        email: novoEmail.toLowerCase().trim(),
        senha: novaSenha,
        seguindo: "0",
        seguidores: "0",
        descricacao: "Novo membro da comunidade!",
        foto: "https://i.pravatar.cc/150?img=60"
      };

      const resposta = await api.post('/usuarios', novoUsuario);

      if (resposta.status === 201 || resposta.status === 200) {
        await setUsuario(resposta.data);

        router.replace('/preferencia');
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    } finally {
      setCarregandoCadastro(false);
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
              autoCapitalize="words"
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
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={cadastroStyle.button} 
          onPress={handleCadastro}
          disabled={carregandoCadastro}
        >
          {carregandoCadastro ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={cadastroStyle.buttonText}>Criar Conta</Text>
          )}
        </TouchableOpacity>

        <View style={cadastroStyle.footer}>
          <Text style={cadastroStyle.signupText}>
            Já tem uma conta?{" "}
            <Text style={cadastroStyle.signupLink} onPress={() => router.push("/login")}>
              Entrar
            </Text>
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}