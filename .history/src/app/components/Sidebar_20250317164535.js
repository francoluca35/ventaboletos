"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes, FaHome, FaTicketAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const router = useRouter();

  // Actualizar la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Formatear la hora
  const formatTime = (date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {  day: "numeric", month: "numeric", year:"numeric" });
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <div>
      {/* Header Fijo */}
      <div className="fixed top-0 left-0 w-full bg-gray-400 text-black shadow-md flex justify-between items-center p-4 z-50">
        {/* Botón de Menú */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-red-600 p-3 rounded-full"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Nombre de Empresa y Hora */}
        <div className="flex items-center space-x-4">
          <span className="text-md font-medium">{formatDate(time)}, {formatTime(time)}</span>
          <span className="font-semibold text-lg">Maurello S.A</span>
        </div>
      </div>

      {/* Sidebar Desplegable */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-300 text-black shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } z-40`}
      >
        {/* Opciones de Navegación */}
        <ul className="mt-20 space-y-4">
          <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
            <button onClick={() => handleNavigation("/")} className="flex items-center gap-2 w-full text-left">
              <FaHome /> Inicio
            </button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
            <button onClick={() => handleNavigation("/ventaboleto")} className="flex items-center gap-2 w-full text-left">
              <FaTicketAlt /> Venta de Boletos
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
