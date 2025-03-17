"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../backend/firebase.config.mjs";  // Verifica que esta ruta sea correcta

export default function useFetchTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPasajes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTickets(data);
      } catch (err) {
        setError("Error al cargar los pasajes.");
        console.error("❌ Error al cargar los pasajes:", err);
      } finally {
        setLoading(false);
      }
    };
    obtenerPasajes();
  }, []);

  return { tickets, loading, error };
}
