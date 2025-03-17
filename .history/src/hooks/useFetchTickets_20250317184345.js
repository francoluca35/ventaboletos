"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../backend/firebase.config.mjs"; // Asegúrate de que el path es correcto

export const useFetchTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [origenes, setOrigenes] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPasajes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTickets(data);
        setOrigenes([...new Set(data.map(ticket => ticket.origen))]);
        setDestinos([...new Set(data.map(ticket => ticket.destino))]);
      } catch (err) {
        setError("Error al cargar los pasajes.");
        console.error("❌ Error al cargar viajes:", err);
      } finally {
        setLoading(false);
      }
    };
    obtenerPasajes();
  }, []);

  return { tickets, origenes, destinos, loading, error };
};
