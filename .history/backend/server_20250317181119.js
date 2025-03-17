const express = require("express");
const cors = require("cors");
const { db } = require("./firebaseConfig");
const { collection, getDocs, addDoc } = require("firebase/firestore");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener los pasajes desde Firestore
app.get("/api/tickets", async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "tickets"));
    const tickets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pasajes." });
  }
});

// Ruta para guardar una compra en Firestore
app.post("/api/comprar", async (req, res) => {
  try {
    const { origen, destino, horario, hora, precio, cantidad } = req.body;
    const compraRef = await addDoc(collection(db, "compras"), {
      origen,
      destino,
      horario,
      hora,
      precio,
      cantidad,
      fechaCompra: new Date().toISOString()
    });
    res.status(201).json({ id: compraRef.id, mensaje: "Compra registrada con éxito." });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la compra." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
