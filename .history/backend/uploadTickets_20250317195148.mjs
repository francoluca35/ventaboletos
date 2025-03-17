import { db } from "./firebase.config.mjs"; // 🔥 Asegúrate de importar bien
import { collection, addDoc } from "firebase/firestore"; // ⚠️ Usa "/lite"

const tickets = [
 
  { origen: "Merlo", destino: "Córdoba", precio: 1200, fechaDesde: "2025-03-14", fechaHasta: "2025-03-22", horario: "mañana", hora: "08:00" },
  { origen: "Merlo", destino: "Mendoza", precio: 1500, fechaDesde: "2025-03-15", fechaHasta: "2025-03-23", horario: "tarde", hora: "15:45" },
  { origen: "Merlo", destino: "Rosario", precio: 1700, fechaDesde: "2025-03-16", fechaHasta: "2025-03-24", horario: "noche", hora: "23:00" },
  { origen: "Merlo", destino: "Buenos Aires", precio: 2000, fechaDesde: "2025-03-17", fechaHasta: "2025-03-25", horario: "mañana", hora: "07:15" },
  { origen: "Merlo", destino: "San Juan", precio: 1400, fechaDesde: "2025-03-18", fechaHasta: "2025-03-26", horario: "tarde", hora: "16:30" }
];

const subirDatos = async () => {
  try {
    const ticketsRef = collection(db, "tickets"); 
    for (const ticket of tickets) {
      await addDoc(ticketsRef, ticket);
    }
    console.log("✅ Datos subidos correctamente a Firestore.");
  } catch (error) {
    console.error("❌ Error subiendo datos:", error);
  }
};

subirDatos();
