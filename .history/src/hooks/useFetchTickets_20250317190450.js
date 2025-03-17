"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "../../backend/firebase.config.js";  // Asegúrate de que la ruta es correcta

export default function useFetchTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPasajes = async () => {
      try {
        console.log("📡 Conectando a Firestore...");
        
        if (!db) {
          throw new Error("Firestore no está inicializado.");
        }

        const querySnapshot = await getDocs(collection(db, "tickets"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setTickets(data);
        console.log("✅ Datos cargados:", data);
      } catch (err) {
        setError("Error al cargar los pasajes.");
        console.error("❌ Error en Firestore:", err);
      } finally {
        setLoading(false);
      }
    };

    obtenerPasajes();
  }, []);

  return { tickets, loading, error };
}
