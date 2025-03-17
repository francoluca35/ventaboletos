"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import useTickets from "../../../backend/hooks/useTickets";  

export default function VentaBoleto() {
  const { tickets, loading, error } = useTickets();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [horario, setHorario] = useState("");
  const [cantidadBoletos, setCantidadBoletos] = useState({});
  const router = useRouter();

  const buscarPasajes = () => {
    return tickets?.filter(ticket =>
      (!origen || ticket.origen === origen) &&
      (!destino || ticket.destino === destino) &&
      (!horario || ticket.horario === horario)
    );
  };

  const handleCompra = (ticket) => {
    const boletos = cantidadBoletos[ticket.id] || 1;
    router.push(`/pago?origen=${ticket.origen}&destino=${ticket.destino}&horario=${ticket.horario}&hora=${ticket.hora}&precio=${ticket.precio}&cantidad=${boletos}`);
  };

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center py-16 md:py-24" style={{ backgroundImage: "url('/Assets/fondo-pasajes.jpg')" }}>
      <Sidebar />

      {/* Contenedor principal */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Título con margen dinámico para evitar solapamiento */}
      <h1 className="relative text-white text-2xl sm:text-4xl md:text-5xl font-bold text-center z-10 mb-8">
        Compra tu pasaje fácil y rápido
      </h1>

      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Cargando o error */}
        {loading && <p className="text-gray-700 text-center">Cargando pasajes...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {!loading && (
          <>
            {/* Filtros de búsqueda */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Origen:</label>
                <select className="w-full p-2 border rounded" value={origen} onChange={(e) => setOrigen(e.target.value)}>
                  <option value="">Seleccionar Origen</option>
                  {[...new Set(tickets.map(ticket => ticket.origen))].map((origen, index) => (
                    <option key={index} value={origen}>{origen}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Destino:</label>
                <select className="w-full p-2 border rounded" value={destino} onChange={(e) => setDestino(e.target.value)}>
                  <option value="">Seleccionar Destino</option>
                  {[...new Set(tickets.map(ticket => ticket.destino))].map((destino, index) => (
                    <option key={index} value={destino}>{destino}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700">Horario:</label>
                <select className="w-full p-2 border rounded" value={horario} onChange={(e) => setHorario(e.target.value)}>
                  <option value="">Seleccionar Horario</option>
                  <option value="mañana">Mañana</option>
                  <option value="tarde">Tarde</option>
                  <option value="noche">Noche</option>
                </select>
              </div>
            </div>

            <button onClick={buscarPasajes} className="w-full bg-blue-600 text-white p-3 rounded mt-4">Buscar Pasajes</button>

            {/* Contenedor de resultados en grid responsive */}
            <div className="mt-6">
              {buscarPasajes().length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {buscarPasajes().map((ticket, index) => (
                    <div key={index} className="p-4 border rounded shadow bg-gray-100">
                      <p><strong>Origen:</strong> {ticket.origen}</p>
                      <p><strong>Destino:</strong> {ticket.destino}</p>
                      <p><strong>Horario:</strong> {ticket.hora}</p>
                      <p><strong>Precio:</strong> ${ticket.precio}</p>
                      <button onClick={() => handleCompra(ticket)} className="mt-2 w-full bg-green-600 text-white p-2 rounded">Comprar Pasaje</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600 text-center mt-4">No se encontraron pasajes.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
