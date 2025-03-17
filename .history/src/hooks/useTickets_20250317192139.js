"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from "../../backend/firebase.config.mjs"

// Asegurar que Firestore está bien inicializado
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log("📡 Conectando a Firestore...");
        
        if (!db) throw new Error("❌ Firestore no está inicializado.");

        // Obtener la referencia de la colección
        const ref = collection(db, "tickets");
        if (!ref) throw new Error("❌ No se pudo obtener referencia a 'tickets'.");

        const querySnapshot = await getDocs(ref);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setTickets(data);
        console.log("✅ Tickets cargados correctamente:", data);
      } catch (err) {
        setError("Error al cargar los pasajes.");
        console.error("❌ Error en Firestore:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
};

export default useTickets;
