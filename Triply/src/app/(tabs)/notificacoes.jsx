import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { cadastroStyle } from "../../styles/cadastroStyle";
import { notificacoesStyle } from "../../styles/notificacoesStyle";
// import logo from "../../../assets/Logo.png";
import comentario from "../../../assets/Comentario.png"
import curtida from "../../../assets/Curtida.png"
import seguidor from "../../../assets/Seguindo.png"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notificacoes() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF"}}>
      <View style={{ flex: 1 }}>
        <View style={notificacoesStyle.container}>

          <Text style={notificacoesStyle.title}>
            Notificações
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={notificacoesStyle.scrollContent}
          >

            <View style={notificacoesStyle.card}>


              <Image
                source={comentario}
                style={notificacoesStyle.logo}
              />

              <View style={notificacoesStyle.caixaTextos}>

                <View style={notificacoesStyle.linhaNome}>
                  <Text style={notificacoesStyle.nome}>
                    Fulano
                  </Text>

                  <Text style={notificacoesStyle.horario}>
                    Ontem às 22:21
                  </Text>
                </View>

                <Text style={notificacoesStyle.mensagem}>
                  Comentou em sua Publicação.
                </Text>
              </View>



            </View>

            <View style={notificacoesStyle.card}>


              <Image
                source={seguidor}
                style={notificacoesStyle.logo}
              />

              <View style={notificacoesStyle.caixaTextos}>

                <View style={notificacoesStyle.linhaNome}>
                  <Text style={notificacoesStyle.nome}>
                    Fulano
                  </Text>

                  <Text style={notificacoesStyle.horario}>
                    Ontem às 22:21
                  </Text>
                </View>

                <Text style={notificacoesStyle.mensagem}>
                  Começou a Seguir você!
                </Text>
              </View>



            </View>
            <View style={notificacoesStyle.card}>


              <Image
                source={curtida}
                style={notificacoesStyle.logo}
              />

              <View style={notificacoesStyle.caixaTextos}>

                <View style={notificacoesStyle.linhaNome}>
                  <Text style={notificacoesStyle.nome}>
                    Fulano
                  </Text>

                  <Text style={notificacoesStyle.horario}>
                    Ontem às 22:21
                  </Text>
                </View>

                <Text style={notificacoesStyle.mensagem}>
                  Curtiu uma Publicação sua!
                </Text>
              </View>



            </View>

            
            <View style={notificacoesStyle.card}>


              <Image
                source={seguidor}
                style={notificacoesStyle.logo}
              />

              <View style={notificacoesStyle.caixaTextos}>

                <View style={notificacoesStyle.linhaNome}>
                  <Text style={notificacoesStyle.nome}>
                    Fulano
                  </Text>

                  <Text style={notificacoesStyle.horario}>
                    Ontem às 22:21
                  </Text>
                </View>

                <Text style={notificacoesStyle.mensagem}>
                  Começou a Seguir você!
                </Text>
              </View>



            </View>

               <View style={notificacoesStyle.card}>


              <Image
                source={comentario}
                style={notificacoesStyle.logo}
              />

              <View style={notificacoesStyle.caixaTextos}>

                <View style={notificacoesStyle.linhaNome}>
                  <Text style={notificacoesStyle.nome}>
                    Fulano
                  </Text>

                  <Text style={notificacoesStyle.horario}>
                    Ontem às 22:21
                  </Text>
                </View>

                <Text style={notificacoesStyle.mensagem}>
                  Comentou em sua Publicação.
                </Text>
              </View>



            </View>

            

            






          </ScrollView>


        </View>
      </View>





    </SafeAreaView>

  );
}
