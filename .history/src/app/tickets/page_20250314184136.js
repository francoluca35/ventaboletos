'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Sidebar";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets")
      .then(response => setTickets(response.data))
      .catch(error => console.error("Error al obtener los tickets:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Lista de Pasajes Disponibles</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map(ticket => (
            <li key={ticket.id} className="border p-4 rounded-lg shadow-md">
              <p><strong>Destino:</strong> {ticket.destino}</p>
              <p><strong>Precio:</strong> ${ticket.precio}</p>
              <button className="bg-green-600 text-white px-3 py-1 mt-2 rounded-md">
                Comprar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
