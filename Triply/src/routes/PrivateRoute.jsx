import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useUsuario } from "../context/UsuarioContext";

export default function PrivateRoute({ children }) {
  const { usuario, carregando } = useUsuario();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  return usuario ? children : <Redirect href="/login" />;
}