"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function Home() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [pasajes, setPasajes] = useState([]);
  const [todosLosViajes, setTodosLosViajes] = useState([]);
  const [origenesDisponibles, setOrigenesDisponibles] = useState([]);
  const [destinosDisponibles, setDestinosDisponibles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets")
      .then(response => {
        console.log("Datos recibidos:", response.data); // <-- VERIFICA LOS DATOS EN CONSOLA
        setTodosLosViajes(response.data);
        setPasajes(response.data);

        // Obtener valores únicos de origen y destino
        const origenes = [...new Set(response.data.map(ticket => ticket.origen))];
        const destinos = [...new Set(response.data.map(ticket => ticket.destino))];

        console.log("Origenes:", origenes); // <-- VERIFICA QUE ESTO NO SEA VACÍO
        setOrigenesDisponibles(origenes);
        setDestinosDisponibles(destinos);
      })
      .catch(error => console.error("Error cargando viajes:", error));
  }, []);

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/fondo-pasajes.jpg')" }}>
      <Sidebar />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold mb-6">Compra tu pasaje fácil y rápido</h1>

        {/* Formulario de Búsqueda */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Origen */}
            <div>
              <label className="block text-gray-700">Origen:</label>
              <select
                className="w-full p-2 border rounded"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
              >
                <option value="">Seleccionar Origen</option>
                {origenesDisponibles.length > 0 ? (
                  origenesDisponibles.map((origen, index) => (
                    <option key={index} value={origen}>{origen}</option>
                  ))
                ) : (
                  <option disabled>Cargando...</option>
                )}
              </select>
            </div>

            {/* Destino */}
            <div>
              <label className="block text-gray-700">Destino:</label>
              <select
                className="w-full p-2 border rounded"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              >
                <option value="">Seleccionar Destino</option>
                {destinosDisponibles.length > 0 ? (
                  destinosDisponibles.map((destino, index) => (
                    <option key={index} value={destino}>{destino}</option>
                  ))
                ) : (
                  <option disabled>Cargando...</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-6 w-full max-w-3xl">
          {pasajes.length > 0 ? (
            <ul className="bg-white p-4 rounded-lg shadow-lg">
              {pasajes.map(ticket => (
                <li key={ticket.id} className="border-b py-2 flex flex-col">
                  <span className="font-bold">{ticket.origen} ➝ {ticket.destino}</span>
                  <span>Precio: ${ticket.precio}</span>
                  <span>Desde: {ticket.fechaDesde} - Hasta: {ticket.fechaHasta}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white mt-4">No se encontraron pasajes disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
