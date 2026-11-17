import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Redirige al inicio de la app
    router.replace("/inicio" as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Imagen del logo integrada */}
        <Image
          source={require("../../assets/images/RC.jpg")}
          style={styles.miniLogo}
          resizeMode="cover"
        />

        <Text style={styles.titulo}>¡BIENVENIDO!</Text>
        <Text style={styles.subtitulo}>Ingresa para pedir tus churros calientitos</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo o Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#A08C7D"
            value={correo}
            onChangeText={setCorreo}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#A08C7D"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.olvidoContainer}>
          <Text style={styles.enlaceOlvido}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnIngresar} onPress={handleLogin}>
          <Text style={styles.btnIngresarText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>

        <View style={styles.registroContainer}>
          <Text style={styles.textoRegistro}>
            ¿Aún no tienes cuenta?{" "}
            <Text style={styles.enlaceRegistro}>Regístrate aquí</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EFEB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#7A350C",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 5,
    alignItems: "center",
  },
  miniLogo: {
    width: 95,
    height: 95,
    borderRadius: 48,
    marginBottom: 15,
  },
  titulo: {
    color: "#7A350C",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  subtitulo: {
    color: "#8C6D58",
    fontSize: 13,
    marginBottom: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#7A350C",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: "#E2D7CE",
    backgroundColor: "#FAF8F5",
    color: "#7A350C",
    fontSize: 14,
  },
  olvidoContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  enlaceOlvido: {
    color: "#7A350C",
    fontSize: 12,
    fontWeight: "700",
  },
  btnIngresar: {
    backgroundColor: "#E5A823",
    borderRadius: 12,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    shadowColor: "#E5A823",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 4,
  },
  btnIngresarText: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 1,
    fontSize: 14,
  },
  registroContainer: {
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#E2D7CE",
    paddingTop: 15,
    width: "100%",
    alignItems: "center",
  },
  textoRegistro: {
    color: "#8C6D58",
    fontSize: 12,
  },
  enlaceRegistro: {
    color: "#E5A823",
    fontWeight: "800",
  },
});