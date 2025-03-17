"use client";

import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function usePagosCheck() {
  const [pagos, setPagos] = useState([]);
  const pagosCollectionRef = collection(db, "pagos-completos");

  useEffect(() => {
    const q = query(pagosCollectionRef, orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPagos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const guardarPago = async (datos) => {
    try {
      const nuevoPago = {
        id: uuidv4(), // Genera un ID único
        fechaViaje: datos.fechaViaje,
        destino: datos.destino,
        nombreCompleto: datos.nombreCompleto,
        direccion: datos.direccion,
        dni: datos.dni,
        telefono: datos.telefono,
        fechaRegistro: new Date().toISOString(),
      };
      await addDoc(pagosCollectionRef, nuevoPago);
    } catch (error) {
      console.error("Error al guardar el pago: ", error);
    }
  };

  return { pagos, guardarPago };
}
