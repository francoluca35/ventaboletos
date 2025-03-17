"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import axios from "axios";

export default function Home() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [pasajes, setPasajes] = useState([]);
  const [origenesDisponibles, setOrigenesDisponibles] = useState([]);
  const [destinosDisponibles, setDestinosDisponibles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets")
      .then(response => {
        setPasajes(response.data);
        setOrigenesDisponibles([...new Set(response.data.map(ticket => ticket.origen))]);
        setDestinosDisponibles([...new Set(response.data.map(ticket => ticket.destino))]);
      })
      .catch(error => console.error("Error cargando viajes:", error));
  }, []);

  const buscarPasajes = () => {
    const resultados = pasajes.filter(ticket =>
      (origen ? ticket.origen.includes(origen) : true) &&
      (destino ? ticket.destino.includes(destino) : true) &&
      (!fechaDesde || new Date(ticket.fechaDesde) >= new Date(fechaDesde)) &&
      (!fechaHasta || new Date(ticket.fechaHasta) <= new Date(fechaHasta))
    );
    setPasajes(resultados);
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/fondo-pasajes.jpg')" }}>
      <Sidebar />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold mb-6">Compra tu pasaje fácil y rápido</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Origen:</label>
              <select className="w-full p-2 border rounded" value={origen} onChange={(e) => setOrigen(e.target.value)}>
                <option value="">Seleccionar Origen</option>
                {origenesDisponibles.map((origen, index) => (
                  <option key={index} value={origen}>{origen}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Destino:</label>
              <select className="w-full p-2 border rounded" value={destino} onChange={(e) => setDestino(e.target.value)}>
                <option value="">Seleccionar Destino</option>
                {destinosDisponibles.map((destino, index) => (
                  <option key={index} value={destino}>{destino}</option>
                ))}
              </select>
            </div>
          </div>

          <button onClick={buscarPasajes} className="w-full bg-blue-600 text-white p-3 rounded mt-4">Buscar Pasajes</button>
        </div>
      </div>
    </div>
  );
}
