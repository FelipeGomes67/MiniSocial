import { Text, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { botaoStyles } from "./botaoStyle.js";

export default function Botao({ botao, onPress }) {
  let estilo, estiloText, title;

  if (botao === "Entrar") {
    estilo = "button";
    estiloText = "buttonText";
    title = botao;
  } else {
    estilo = "buttonCadastrar";
    estiloText = "buttonCadastrarText";
    title = botao;
  }

  return (
    <TouchableOpacity style={botaoStyles[estilo]} onPress={onPress}>
      <Text style={botaoStyles[estiloText]}>{title}</Text>
    </TouchableOpacity>
  );
}