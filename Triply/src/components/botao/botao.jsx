import { Text, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { botaoStyle } from "./botaoStyle.js";

export default function Botao({ botao, onPress }) {
  let estilo, estiloText, title;

  if (botao === "Cadastrar-se") {
    estilo = "buttonCadastrar";
    estiloText = "buttonCadastrarText";
    title = botao;
  } else {
    estilo = "button";
    estiloText = "buttonText";
    title = botao;
  }

  return (
    <TouchableOpacity style={botaoStyle[estilo]} onPress={onPress}>
      <Text style={botaoStyle[estiloText]}>{title}</Text>
    </TouchableOpacity>
  );
}