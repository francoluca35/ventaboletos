import React from 'react'
import Link from 'next/link'
import Sideba from '@/app/components/Sideba'
function Inicio() {
  return (
    <div>
       <Sideba />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a la Venta de Pasajes</h1>
        <Link href="/tickets">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Comprar Pasajes
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Inicio
