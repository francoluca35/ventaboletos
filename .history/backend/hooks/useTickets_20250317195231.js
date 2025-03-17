"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config.mjs"; 

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log("Conectando a Firestore...");

        if (!db) {
          console.error(" Firestore no está inicializado.");
          setError("Firestore no está inicializado.");
          setLoading(false);
          return;
        }

        console.log("Firestore conectado:", db);

        const ref = collection(db, "tickets");
        console.log("Referencia a la colección obtenida:", ref);

        const querySnapshot = await getDocs(ref);
        console.log("Datos obtenidos de Firestore:", querySnapshot.docs);

        if (querySnapshot.empty) {
          console.warn(" No hay documentos en la colección 'tickets'.");
        }

        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTickets(data);

        console.log("Tickets cargados correctamente:", data);
      } catch (err) {
        console.error("Error en Firestore:", err);
        setError("Error al cargar los pasajes.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
};

export default useTickets;
