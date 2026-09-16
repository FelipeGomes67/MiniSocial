import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UsuarioContext = createContext({});

export default function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarUsuarioStorage() {
      try {
        const usuarioStorage = await AsyncStorage.getItem("@usuario_triply");
        if (usuarioStorage) {
          setUsuario(JSON.parse(usuarioStorage));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do storage:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuarioStorage();
  }, []);

  const salvarUsuario = async (dadosUsuario) => {
    try {
      setUsuario(dadosUsuario);
      if (dadosUsuario) {
        await AsyncStorage.setItem("@usuario_triply", JSON.stringify(dadosUsuario));
      } else {
        await AsyncStorage.removeItem("@usuario_triply");
      }
    } catch (error) {
      console.error("Erro ao salvar usuário no storage:", error);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario: salvarUsuario,
        carregando,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UsuarioContext);
}