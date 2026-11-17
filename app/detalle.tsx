import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DetalleScreen() {
  const { nombre, precio } = useLocalSearchParams();
  const nombreProducto = String(nombre || "Churros Tradicionales");

  const [cantidad, setCantidad] = useState(1);

  // Estados específicos para cada producto
  const [soloChocolate, setSoloChocolate] = useState(true);
  const [coberturaTradicional, setCoberturaTradicional] = useState("Canela y azúcar");
  const [cajeta, setCajeta] = useState(true);
  const [nutella, setNutella] = useState(false);
  const [crema, setCrema] = useState(false);
  const [azucar, setAzucar] = useState(false);
  const [canela, setCanela] = useState(true);
  const [tamanoChocolate, setTamanoChocolate] = useState("1/2 lt");

  const precioNumerico = precio ? parseFloat(String(precio).replace(/[^0-9.]/g, "")) : 8;
  const precioTotal = precioNumerico * cantidad;

  // Obtener nombre de la imagen para pasarlo por parámetro
  const obtenerClaveImagen = (nombre: string) => {
    const n = nombre.toLowerCase();
    if (n.includes("churros con chocolate")) return "churrosc";
    if (n.includes("relleno")) return "churrosr";
    if (n.includes("tradicionales")) return "paqchur";
    if (n.includes("chocolate caliente")) return "vasocho";
    return "RC";
  };

  const obtenerImagenProducto = (nombre: string) => {
    switch (obtenerClaveImagen(nombre)) {
      case "churrosc": return require("../../assets/images/churroc.jpg");
      case "churrosr": return require("../../assets/images/churrosr.jpg");
      case "paqchur": return require("../../assets/images/paqchur.jpg");
      case "vasocho": return require("../../assets/images/vasocho.jpg");
      default: return require("../../assets/images/RC.jpg");
    }
  };

  // Función para agregar al carrito e ir a la pantalla
  const handleAgregarAlCarrito = () => {
    router.push({
      pathname: "/carrito",
      params: {
        nuevoNombre: nombreProducto,
        nuevoPrecio: precioNumerico,
        nuevaCantidad: cantidad,
        nuevaImagen: obtenerClaveImagen(nombreProducto),
      },
    } as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerImageContainer}>
        <TouchableOpacity style={styles.btnBack} onPress={() => router.back()}>
          <Text style={styles.backIcon}>〈</Text>
        </TouchableOpacity>
        <Image
          source={obtenerImagenProducto(nombreProducto)}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.rowBetween}>
          <Text style={styles.titulo}>{nombreProducto}</Text>
          <Text style={styles.precio}>${precioTotal}</Text>
        </View>

        <Text style={styles.descripcion}>
          Preparado al momento, crujiente por fuera y suave por dentro, con la calidad tradicional de la casa.
        </Text>

        {/* Interfaz Churros con Chocolate */}
        {nombreProducto.toLowerCase().includes("churros con chocolate") && (
          <View>
            <Text style={styles.seccionTitulo}>Opción de Dip</Text>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setSoloChocolate(!soloChocolate)}>
              <View style={[styles.checkbox, soloChocolate && styles.checkboxChecked]}>
                {soloChocolate && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Incluir Chocolate Caliente</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Interfaz Churros Tradicionales */}
        {(nombreProducto.toLowerCase().includes("tradicionales") || nombreProducto.toLowerCase().includes("4 churros tradicionales")) && (
          <View>
            <Text style={styles.seccionTitulo}>Cobertura</Text>
            {["Azúcar", "Canela y azúcar", "Solo"].map((opcion) => (
              <TouchableOpacity
                key={opcion}
                style={styles.checkboxRow}
                onPress={() => setCoberturaTradicional(opcion)}
              >
                <View style={[styles.checkbox, coberturaTradicional === opcion && styles.checkboxChecked]}>
                  {coberturaTradicional === opcion && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>{opcion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Interfaz Churros Rellenos */}
        {nombreProducto.toLowerCase().includes("relleno") && (
          <View>
            <Text style={styles.seccionTitulo}>Elige Relleno</Text>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setCajeta(!cajeta)}>
              <View style={[styles.checkbox, cajeta && styles.checkboxChecked]}>
                {cajeta && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Cajeta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setNutella(!nutella)}>
              <View style={[styles.checkbox, nutella && styles.checkboxChecked]}>
                {nutella && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Nutella</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setCrema(!crema)}>
              <View style={[styles.checkbox, crema && styles.checkboxChecked]}>
                {crema && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Crema Pastelera</Text>
            </TouchableOpacity>

            <Text style={[styles.seccionTitulo, { marginTop: 15 }]}>Elige Cobertura</Text>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setAzucar(!azucar)}>
              <View style={[styles.checkbox, azucar && styles.checkboxChecked]}>
                {azucar && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Azúcar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setCanela(!canela)}>
              <View style={[styles.checkbox, canela && styles.checkboxChecked]}>
                {canela && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Canela</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Interfaz Chocolate Caliente */}
        {nombreProducto.toLowerCase().includes("chocolate caliente") && (
          <View>
            <Text style={styles.seccionTitulo}>Elige Presentación</Text>
            {["1 lt", "1/2 lt", "1/4"].map((tam) => (
              <TouchableOpacity
                key={tam}
                style={styles.checkboxRow}
                onPress={() => setTamanoChocolate(tam)}
              >
                <View style={[styles.checkbox, tamanoChocolate === tam && styles.checkboxChecked]}>
                  {tamanoChocolate === tam && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>{tam}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Barra Inferior */}
      <View style={styles.bottomBar}>
        <View style={styles.controlCantidad}>
          <TouchableOpacity onPress={() => setCantidad(Math.max(1, cantidad - 1))} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{cantidad}</Text>
          <TouchableOpacity onPress={() => setCantidad(cantidad + 1)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnAddCart} onPress={handleAgregarAlCarrito}>
          <Text style={styles.btnAddCartText}>AGREGAR AL CARRITO - ${precioTotal}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF8F2" },
  headerImageContainer: { width: "100%", height: 240, backgroundColor: "#EFE4D6", position: "relative" },
  headerImage: { width: "100%", height: "100%" },
  btnBack: { position: "absolute", top: 45, left: 15, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 20, width: 38, height: 38, justifyContent: "center", alignItems: "center", zIndex: 10 },
  backIcon: { fontSize: 20, fontWeight: "bold", color: "#612708" },
  scrollContent: { padding: 16, paddingBottom: 100 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  titulo: { fontSize: 20, fontWeight: "bold", color: "#612708", flex: 1, marginRight: 10 },
  precio: { fontSize: 20, fontWeight: "bold", color: "#612708" },
  descripcion: { color: "#8C6D58", fontSize: 13, marginBottom: 20 },
  seccionTitulo: { fontWeight: "bold", fontSize: 15, color: "#612708", marginBottom: 10 },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: "#C85A17", justifyContent: "center", alignItems: "center", marginRight: 10 },
  checkboxChecked: { backgroundColor: "#C85A17" },
  checkmark: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  checkboxLabel: { fontWeight: "600", fontSize: 13, color: "#612708" },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FAF0E4", borderTopWidth: 1, borderTopColor: "#E2D7CE", padding: 12, flexDirection: "row", alignItems: "center", gap: 12 },
  controlCantidad: { flexDirection: "row", alignItems: "center", backgroundColor: "#EFE4D6", borderRadius: 10, padding: 6 },
  qtyBtn: { paddingHorizontal: 8 },
  qtyBtnText: { fontWeight: "bold", fontSize: 16, color: "#612708" },
  qtyText: { fontWeight: "bold", marginHorizontal: 8, color: "#612708" },
  btnAddCart: { flex: 1, backgroundColor: "#C85A17", borderRadius: 12, padding: 12, alignItems: "center" },
  btnAddCartText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 13 },
});