import { db } from "./firebase.config.mjs"; // 🔥 Asegúrate de importar bien
import { collection, addDoc } from "firebase/firestore/lite"; // ⚠️ Usa "/lite"

const tickets = [
 
  { origen: "Merlo", destino: "San Luis", precio: 900, fechaDesde: "2025-03-13", fechaHasta: "2025-03-21", horario: "noche", hora: "22:30" }
];

const subirDatos = async () => {
  try {
    const ticketsRef = collection(db, "tickets"); // 🔥 Asegurar que Firestore se inicializa bien
    for (const ticket of tickets) {
      await addDoc(ticketsRef, ticket);
    }
    console.log("✅ Datos subidos correctamente a Firestore.");
  } catch (error) {
    console.error("❌ Error subiendo datos:", error);
  }
};

subirDatos();
