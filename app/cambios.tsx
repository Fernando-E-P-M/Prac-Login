import { useEffect, useState } from "react";
import { Platform, StyleSheet, Switch, View } from "react-native";

export default function PantallaCambio() {
  const [esTurquesa, setEsTurquesa] = useState<boolean>(false);

  // Cargar el color guardado al iniciar la pantalla sin usar librerías externas
  useEffect(() => {
    if (Platform.OS === "web") {
      const valorGuardado = localStorage.getItem("@modo_turquesa");
      if (valorGuardado !== null) {
        setEsTurquesa(JSON.parse(valorGuardado));
      }
    }
  }, []);

  // Guardar el estado cada vez que se accione el switch
  const manejarCambio = (nuevoValor: boolean) => {
    setEsTurquesa(nuevoValor);
    if (Platform.OS === "web") {
      localStorage.setItem("@modo_turquesa", JSON.stringify(nuevoValor));
    }
  };

  const fondoActual = esTurquesa ? "#00CED1" : "#D8B4FE";

  return (
    <View style={[styles.container, { backgroundColor: fondoActual }]}>
      <Switch
        trackColor={{ false: "#C084FC", true: "#008B8B" }}
        thumbColor={esTurquesa ? "#E0FFFF" : "#581C87"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={manejarCambio}
        value={esTurquesa}
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});