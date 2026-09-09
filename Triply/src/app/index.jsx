import { indexStyle } from "../styles/indexStyle";
import { Text, View, Image } from "react-native";
import Botao from "../components/botao/botao";
import logo from "../../assets/Logo2.png";
import BoasVindas from "../../assets/Boas-Vindas.png";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Image 
        source={BoasVindas} 
        style={indexStyle.BackGround} 
        blurRadius={1} 
      />
      
      <View style={indexStyle.overlay} />

      <View style={indexStyle.container}>
        <Image source={logo} style={indexStyle.logo} />

        <Text style={indexStyle.tittle}>Bem-Vindo à Triply</Text>
        
        <Text style={indexStyle.text}>
          Conecte-se, compartilhe momentos e registre suas viagens.
          Encontre pessoas, salve inspirações e mostre onde você está para o mundo.
        </Text>

        <View style={indexStyle.buttonContainer}>
          <Botao botao="Entrar" onPress={() => {router.push('/login')}} />
          <Botao botao="Cadastrar-se" onPress={() => {router.push('/cadastro')}}/>
        </View>
      </View>
    </View>
  );
}