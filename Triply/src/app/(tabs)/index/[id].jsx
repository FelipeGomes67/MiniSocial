
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { publiStyle } from "../../../styles/publiStyle"
import { router } from "expo-router";



export default function Publicacao() {








    return (
        <SafeAreaView style={publiStyle.container}>
            <ScrollView contentContainerStyle={publiStyle.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={publiStyle.header}>

    <TouchableOpacity onPress={() => router.back("/index")} style={publiStyle.buttonBack}>
          <Ionicons name="chevron-back-outline" size={28} color="#FF6600" />
        </TouchableOpacity>



                    <Text style={[publiStyle.title, publiStyle.fonte]}>Publicação</Text>
                </View>

                <View style={publiStyle.cardPublicacao}>
                    <View style={publiStyle.linhaPerfil}>
                        <View style={publiStyle.cardPerfil}>
                            {/* <Text style={[publiStyle.cardPerfilText, publiStyle.fonte]}>P</Text> */}
                        </View>

                        <View style={publiStyle.infoPerfil}>
                            <Text style={[publiStyle.nomePerfil, publiStyle.fonte]}>Pessoa1</Text>
                            <Text style={[publiStyle.nomePerfilData, publiStyle.fonte]}>01/01/2024</Text>
                        </View>
                    </View>

                    <Text style={[publiStyle.descricaoPublicacao, publiStyle.fonte]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                    <Image style={publiStyle.imagePost} source={require("../../../../assets/Boas-Vindas.png")} />

                    <View style={publiStyle.botaoCurtir}>
                        <TouchableOpacity style={publiStyle.botaoCurtir}>
                            <Ionicons name="heart" size={24} color="#000000" />
                            <Text style={[publiStyle.fonte]}>100</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={publiStyle.botaoComentar}>
                            <Ionicons name="chatbubble" size={24} color="#000000" />
                            <Text style={[publiStyle.fonte]}>33</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={publiStyle.botaoSalvar}>
                            <Ionicons name="bookmark-outline" size={24} color="#000000" />
                        </TouchableOpacity>
                    </View>
                </View>


                <Text style={[publiStyle.subtitle, publiStyle.fonte]}>Comentários</Text>

                <View style={publiStyle.cardComentario}>
                    <View style={publiStyle.linhaPerfil}>
                        <View style={publiStyle.cardPerfil}>
                            {/* <Text style={[publiStyle.cardPerfilText, publiStyle.fonte]}>P</Text> */}
                        </View>

                        <View style={publiStyle.infoPerfil}>
                            <Text style={[publiStyle.nomePerfil, publiStyle.fonte]}>Pessoa1</Text>
                            <Text style={[publiStyle.nomePerfilData, publiStyle.fonte]}>01/01/2024</Text>
                        </View>
                    </View>

                    <Text style={[publiStyle.descricaoPublicacao, publiStyle.fonte]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>

                </View>



                <View style={publiStyle.cardComentario2}>
                    <Text style={[publiStyle.descricaoPublicacao, publiStyle.fonte]}>
                        Escreva um comentário...
                    </Text>

                    <TouchableOpacity style={publiStyle.botaoPost}>
                        <Ionicons name="paper-plane" size={24} color="#FD7509" />
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>

    );
};