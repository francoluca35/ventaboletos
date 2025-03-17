'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Sidebar";
import Home from "../page";
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
      <Home/>
      </div>
    </div>
  );
}
