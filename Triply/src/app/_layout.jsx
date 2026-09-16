import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ProfileProvider } from "../context/ProfileContext";
import UsuarioProvider from "../context/UsuarioContext";
import PrivateRoute from "../routes/PrivateRoute";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <UsuarioProvider>
        <ProfileProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#FFFFFF",
              },
            }}
          >
            <Stack.Screen name="boas-vindas" />
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="esqueceuSenha" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="pesquisa" />
            <Stack.Screen name="preferencia" />
          </Stack>
        </ProfileProvider>
      </UsuarioProvider>
    </SafeAreaProvider>
  );
}