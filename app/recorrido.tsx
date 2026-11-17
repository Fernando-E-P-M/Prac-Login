import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RecorridoScreen() {
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState("Av. Universidad #120, Dpto. 4B");

  // Escuchar mensajes del mapa HTML cuando el usuario hace clic en el mapa web
  useEffect(() => {
    if (Platform.OS === "web") {
      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === "SELECCIONAR_UBICACION") {
          setUbicacionSeleccionada(event.data.direccion);
        }
      };
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }
  }, []);

  // HTML interactivo con Leaflet que permite dar clic para mover el pin y enviar las coordenadas
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; }
        #map { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', { zoomControl: true }).setView([19.4326, -99.1332], 16);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        var marker = L.marker([19.4326, -99.1332], { draggable: true }).addTo(map);
        marker.bindPopup("<b>Ubicación de entrega</b>").openPopup();

        // Al hacer clic en el mapa, mover el marcador y avisar a React Native
        map.on('click', function(e) {
          var lat = e.latlng.lat.toFixed(4);
          var lng = e.latlng.lng.toFixed(4);
          marker.setLatLng(e.latlng);
          
          var nuevaDireccion = "Ubicación fijada (" + lat + ", " + lng + ")";
          window.parent.postMessage({ type: "SELECCIONAR_UBICACION", direccion: nuevaDireccion }, "*");
        });

        // Al arrastrar el marcador
        marker.on('dragend', function(e) {
          var position = marker.getLatLng();
          var lat = position.lat.toFixed(4);
          var lng = position.lng.toFixed(4);
          var nuevaDireccion = "Ubicación fijada (" + lat + ", " + lng + ")";
          window.parent.postMessage({ type: "SELECCIONAR_UBICACION", direccion: nuevaDireccion }, "*");
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/RC.jpg")}
          style={styles.logoHeader}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>EL REY CHURRERO</Text>
          <Text style={styles.headerSub}>Pedido #1042 • Selecciona la ubicación en el mapa</Text>
        </View>
      </View>

      {/* Contenedor del Mapa Interactivo */}
      <View style={styles.mapContainer}>
        {Platform.OS === "web" ? (
          <iframe
            srcDoc={mapHTML}
            width="100%"
            height="100%"
            style={{ border: 0 }}
          />
        ) : (
          <View style={styles.fallbackMap}>
            <Text style={{ fontSize: 40 }}>📍</Text>
            <Text style={styles.mapText}>Toca el mapa para seleccionar destino</Text>
          </View>
        )}

        {/* Tarjeta Flotante con campo editable y seleccionable */}
        <View style={styles.floatingCardWrapper} pointerEvents="box-none">
          <View style={styles.floatingCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.entregaNum}>ENTREGA #1</Text>
                <Text style={styles.clienteNombre}>Carlos Mendoza</Text>
              </View>
              <View style={styles.badgeTiempo}>
                <Text style={styles.badgeText}>⏱️ A 6 min</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoBlock}>
              <Text style={styles.infoText}>🛍️ 2x Churros Tradicionales + Dip</Text>
              <Text style={styles.labelUbicacion}>📍 Dirección de Entrega:</Text>
              <TextInput
                style={styles.inputUbicacion}
                value={ubicacionSeleccionada}
                onChangeText={setUbicacionSeleccionada}
                placeholder="Haz clic en el mapa o escribe la dirección..."
              />
            </View>

            <TouchableOpacity
              style={styles.btnEntregar}
              onPress={() => router.push("/inicio" as any)}
            >
              <Text style={styles.btnEntregarText}>CONFIRMAR UBICACIÓN Y ENTREGA ✅</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Barra de Navegación Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/inicio" as any)}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/recorrido" as any)}>
          <Text style={styles.navIconActive}>🗺️</Text>
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
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#E2D7CE",
    zIndex: 10,
  },
  logoHeader: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  headerTitle: {
    fontSize: 14,
    color: "#7A350C",
    fontWeight: "bold",
  },
  headerSub: {
    fontSize: 11,
    color: "#8C6D58",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "#EFE4D6",
  },
  fallbackMap: {
    flex: 1,
    backgroundColor: "#EFE4D6",
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    color: "#7A350C",
    fontWeight: "600",
    marginTop: 5,
  },
  floatingCardWrapper: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  floatingCard: {
    width: "92%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2D7CE",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  entregaNum: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#C85A17",
  },
  clienteNombre: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#7A350C",
  },
  badgeTiempo: {
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#856404",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2D7CE",
    marginVertical: 10,
  },
  infoBlock: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 12,
    color: "#612708",
    marginBottom: 6,
  },
  labelUbicacion: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#7A350C",
    marginTop: 4,
  },
  inputUbicacion: {
    backgroundColor: "#FDF8F2",
    borderWidth: 1,
    borderColor: "#C85A17",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    color: "#612708",
    marginTop: 4,
  },
  btnEntregar: {
    backgroundColor: "#C85A17",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnEntregarText: {
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
    zIndex: 30,
  },
  navIcon: {
    fontSize: 22,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 22,
    color: "#7A350C",
  },
});