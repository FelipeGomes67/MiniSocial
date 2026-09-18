import React, { useState, useCallback } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";

// Ícones
import BackIcon from "../../../assets/Icons/BackIcon.png";
import GroupIcon from "../../../assets/Icons/GroupIcon.png";
import FavIcon from "../../../assets/Icons/FavIcon.png";
import LogoMiniSocial from "../../../assets/Icons/LogoMiniSocial.png";
import PenIcon from "../../../assets/Icons/PenIcon.png";
import SenttingsIcon from "../../../assets/Icons/SenttingsIcon.png";

// Contexto, API e Estilos
import { useUsuario } from "../../context/UsuarioContext";
import api from "../../service/service";
import { perfilStyle } from "../../styles/perfilStyle";

export default function ProfileScreen() {
  const { usuario, setUsuario, carregando } = useUsuario();
  const [posts, setPosts] = useState([]);
  const [postsSalvos, setPostsSalvos] = useState([]);
  const [carregandoPosts, setCarregandoPosts] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("posts");

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profilePhotoOpen, setProfilePhotoOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { width } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      async function buscarDadosPerfil() {
        if (!usuario || !usuario.id) {
          setCarregandoPosts(false);
          return;
        }

        try {
          setCarregandoPosts(true);
          const idUsuarioStr = String(usuario.id);

          const [resPosts, resSalvos] = await Promise.all([
            api.get("/publicacoes"),
            api.get("/salvos").catch(() => ({ data: [] })),
          ]);

          const meusPosts = (resPosts.data || []).filter(
            (p) => String(p.usuarioId) === idUsuarioStr
          );

          const meusSalvos = (resSalvos.data || []).filter(
            (s) => String(s.usuarioId) === idUsuarioStr
          );

          setPosts(meusPosts);
          setPostsSalvos(meusSalvos);
        } catch (error) {
          console.error("Erro ao buscar publicações do usuário:", error);
        } finally {
          setCarregandoPosts(false);
        }
      }

      buscarDadosPerfil();
    }, [usuario])
  );

  const logout = async () => {
    try {
      await setUsuario(null);
      setSettingsOpen(false);
      router.replace("/boas-vindas");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível encerrar a sessão.");
    }
  };

  if (carregando || carregandoPosts) {
    return (
      <View style={perfilStyle.loadingWrap}>
        <ActivityIndicator size="large" color="#FD7509" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={perfilStyle.loadingWrap}>
        <Text style={perfilStyle.errorText}>Nenhum usuário logado.</Text>
      </View>
    );
  }

  if (isEditing) {
    return (
      <EditProfile
        usuario={usuario}
        setUsuario={setUsuario}
        postsCount={posts.length}
        onBack={() => setIsEditing(false)}
      />
    );
  }

  const horizontalPadding = 24;
  const gap = 8;
  const columns = 3;
  const itemWidth = Math.floor((width - horizontalPadding - gap * (columns - 1)) / columns);

  const totalPublicacoes = posts.length > 0 ? posts.length : (usuario.publicacoes ?? 0);
  const totalSeguidores = usuario.seguidores ?? 0;
  const totalSeguindo = usuario.seguindo ?? 0;

  const listaExibida = abaAtiva === "posts" ? posts : postsSalvos;

  return (
    <SafeAreaView style={perfilStyle.screenContainer} edges={["left", "right"]}>
      <ScrollView
        style={perfilStyle.screen}
        contentContainerStyle={perfilStyle.screenContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* TOP BAR */}
        <View style={perfilStyle.topbar}>
          <View style={perfilStyle.logoWrap}>
            <Image source={LogoMiniSocial} style={perfilStyle.logoImage} resizeMode="contain" />
            <Text style={perfilStyle.triplyText}>Triply</Text>
          </View>
          <Text style={perfilStyle.centerTitle}>Perfil</Text>
          <TouchableOpacity style={perfilStyle.settingsButton} onPress={() => setSettingsOpen(true)}>
            <Image source={SenttingsIcon} style={perfilStyle.settingsIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* AVATAR */}
        <View style={perfilStyle.avatarWrap}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setProfilePhotoOpen(true)} style={perfilStyle.avatarTouchable}>
            {usuario.foto ? (
              <Image source={{ uri: usuario.foto }} style={perfilStyle.avatar} resizeMode="cover" />
            ) : (
              <View style={[perfilStyle.avatar, { backgroundColor: "#ccc", justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
                  {usuario.nome ? usuario.nome.charAt(0).toUpperCase() : "U"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={perfilStyle.penButton} onPress={() => setIsEditing(true)}>
            <Image source={PenIcon} style={perfilStyle.penIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <Text style={perfilStyle.name}>{usuario.nome}</Text>
        <Text style={perfilStyle.username}>@{usuario.user}</Text>

        {/* STATS */}
        <View style={perfilStyle.stats}>
          {[
            [totalPublicacoes, "publicações"],
            [totalSeguidores, "seguidores"],
            [totalSeguindo, "seguindo"],
          ].map(([value, label], index) => (
            <React.Fragment key={label}>
              <View style={perfilStyle.stat}>
                <Text style={perfilStyle.statValue}>{value}</Text>
                <Text style={perfilStyle.statLabel}>{label}</Text>
              </View>
              {index < 2 && <View style={perfilStyle.statDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* BIO */}
        <Text style={perfilStyle.bio}>{usuario.descricao || "Sem descrição cadastrada."}</Text>

        {/* ABAS */}
        <View style={perfilStyle.selectorRow}>
          <TouchableOpacity
            style={perfilStyle.selectorCell}
            onPress={() => setAbaAtiva("posts")}
            activeOpacity={0.7}
          >
            <Image
              source={GroupIcon}
              style={[
                perfilStyle.selectorIcon,
                abaAtiva === "posts" && perfilStyle.selectorIconActive,
              ]}
              resizeMode="contain"
            />
            {abaAtiva === "posts" && <View style={perfilStyle.selectorIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={perfilStyle.selectorCell}
            onPress={() => setAbaAtiva("salvos")}
            activeOpacity={0.7}
          >
            <Image
              source={FavIcon}
              style={[
                perfilStyle.selectorIcon,
                abaAtiva === "salvos" && perfilStyle.selectorIconActive,
              ]}
              resizeMode="contain"
            />
            {abaAtiva === "salvos" && <View style={perfilStyle.selectorIndicator} />}
          </TouchableOpacity>
        </View>

        {/* GRADE DE POSTS */}
        <View style={perfilStyle.grid}>
          {listaExibida.length === 0 ? (
            <View style={perfilStyle.emptyState}>
              <Text style={perfilStyle.emptyText}>
                {abaAtiva === "posts"
                  ? "Nenhuma publicação por aqui ainda."
                  : "Nenhuma publicação salva ainda."}
              </Text>
            </View>
          ) : (
            listaExibida.map((item) => {
              const imagemUrl = item.imagem || item.publicacao?.imagem;
              const targetId = item.publicacaoId || item.publicacao?.id || item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[perfilStyle.postCard, { width: itemWidth, marginBottom: gap }]}
                  onPress={() => router.push(`/(tabs)/home/${targetId}`)}
                >
                  {imagemUrl ? (
                    <Image
                      source={{ uri: imagemUrl }}
                      style={[perfilStyle.post, { height: itemWidth }]}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[
                        perfilStyle.post,
                        {
                          height: itemWidth,
                          backgroundColor: "#EAEAEA",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 4,
                        },
                      ]}
                    >
                      <Text numberOfLines={3} style={{ fontSize: 10, color: "#666", textAlign: "center" }}>
                        {item.texto || item.publicacao?.texto || "Post sem imagem"}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* MODAL FOTO DE PERFIL */}
      <ProfilePhotoModal uri={usuario.foto} visible={profilePhotoOpen} onClose={() => setProfilePhotoOpen(false)} />

      {/* CONFIGURAÇÕES */}
      {settingsOpen && (
        <Modal transparent visible animationType="slide">
          <View style={perfilStyle.overlay}>
            <View style={perfilStyle.panel}>
              <TouchableOpacity style={perfilStyle.closeBtn} onPress={() => setSettingsOpen(false)}>
                <Text style={perfilStyle.closeBtnText}>X</Text>
              </TouchableOpacity>
              <Text style={perfilStyle.sectionHeading}>Configurações</Text>

              <TouchableOpacity
                style={perfilStyle.actionBtn || { paddingVertical: 12 }}
                onPress={() => {
                  setSettingsOpen(false);
                  router.push("/preferencia");
                }}
              >
                <Text style={perfilStyle.actionText || { fontSize: 16, color: "#101010", fontWeight: "600" }}>
                  Editar Preferências
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={perfilStyle.actionDanger} onPress={logout}>
                <Text style={perfilStyle.dangerText}>Sair da Conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

function EditProfile({ usuario, setUsuario, postsCount, onBack }) {
  const [nome, setNome] = useState(usuario.nome || "");
  const [user, setUser] = useState(usuario.user || "");
  const [descricao, setDescricao] = useState(usuario.descricao || "");
  const [foto, setFoto] = useState(usuario.foto || "");
  const [saving, setSaving] = useState(false);

  const pickAvatar = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permissão necessária", "Precisamos de permissão para acessar suas fotos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const asset = result.assets[0];

        const manipResult = await ImageManipulator.manipulateAsync(
          asset.uri,
          [{ resize: { width: 300, height: 300 } }],
          { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );

        setFoto(`data:image/jpeg;base64,${manipResult.base64}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const save = async () => {
    try {
      setSaving(true);
      const updatedUser = {
        ...usuario,
        nome,
        user,
        descricao,
        foto,
        seguindo: usuario.seguindo ?? 0,
        seguidores: usuario.seguidores ?? 0,
        publicacoes: usuario.publicacoes ?? postsCount,
      };

      const res = await api.put(`/usuarios/${usuario.id}`, updatedUser);
      setUsuario(res.data);
      onBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={perfilStyle.screenContainer} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={perfilStyle.editKeyboard} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView style={perfilStyle.screen} contentContainerStyle={perfilStyle.editScreen}>
          <View style={perfilStyle.editHeader}>
            <TouchableOpacity onPress={onBack}>
              <Image source={BackIcon} style={perfilStyle.backIcon} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={perfilStyle.editTitle}>Editar Perfil</Text>
            <View style={{ width: 28 }} />
          </View>

          <View style={perfilStyle.avatarWrapEdit}>
            {foto ? (
              <Image source={{ uri: foto }} style={perfilStyle.avatarLarge} resizeMode="cover" />
            ) : (
              <View style={[perfilStyle.avatarLarge, { backgroundColor: "#ccc", justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ fontSize: 32, color: "#fff", fontWeight: "bold" }}>
                  {nome ? nome.charAt(0).toUpperCase() : "U"}
                </Text>
              </View>
            )}
            <TouchableOpacity style={perfilStyle.dotButton} onPress={pickAvatar}>
              <Image source={PenIcon} style={perfilStyle.dotIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <Text style={perfilStyle.changePhotoText}>Toque no lápis para alterar sua foto</Text>

          <Text style={perfilStyle.fieldLabel}>Nome</Text>
          <TextInput style={perfilStyle.input} value={nome} onChangeText={setNome} placeholder="Digite seu nome" />

          <Text style={perfilStyle.fieldLabel}>Usuário</Text>
          <TextInput style={perfilStyle.input} value={user} onChangeText={setUser} autoCapitalize="none" placeholder="Digite seu usuário" />

          <Text style={perfilStyle.fieldLabel}>Bio</Text>
          <TextInput
            style={perfilStyle.bioInput}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            textAlignVertical="top"
            placeholder="Conte um pouco sobre você..."
          />

          <TouchableOpacity style={[perfilStyle.saveButton, saving && perfilStyle.saveButtonDisabled]} onPress={save} disabled={saving}>
            <Text style={perfilStyle.saveText}>{saving ? "Salvando..." : "Salvar Alterações"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ProfilePhotoModal({ uri, visible, onClose }) {
  if (!visible) return null;
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={perfilStyle.photoModal}>
        <TouchableOpacity style={perfilStyle.photoCloseButton} onPress={onClose}>
          <Text style={perfilStyle.photoCloseText}>×</Text>
        </TouchableOpacity>
        {uri ? (
          <Image source={{ uri }} style={{ width: 300, height: 300, borderRadius: 12 }} resizeMode="contain" />
        ) : (
          <View style={{ width: 300, height: 300, borderRadius: 12, backgroundColor: "#333", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#fff" }}>Sem foto de perfil</Text>
          </View>
        )}
      </View>
    </Modal>
  );
}