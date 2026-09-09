import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Perfil() {

  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo - Perfil</Text>

      <TouchableOpacity style={styles.button} onPress={() => {
        router.push('/produtos')
      }}>
        <Text style={styles.buttonText}>Produtos</Text>
      </TouchableOpacity>

      <Link href="/" style={styles.link}>
        Página de Home
      </Link>
      <Link href="/produtos" style={styles.link}>
        Página de Produto
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginVertical: 15,
    color: "blue",
  },
});