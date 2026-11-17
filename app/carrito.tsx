import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CarritoScreen() {
  const params = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Mapeador de imágenes locales
  const resolverImagen = (key: string) => {
    switch (key) {
      case "churrosc": return require("../../assets/images/churroc.jpg");
      case "churrosr": return require("../../assets/images/churrosr.jpg");
      case "paqchur": return require("../../assets/images/paqchur.jpg");
      case "vasocho": return require("../../assets/images/vasocho.jpg");
      default: return require("../../assets/images/RC.jpg");
    }
  };

  // Escuchar cuando el usuario agrega un producto
  useEffect(() => {
    if (params.nuevoNombre) {
      const itemNuevo = {
        id: Date.now().toString(),
        name: String(params.nuevoNombre),
        price: parseFloat(String(params.nuevoPrecio || 0)),
        qty: parseInt(String(params.nuevaCantidad || 1), 10),
        image: resolverImagen(String(params.nuevaImagen)),
      };
      setCartItems([itemNuevo]); // Reemplaza la lista previa con la selección exacta del usuario
    }
  }, [params.nuevoNombre, params.nuevaCantidad]);

  const incrementarQty = (id: string) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decrementarQty = (id: string) => {
    setCartItems(cartItems.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const eliminarItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const envio = cartItems.length > 0 ? 25 : 0;
  const total = subtotal + envio;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerApp}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>〈</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TU PEDIDO</Text>
        <Text style={styles.headerIcon}>🛒</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tu carrito está vacío 🛒</Text>
            <TouchableOpacity style={styles.btnExplorar} onPress={() => router.push("/inicio" as any)}>
              <Text style={styles.btnExplorarText}>Ver Productos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Solo muestra el producto agregado */}
            {cartItems.map((item) => (
              <View key={item.id} style={styles.itemCarrito}>
                <View style={styles.itemLeft}>
                  <Image source={item.image} style={styles.imgItem} resizeMode="cover" />
                  <View>
                    <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.qtyContainer}>
                      <TouchableOpacity style={styles.btnQty} onPress={() => decrementarQty(item.id)}>
                        <Text style={styles.btnQtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyNumber}>{item.qty}</Text>
                      <TouchableOpacity style={styles.btnQty} onPress={() => incrementarQty(item.id)}>
                        <Text style={styles.btnQtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.itemRight}>
                  <TouchableOpacity onPress={() => eliminarItem(item.id)}>
                    <Text style={styles.trashIcon}>🗑️</Text>
                  </TouchableOpacity>
                  <Text style={styles.itemPrice}>${item.price * item.qty}</Text>
                </View>
              </View>
            ))}

            {/* Resumen de Pago */}
            <View style={styles.resumenContainer}>
              <View style={styles.resumenRow}>
                <Text style={styles.resumenText}>Subtotal</Text>
                <Text style={styles.resumenText}>${subtotal}</Text>
              </View>
              <View style={styles.resumenRow}>
                <Text style={styles.resumenText}>Envío</Text>
                <Text style={styles.resumenText}>${envio}</Text>
              </View>
              <View style={[styles.resumenRow, { borderTopWidth: 1, borderColor: "#E2D7CE", marginTop: 8, paddingTop: 8 }]}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>${total}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.btnPagar}
              onPress={() => router.push("/recorrido" as any)}
            >
              <Text style={styles.btnPagarText}>PROCEDER AL PAGO - ${total}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF8F2" },
  headerApp: { backgroundColor: "#C85A17", paddingTop: 45, paddingBottom: 14, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
  backBtn: { padding: 4 },
  backText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  headerIcon: { fontSize: 18 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  emptyContainer: { marginTop: 100, alignItems: "center" },
  emptyText: { fontSize: 16, color: "#8C6D58", fontWeight: "bold", marginBottom: 16 },
  btnExplorar: { backgroundColor: "#C85A17", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  btnExplorarText: { color: "#FFF", fontWeight: "bold" },
  itemCarrito: { backgroundColor: "#FAF0E4", borderRadius: 16, padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  itemLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  imgItem: { width: 65, height: 65, borderRadius: 12 },
  itemTitle: { fontWeight: "bold", fontSize: 12, color: "#612708", maxWidth: 150 },
  qtyContainer: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  btnQty: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#C85A17", justifyContent: "center", alignItems: "center" },
  btnQtyText: { color: "#FFF", fontWeight: "bold", fontSize: 12 },
  qtyNumber: { fontWeight: "bold", fontSize: 12, color: "#612708" },
  itemRight: { alignItems: "flex-end", justifyContent: "space-between", height: 65, paddingLeft: 8 },
  trashIcon: { fontSize: 14 },
  itemPrice: { fontWeight: "bold", color: "#612708", fontSize: 13 },
  resumenContainer: { backgroundColor: "#FAF0E4", borderRadius: 16, padding: 16, marginVertical: 12 },
  resumenRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  resumenText: { color: "#8C6D58", fontSize: 13 },
  totalText: { fontWeight: "bold", color: "#612708", fontSize: 15 },
  btnPagar: { backgroundColor: "#C85A17", borderRadius: 14, padding: 14, alignItems: "center", marginTop: 10 },
  btnPagarText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },
});