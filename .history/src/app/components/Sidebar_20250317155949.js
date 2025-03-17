'use client'

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Importamos useRouter
import { FaBars, FaTimes, FaHome, FaTicketAlt } from "react-icons/fa"; // ✅ Import correcto

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); 


  const handleNavigation = (path) => {
    setIsOpen(false); // ✅ Cierra el sidebar al hacer clic
    router.push(path); // ✅ Redirige a la ruta sin recargar la página
  };

  
  const handleLinkClick = (href, isRoute) => {
    setActiveLink(href);
    if (isRoute) {
      router.push(href); 
    } else {
      window.location.href = href; 
    }
  };


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
            <button onClick={() => handleNavigation("/")} className="flex items-center gap-2 w-full text-left">
              <FaHome /> Inicio
            </button>
          </li>
          <li className="px-4 py-2 hover:bg-blue-700">
            <button onClick={() => router.push("/VentaBoleto")} className="flex items-center gap-2 w-full text-left">
              <FaTicketAlt /> Comprar Pasajes
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
