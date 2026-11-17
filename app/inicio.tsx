import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InicioScreen() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  // Lista de productos
  const productos = [
    { id: "1", name: "Churros con Chocolate", price: "20 MXN", rating: "4.8", image: require("../../assets/images/churroc.jpg"), cat: "Especiales" },
    { id: "2", name: "Churro Relleno Cajeta", price: "25 MXN", rating: "4.9", image: require("../../assets/images/churrosr.jpg"), cat: "Rellenos" },
    { id: "3", name: "Churros Tradicionales", price: "8 MXN", rating: "4.7", image: require("../../assets/images/paqchur.jpg"), cat: "Tradicionales" },
    { id: "4", name: "Chocolate Caliente", price: "15 MXN", rating: "5.0", image: require("../../assets/images/vasocho.jpg"), cat: "Bebidas" },
  ];

  // Función para manejar la navegación hacia el detalle del producto con sus datos
  const handlePedir = (producto: typeof productos[0]) => {
    router.push({
      pathname: "/detalle",
      params: {
        nombre: producto.name,
        precio: producto.price,
      },
    } as any);
  };

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados = categoriaActiva === "Todos" 
    ? productos 
    : productos.filter(p => p.cat === categoriaActiva);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerApp}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.push("/login" as any)}>
            <Text style={styles.headerIcon}>👤</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>INICIO</Text>
          <TouchableOpacity onPress={() => router.push("/carrito" as any)}>
            <Text style={styles.headerIcon}>🛒</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSub}>EL REY CHURRERO 👑</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Promo */}
        <View style={styles.bannerPromo}>
          <View>
            <Text style={styles.bannerTitle}>¡Churros{"\n"}Calientes Ahora!</Text>
          </View>
          <Image
            source={require("../../assets/images/RC.jpg")}
            style={styles.imgBanner}
            resizeMode="cover"
          />
        </View>

        {/* Categorías Seleccionables */}
        <View style={styles.categoriesRow}>
          {["Todos", "Tradicionales", "Rellenos", "Especiales", "Bebidas"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catItem, categoriaActiva === cat && styles.catActive]}
              onPress={() => setCategoriaActiva(cat)}
            >
              <Text style={categoriaActiva === cat ? styles.catTextActive : styles.catText}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Grid de Productos Filtrados */}
        <View style={styles.grid}>
          {productosFiltrados.map((prod) => (
            <View key={prod.id} style={styles.cardProducto}>
              <Image
                source={prod.image}
                style={styles.imgCard}
                resizeMode="cover"
              />
              <Text style={styles.prodName} numberOfLines={1}>{prod.name}</Text>
              <View style={styles.prodFooter}>
                <Text style={styles.prodPrice}>{prod.price}</Text>
                <Text style={styles.prodRating}>⭐ {prod.rating}</Text>
              </View>
              <TouchableOpacity
                style={styles.btnPedir}
                onPress={() => handlePedir(prod)}
              >
                <Text style={styles.btnPedirText}>Pedir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Barra de Navegación Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/inicio" as any)}>
          <Text style={styles.navIconActive}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/recorrido" as any)}>
          <Text style={styles.navIcon}>🗺️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/carrito" as any)}>
          <Text style={styles.navIcon}>📦</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8F2",
  },
  headerApp: {
    backgroundColor: "#C85A17",
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  headerIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSub: {
    color: "#FFFFFF",
    fontSize: 11,
    textAlign: "center",
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  bannerPromo: {
    backgroundColor: "#7A350C",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imgBanner: {
    width: 75,
    height: 75,
    borderRadius: 38,
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#E2D7CE",
    paddingBottom: 8,
    marginBottom: 16,
  },
  catItem: {
    paddingBottom: 4,
  },
  catActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#C85A17",
  },
  catText: {
    fontSize: 12,
    color: "#8C6D58",
    fontWeight: "600",
  },
  catTextActive: {
    fontSize: 12,
    color: "#C85A17",
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardProducto: {
    width: "48%",
    backgroundColor: "#FAF0E4",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  imgCard: {
    height: 100,
    width: "100%",
    borderRadius: 12,
    marginBottom: 8,
  },
  prodName: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#612708",
  },
  prodFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  prodPrice: {
    fontWeight: "bold",
    color: "#612708",
    fontSize: 12,
  },
  prodRating: {
    fontSize: 11,
    color: "#E5A823",
  },
  btnPedir: {
    backgroundColor: "#C85A17",
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  btnPedirText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#FAF0E4",
    borderTopWidth: 1,
    borderTopColor: "#E2D7CE",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  navIconActive: {
    fontSize: 22,
  },
}); 