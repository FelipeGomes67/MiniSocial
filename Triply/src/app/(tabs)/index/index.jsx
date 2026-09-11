import { Text, View, TouchableOpacity, homeStyleheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { homeStyle } from "../../../styles/homeStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={homeStyle.container}>
      <View style={homeStyle.header}>
        <Image source={require("../../../../assets/Logo.png")} style={homeStyle.image} />
        <Text style={homeStyle.title}>Triply</Text>
        <TouchableOpacity style={homeStyle.botaoPesquisar} onPress={() => { router.replace('/pesquisa') }}>
          <Ionicons name="search-sharp" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity style={homeStyle.cardPublicacao} onPress={() => { router.push({ pathname: "/[id]" }) }}>
          <View style={homeStyle.linhaPerfil}>
            <View style={homeStyle.cardPerfil}>
              <Text style={[homeStyle.cardPerfilText, homeStyle.fonte]}></Text>
            </View>

            <View style={homeStyle.infoPerfil}>
              <Text style={[homeStyle.nomePerfil, homeStyle.fonte]}>Pessoa1</Text>
              <Text style={[homeStyle.nomePerfilData, homeStyle.fonte]}>01/01/2024</Text>
            </View>
          </View>

          <Text style={[homeStyle.descricaoPublicacao, homeStyle.fonte]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <Image style={homeStyle.imagePost} source={require("../../../../assets/Boas-Vindas.png")} />

          <View style={homeStyle.botaoCurtir}>
            <TouchableOpacity style={homeStyle.botaoCurtir}>
              <Ionicons name="heart-outline" size={24} color="#000000" />
              <Text style={[homeStyle.fonte]}>100</Text>
            </TouchableOpacity>

            <TouchableOpacity style={homeStyle.botaoComentar}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#000000" />
              <Text style={[homeStyle.fonte]}>33</Text>
            </TouchableOpacity>

            <TouchableOpacity style={homeStyle.botaoSalvar}>
              <Ionicons name="bookmark-outline" size={24} color="#000000" />
              <Text style={[homeStyle.fonte]}>33</Text>

            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={homeStyle.cardPublicacao}>
          <View style={homeStyle.linhaPerfil}>
            <View style={homeStyle.cardPerfil}>
              <Text style={[homeStyle.cardPerfilText, homeStyle.fonte]}></Text>
            </View>

            <View style={homeStyle.infoPerfil}>
              <Text style={[homeStyle.nomePerfil, homeStyle.fonte]}>Pessoa1</Text>
              <Text style={[homeStyle.nomePerfilData, homeStyle.fonte]}>01/01/2024</Text>
            </View>
          </View>

          <Text style={[homeStyle.descricaoPublicacao, homeStyle.fonte]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          <View style={homeStyle.botaoCurtir}>
            <TouchableOpacity style={homeStyle.botaoCurtir}>
              <Ionicons name="heart-outline" size={24} color="#000000" />
              <Text style={[homeStyle.fonte]}>100</Text>
            </TouchableOpacity>

            <TouchableOpacity style={homeStyle.botaoComentar}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#000000" />
              <Text style={[homeStyle.fonte]}>33</Text>
            </TouchableOpacity>

            <TouchableOpacity style={homeStyle.botaoSalvar}>
              <Ionicons name="bookmark-outline" size={24} color="#000000" />
              <Text style={[homeStyle.fonte]}>33</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}