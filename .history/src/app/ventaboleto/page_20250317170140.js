"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import axios from "axios";

export default function VentaBoleto() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [horario, setHorario] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [pasajes, setPasajes] = useState([]);
  const [origenesDisponibles, setOrigenesDisponibles] = useState([]);
  const [destinosDisponibles, setDestinosDisponibles] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tickets")
      .then((response) => {
        setPasajes(response.data);
        setOrigenesDisponibles([...new Set(response.data.map(ticket => ticket.origen))]);
        setDestinosDisponibles([...new Set(response.data.map(ticket => ticket.destino))]);
      })
      .catch((error) => console.error("Error cargando viajes:", error));
  }, []);

  const buscarPasajes = () => {
    const resultadosFiltrados = pasajes.filter(ticket =>
      (origen ? ticket.origen === origen : true) &&
      (destino ? ticket.destino === destino : true) &&
      (!fechaDesde || new Date(ticket.fechaDesde) >= new Date(fechaDesde)) &&
      (!fechaHasta || new Date(ticket.fechaHasta) <= new Date(fechaHasta)) &&
      (horario ? ticket.horario === horario : true) // Filtra por horario
    );
    setResultados(resultadosFiltrados);
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Assets/fondo-pasajes.jpg')" }}>
      <Sidebar />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold mb-6">Compra tu pasaje fácil y rápido</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ORIGEN */}
            <div>
              <label className="block text-gray-700">Origen:</label>
              <select className="w-full p-2 border rounded" value={origen} onChange={(e) => setOrigen(e.target.value)}>
                <option value="">Seleccionar Origen</option>
                {origenesDisponibles.map((origen, index) => (
                  <option key={index} value={origen}>{origen}</option>
                ))}
              </select>
            </div>

            {/* DESTINO */}
            <div>
              <label className="block text-gray-700">Destino:</label>
              <select className="w-full p-2 border rounded" value={destino} onChange={(e) => setDestino(e.target.value)}>
                <option value="">Seleccionar Destino</option>
                {destinosDisponibles.map((destino, index) => (
                  <option key={index} value={destino}>{destino}</option>
                ))}
              </select>
            </div>

            {/* HORARIO (se muestra solo si ya se eligió origen y destino) */}
            {origen && destino && (
              <div className="col-span-2">
                <label className="block text-gray-700">Horario de Salida:</label>
                <select className="w-full p-2 border rounded" value={horario} onChange={(e) => setHorario(e.target.value)}>
                  <option value="">Seleccionar Horario</option>
                  <option value="mañana">Mañana</option>
                  <option value="tarde">Tarde</option>
                  <option value="noche">Noche</option>
                </select>
              </div>
            )}
          </div>

          {/* BOTÓN DE BÚSQUEDA */}
          <button onClick={buscarPasajes} className="w-full bg-blue-600 text-white p-3 rounded mt-4">Buscar Pasajes</button>

          {/* RESULTADOS */}
          <div className="mt-6">
            {resultados.length > 0 ? (
              <div>
                <h2 className="text-gray-800 font-bold mb-4">Resultados Encontrados:</h2>
                <ul className="space-y-4">
                  {resultados.map((ticket, index) => (
                    <li key={index} className="p-4 border rounded shadow flex justify-between items-center bg-gray-100">
                      <div>
                        <p><strong>Origen:</strong> {ticket.origen}</p>
                        <p><strong>Destino:</strong> {ticket.destino}</p>
                        <p><strong>Horario:</strong> {ticket.hora}</p>
                        <p><strong>Precio:</strong> ${ticket.precio}</p>
                      </div>
                      <button className="bg-green-600 text-white p-2 rounded">Comprar Pasaje</button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-red-600 text-center mt-4">No se encontraron pasajes con los criterios seleccionados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
