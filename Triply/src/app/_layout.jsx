import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ProfileProvider } from "../context/ProfileContext";

export default function Layout() {
    return (
        <SafeAreaProvider>
            <ProfileProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: {
                            backgroundColor: "#FFFFFF",
                        },
                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="login" />
                    <Stack.Screen name="cadastro" />
                    <Stack.Screen name="esqueceuSenha" />
                    <Stack.Screen name="(tabs)" />
                </Stack>
            </ProfileProvider>
        </SafeAreaProvider>
    );
}