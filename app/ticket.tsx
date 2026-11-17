import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TicketScreen() {
  const { totalPagar } = useLocalSearchParams();

  const fechaActual = new Date().toLocaleDateString();
  const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <View style={styles.ticketCard}>
        <Text style={styles.shopTitle}>🧸 PLUSHIE SHOP</Text>
        <Text style={styles.ticketSub}>✦ PASE PARA COBRO EN CAJA ✦</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>FECHA:</Text>
          <Text style={styles.value}>{fechaActual}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>HORA:</Text>
          <Text style={styles.value}>{horaActual}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>MODALIDAD:</Text>
          <Text style={[styles.value, { color: "#7C3AED" }]}>Físico / Tienda</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL A COBRAR:</Text>
          <Text style={styles.totalValue}>${totalPagar || "0"}</Text>
        </View>

        <Text style={styles.firmaTicket}>♔AO - PRESENTAR TICKET EN CAJA</Text>

        <TouchableOpacity 
          style={styles.btnVolver} 
          onPress={() => router.replace("/ini" as any)}
        >
          <Text style={styles.btnVolverText}>NUEVA COMPRA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1135",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  ticketCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#F472B6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  shopTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1F1135",
    letterSpacing: 1,
  },
  ticketSub: {
    fontSize: 10,
    color: "#7C3AED",
    marginTop: 6,
    fontWeight: "800",
    letterSpacing: 2,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
    borderStyle: "dashed",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "800",
    letterSpacing: 1,
  },
  value: {
    fontSize: 13,
    color: "#1F1135",
    fontWeight: "bold",
  },
  totalRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1F1135",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#7C3AED",
  },
  firmaTicket: {
    fontSize: 9,
    color: "#9CA3AF",
    marginBottom: 20,
    letterSpacing: 2,
    fontWeight: "800",
    textAlign: "center",
  },
  btnVolver: {
    width: "100%",
    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  btnVolverText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 1,
  },
});