"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const argentinaProvincias = [
  "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Tucumán", "Salta",
  "Entre Ríos", "Misiones", "Chaco", "Corrientes", "Santiago del Estero",
  "San Juan", "Jujuy", "Río Negro", "Neuquén", "Formosa", "Chubut",
  "San Luis", "Catamarca", "La Rioja", "La Pampa", "Santa Cruz", "Tierra del Fuego"
];

export default function Home() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [pasajes, setPasajes] = useState([]);
  const [todosLosDestinos, setTodosLosDestinos] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            setOrigen(response.data.address.city || "Ubicación no encontrada");
          } catch (error) {
            console.error("Error obteniendo ubicación:", error);
          }
        },
        (error) => console.error("Error al obtener la ubicación:", error)
      );
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/data/tickets")
      .then(response => {
        setTodosLosDestinos(response.data.map(ticket => ticket.destino));
      })
      .catch(error => console.error("Error cargando destinos:", error));
  }, []);

  const buscarPasajes = () => {
    axios.get("http://localhost:5000/api/tickets")
      .then(response => {
        const resultados = response.data.filter(ticket =>
          ticket.destino.includes(destino) &&
          (!fechaDesde || new Date(ticket.fechaDesde) <= new Date(fechaDesde)) &&
          (!fechaHasta || new Date(ticket.fechaHasta) >= new Date(fechaHasta))
        );
        setPasajes(resultados);
      })
      .catch(error => console.error("Error al buscar pasajes:", error));
  };

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
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                placeholder="Escribe tu ubicación"
              />
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
                {[...new Set([...todosLosDestinos, ...argentinaProvincias])].map((provincia, index) => (
                  <option key={index} value={provincia}>{provincia}</option>
                ))}
              </select>
            </div>

            {/* Fecha Desde */}
            <div>
              <label className="block text-gray-700">Fecha Desde:</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
              />
            </div>

            {/* Fecha Hasta */}
            <div>
              <label className="block text-gray-700">Fecha Hasta:</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={buscarPasajes}
            className="w-full bg-blue-600 text-white p-3 rounded mt-4"
          >
            Buscar Pasajes
          </button>
        </div>

        {/* Resultados */}
        <div className="mt-6 w-full max-w-3xl">
          {pasajes.length > 0 ? (
            <ul className="bg-white p-4 rounded-lg shadow-lg">
              {pasajes.map(ticket => (
                <li key={ticket.id} className="border-b py-2 flex flex-col">
                  <span className="font-bold">{ticket.destino} - ${ticket.precio}</span>
                  <span>Desde: {ticket.fechaDesde}</span>
                  <span>Hasta: {ticket.fechaHasta}</span>
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
