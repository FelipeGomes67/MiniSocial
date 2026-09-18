import { StyleSheet } from "react-native";

const baseFont = "RedHatText_400Regular";

export const perfilStyle = StyleSheet.create({
  // Telas e Containers
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 35,
  },

  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  screenContent: {
    paddingBottom: 110,
  },

  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  errorText: {
    fontSize: 14,
    color: "#D63C3C",
    textAlign: "center",
    fontFamily: baseFont,
  },

  // Topbar
  topbar: {
    minHeight: 52,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 14,
  },

  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoImage: {
    width: 30,
    height: 30,
  },

  triplyText: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FD7509",

    marginLeft: 6,
    fontFamily: baseFont,
  },

  centerTitle: {
    position: "absolute",
    left: 0,
    right: 0,

    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: baseFont,
  },

  settingsButton: {
    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",
  },

  settingsIcon: {
    width: 22,
    height: 22,
  },

  // Avatar e Informações do Perfil
  avatarWrap: {
    width: 156,
    height: 156,

    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 6,
    position: "relative",
  },

  avatarTouchable: {
    width: 136,
    height: 136,
    borderRadius: 68,
    overflow: "hidden",
  },

  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: "#0F0F0F",
  },

  penButton: {
    position: "absolute",
    right: 12,
    bottom: 12,

    width: 40,
    height: 40,
    borderRadius: 20,

    borderWidth: 3,
    borderColor: "#FFFFFF",
    backgroundColor: "#FD7509",

    alignItems: "center",
    justifyContent: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  penIcon: {
    width: 18,
    height: 18,
    tintColor: "#FFFFFF",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
    fontFamily: baseFont,
  },

  username: {
    fontSize: 15,
    color: "#7A7A7A",
    textAlign: "center",
    fontFamily: baseFont,
  },

  // Estatísticas e Bio
  stats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    marginTop: 16,
  },

  stat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  statDivider: {
    width: 1,
    height: 38,
    backgroundColor: "#DEDEDE",
  },

  statValue: {
    fontSize: 21,
    fontWeight: "700",
    fontFamily: baseFont,
  },

  statLabel: {
    fontSize: 12,
    color: "#8A8A8A",
    marginTop: 3,
    fontFamily: baseFont,
  },

  bio: {
    fontSize: 13,
    color: "#202020",
    textAlign: "center",

    marginTop: 18,
    paddingHorizontal: 26,
    fontFamily: baseFont,
  },

  // Seletor de Abas e Grade de Posts
  selectorRow: {
    height: 52,

    flexDirection: "row",
    alignItems: "flex-end",

    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E3",

    marginTop: 22,
  },

  selectorCell: {
    flex: 1,
    height: 52,

    alignItems: "center",
    justifyContent: "center",
  },

  selectorIcon: {
    width: 25,
    height: 25,
  },

  selectorIconActive: {
    tintColor: "#FD7509",
  },

  selectorIndicator: {
    position: "absolute",
    bottom: -1,

    width: "100%",
    height: 3,

    backgroundColor: "#FD7509",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",

    paddingHorizontal: 12,
    paddingTop: 18,

    columnGap: 8,
    rowGap: 10,
  },

  postCard: {
    position: "relative",
  },

  post: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },

  emptyState: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 28,
  },

  emptyText: {
    color: "#707070",
    fontFamily: baseFont,
  },

  // Modal Foto
  photoModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.96)",

    alignItems: "center",
    justifyContent: "center",
  },

  photoCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
  },

  photoCloseText: {
    fontSize: 40,
    color: "#FFF",
    fontFamily: baseFont,
  },

  // Edição de Perfil
  editKeyboard: {
    flex: 1,
  },

  editScreen: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 60,
  },

  editHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backIcon: {
    width: 18,
    height: 18,
    tintColor: "#FD7509",
  },

  editTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FD7509",
    fontFamily: baseFont,
  },

  avatarWrapEdit: {
    width: 136,
    height: 136,

    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 16,
    position: "relative",
  },

  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#0F0F0F",
  },

  dotButton: {
    position: "absolute",
    right: 4,
    bottom: 4,

    width: 36,
    height: 36,
    borderRadius: 18,

    borderWidth: 3,
    borderColor: "#FFFFFF",
    backgroundColor: "#FD7509",

    alignItems: "center",
    justifyContent: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  dotIcon: {
    width: 16,
    height: 16,
    tintColor: "#FFFFFF",
  },

  changePhotoText: {
    fontSize: 12,
    color: "#7A7A7A",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: baseFont,
  },

  fieldLabel: {
    fontSize: 16,
    fontWeight: "700",

    marginTop: 12,
    marginBottom: 6,
    fontFamily: baseFont,
  },

  input: {
    height: 40,

    borderWidth: 1,
    borderColor: "#B5B5B5",
    borderRadius: 6,

    paddingHorizontal: 12,
    fontFamily: baseFont,
  },

  bioInput: {
    minHeight: 106,

    borderWidth: 1,
    borderColor: "#B5B5B5",
    borderRadius: 6,

    paddingHorizontal: 12,
    paddingVertical: 10,

    textAlignVertical: "top",
    fontFamily: baseFont,
  },

  saveButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: "#FD7509",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 26,
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: baseFont,

  },

  // Modal de Configurações
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  panel: {
    minHeight: 250,
    backgroundColor: "#FFF",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    padding: 20,
  },

  closeBtn: {
    alignSelf: "flex-end",
    padding: 5,
  },

  closeBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    fontFamily: baseFont,
  },

  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: baseFont,
  },

  actionDanger: {
    backgroundColor: "#FFF1EE",
    borderRadius: 10,

    alignItems: "center",

    padding: 15,
    marginTop: 20,
  },

  dangerText: {
    fontWeight: "bold",
    color: "#AF3626",
    fontFamily: baseFont,
  },
});