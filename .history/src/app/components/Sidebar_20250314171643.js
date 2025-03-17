'use client'
"use client"; // Importante si usas App Router

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaTicketAlt } from "react-icons/fa"; // ✅ Import correcto

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Botón para abrir/cerrar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 text-white bg-blue-600 p-2 rounded-full"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <h2 className="text-xl font-bold p-4">Venta de Pasajes</h2>
        <ul className="mt-4 space-y-4">
          <li className="px-4 py-2 hover:bg-blue-700">
            <Link href="/" className="flex items-center gap-2">
              <FaHome /> Inicio
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-700">
            <Link href="/tickets" className="flex items-center gap-2">
              <FaTicketAlt /> Comprar Pasajes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
