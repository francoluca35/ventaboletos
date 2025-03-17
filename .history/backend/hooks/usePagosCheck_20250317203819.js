"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase.config.mjs";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import crypto from "crypto";

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

  const generarUID = () => {
    return crypto.randomBytes(5).toString("hex"); // Genera 10 caracteres hexadecimales únicos
  };

  const guardarPago = async (datos) => {
    try {
      const nuevoPago = {
        id: generarUID(), // Genera un ID único de 10 caracteres
        fechaViaje: datos.fechaViaje,
        destino: datos.destino,
        nombreCompleto: datos.nombreCompleto,
        direccion: datos.direccion,
        dni: datos.dni,
        telefono: datos.telefono,
        metodoPago: datos.metodoPago, // Guarda el método de pago en Firebase
        fechaRegistro: new Date().toISOString(),
      };
      await addDoc(pagosCollectionRef, nuevoPago);
    } catch (error) {
      console.error("Error al guardar el pago: ", error);
    }
  };

  return { pagos, guardarPago };
}