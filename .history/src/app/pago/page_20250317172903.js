"use client";

import { useSearchParams } from "next/navigation";

export default function Pago() {
  const searchParams = useSearchParams();
  const origen = searchParams.get("origen");
  const destino = searchParams.get("destino");
  const horario = searchParams.get("horario"); // ✅ Se corrige el nombre del parámetro
  const hora = searchParams.get("hora"); // ✅ Ahora obtenemos la hora correctamente
  const precio = searchParams.get("precio");
  const cantidad = searchParams.get("cantidad");

  const total = precio * cantidad;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Detalles del Pasaje</h2>
      <p><strong>Origen:</strong> {origen}</p>
      <p><strong>Destino:</strong> {destino}</p>
      <p><strong>Turno:</strong> {horario}</p>  {/* ✅ Ahora se llama "horario" en ambos archivos */}
      <p><strong>Horario:</strong> {hora}</p>  {/* ✅ Se muestra correctamente la hora */}
      <p><strong>Precio por boleto:</strong> ${precio}</p>
      <p><strong>Cantidad:</strong> {cantidad}</p>
      <p><strong>Total a Pagar:</strong> ${total}</p>

      <button className="bg-blue-500 text-white p-3 rounded mt-4 w-full">
        Pagar con Mercado Pago
      </button>
    </div>
  );
}
