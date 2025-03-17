"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { useFetchTickets } from "@/hooks/useFetchTickets";

export default function VentaBoleto() {
  const { tickets, origenes, destinos, loading, error } = useFetchTickets();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [horario, setHorario] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cantidadBoletos, setCantidadBoletos] = useState({});
  const router = useRouter();

  const buscarPasajes = () => {
    const resultadosFiltrados = tickets.filter(ticket =>
      (origen ? ticket.origen === origen : true) &&
      (destino ? ticket.destino === destino : true) &&
      (horario ? ticket.horario === horario : true)
    );
    setResultados(resultadosFiltrados);
  };

  const handleCompra = (ticket) => {
    const boletos = cantidadBoletos[ticket.id] || 1;
    router.push(`/pago?origen=${ticket.origen}&destino=${ticket.destino}&horario=${ticket.horario}&hora=${ticket.hora}&precio=${ticket.precio}&cantidad=${boletos}`);
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Assets/fondo-pasajes.jpg')" }}>
      <Sidebar />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold mb-6">Compra tu pasaje fácil y rápido</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          {loading && <p className="text-gray-700 text-center">Cargando pasajes...</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Origen:</label>
                  <select className="w-full p-2 border rounded" value={origen} onChange={(e) => setOrigen(e.target.value)}>
                    <option value="">Seleccionar Origen</option>
                    {origenes.map((origen, index) => (
                      <option key={index} value={origen}>{origen}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Destino:</label>
                  <select className="w-full p-2 border rounded" value={destino} onChange={(e) => setDestino(e.target.value)}>
                    <option value="">Seleccionar Destino</option>
                    {destinos.map((destino, index) => (
                      <option key={index} value={destino}>{destino}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button onClick={buscarPasajes} className="w-full bg-blue-600 text-white p-3 rounded mt-4">Buscar Pasajes</button>

              <div className="mt-6">
                {resultados.length > 0 ? (
                  <ul className="space-y-4">
                    {resultados.map((ticket, index) => (
                      <li key={index} className="p-4 border rounded shadow flex justify-between items-center bg-gray-100">
                        <div>
                          <p><strong>Origen:</strong> {ticket.origen}</p>
                          <p><strong>Destino:</strong> {ticket.destino}</p>
                          <p><strong>Horario:</strong> {ticket.hora}</p>
                          <p><strong>Precio:</strong> ${ticket.precio}</p>
                          <label className="block mt-2">Cantidad de boletos:</label>
                          <input 
                            type="number" 
                            min="1" 
                            value={cantidadBoletos[ticket.id] || 1}
                            onChange={(e) => setCantidadBoletos({ ...cantidadBoletos, [ticket.id]: e.target.value })}
                            className="border rounded p-1 w-16"
                          />
                        </div>
                        <button onClick={() => handleCompra(ticket)} className="bg-green-600 text-white p-2 rounded">Comprar Pasaje</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-red-600 text-center mt-4">No se encontraron pasajes.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
