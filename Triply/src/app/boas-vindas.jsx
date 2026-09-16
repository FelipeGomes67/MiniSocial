import { indexStyle } from "../styles/indexStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, ActivityIndicator } from "react-native";
import Botao from "../components/botao/botao";
import logo from "../../assets/Logo2.png";
import BoasVindas from "../../assets/Boas-Vindas.png";
import { router, Redirect } from "expo-router";
import { useUsuario } from "../context/UsuarioContext";

export default function Index() {
  const { usuario, carregando } = useUsuario();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  if (usuario) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={BoasVindas}
        style={indexStyle.BackGround}
        blurRadius={1}
      />

      <View style={indexStyle.overlay} />

      <SafeAreaView style={indexStyle.container}>
        <Image source={logo} style={indexStyle.logo} />

        <Text style={[indexStyle.tittle, indexStyle.fonte]}>Bem-Vindo à Triply</Text>

        <Text style={[indexStyle.text, indexStyle.fonte]}>
          Conecte-se, compartilhe momentos e registre suas viagens.
          Encontre pessoas, salve inspirações e mostre onde você está para o mundo.
        </Text>

        <View style={indexStyle.buttonContainer}>
          <Botao botao="Entrar" onPress={() => router.push('/login')} />
          <Botao botao="Cadastrar-se" onPress={() => router.push('/cadastro')} />
        </View>
      </SafeAreaView>
    </View>
  );
}