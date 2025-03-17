const { db } = require("./firebase.config.js");
const { collection, addDoc } = require("firebase/firestore");


// Datos a subir
const tickets = [
  { origen: "Merlo", destino: "Córdoba", precio: 100, fechaDesde: "2025-03-20", fechaHasta: "2025-03-25", horario: "mañana", hora: "07:30" },
  { origen: "Padua", destino: "Mendoza", precio: 80, fechaDesde: "2025-03-22", fechaHasta: "2025-03-26", horario: "tarde", hora: "15:45" },
  { origen: "Merlo", destino: "Salta", precio: 90, fechaDesde: "2025-03-23", fechaHasta: "2025-03-27", horario: "noche", hora: "22:30" }
];

const subirDatos = async () => {
  try {
    for (const ticket of tickets) {
      await addDoc(collection(db, "tickets"), ticket); // 🔥 db ahora se pasa correctamente
    }
    console.log("✅ Datos subidos correctamente a Firestore.");
  } catch (error) {
    console.error("❌ Error subiendo datos:", error);
  }
};

// Ejecutar función
subirDatos();