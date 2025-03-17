"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../../../backend/firebase.config.mjs"; // Asegúrate de importar la configuración de Firebase
import { collection, addDoc } from "firebase/firestore";

export default function Pago() {
  const searchParams = useSearchParams();
  const origen = searchParams.get("origen");
  const destino = searchParams.get("destino");
  const horario = searchParams.get("horario");
  const hora = searchParams.get("hora");
  const precio = parseFloat(searchParams.get("precio")) || 0;
  const cantidad = parseInt(searchParams.get("cantidad")) || 1;
  const total = precio * cantidad;

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    dni: "",
    telefono: "",
    correo: "",
    direccion: "",
    localidad: "",
    codigoPostal: "",
    metodoPago: "Efectivo",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "pagos-completos"), {
        ...formData,
        origen,
        destino,
        horario,
        hora,
        precio,
        cantidad,
        total,
        fecha: new Date().toISOString(),
      });
      alert("Pago confirmado y registrado en la base de datos");
    } catch (error) {
      console.error("Error guardando el pago: ", error);
      alert("Hubo un error al registrar el pago");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Detalles del Pasaje</h2>
      <p><strong>Origen:</strong> {origen}</p>
      <p><strong>Destino:</strong> {destino}</p>
      <p><strong>Turno:</strong> {horario}</p>
      <p><strong>Horario:</strong> {hora}</p>
      <p><strong>Precio por boleto:</strong> ${precio}</p>
      <p><strong>Cantidad:</strong> {cantidad}</p>
      <p><strong>Total a Pagar:</strong> ${total}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-2">
          <label className="block text-gray-700">Nombre Completo:</label>
          <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">DNI:</label>
          <input type="text" name="dni" value={formData.dni} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Teléfono:</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Correo Electrónico:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Dirección:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Localidad:</label>
          <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Código Postal:</label>
          <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Método de Pago:</label>
          <select name="metodoPago" value={formData.metodoPago} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Mercado Pago">Mercado Pago</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full">Confirmar Pago</button>
      </form>
    </div>
  );
}