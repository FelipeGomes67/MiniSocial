import { Text, TouchableOpacity, Image } from "react-native";
import { botaoGoogleStyle } from "./botaogoogleStyle.js";
import logoGoogle from "../../../assets/google.png";

export default function BotaoGoogle({ onPress }) {
  return (
    <TouchableOpacity
      style={botaoGoogleStyle.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={logoGoogle} style={botaoGoogleStyle.icon} />
      <Text style={botaoGoogleStyle.buttonText}>Entrar com Google</Text>
    </TouchableOpacity>
  );
}