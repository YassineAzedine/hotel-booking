"use client";

import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import BookButton from "@/components/BookButton";
import api from "@/lib/axios";
export default function AllRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [sortKey, setSortKey] = useState("");
  console.log(rooms);
  
useEffect(() => {
  api
    .get("/rooms")
    .then((res) => {
      console.log("API Response:", res.data);
      if (Array.isArray(res.data)) {
        setRooms(res.data);
      } else {
        console.error("Données invalides : ce n'est pas un tableau", res.data);
        setRooms([]); // fail-safe
      }
    })
    .catch((err) => {
      console.error("Erreur lors du chargement des chambres :", err);
      setRooms([]); // fail-safe
    });
}, []);

const filteredRooms = useMemo(() => {
  let filtered = rooms;

  // Appliquer le filtre SEULEMENT si une ville est saisie
  if (searchCity.trim() !== "") {
    filtered = filtered.filter((room) =>
      room?.hotel.city?.toLowerCase().includes(searchCity.toLowerCase())
    );
  }

  // Appliquer le tri
  if (sortKey === "pricePerNight") {
    filtered = filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sortKey === "rating") {
    filtered = filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}, [searchCity, sortKey, rooms]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
          Toutes les Chambres Disponibles
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Filtrer par ville..."
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-1/3"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-1/4"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="">Trier par</option>
            <option value="pricePerNight">Prix (croissant)</option>
            <option value="rating">Note (décroissant)</option>
          </select>
        </div>

      {filteredRooms.length === 0 ? (
  <p className="text-center text-gray-500 text-lg">Aucune chambre trouvée.</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredRooms.map((room) => (
      <div
        key={room.id}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
      >
        <img
          src={room.images[0]}
          alt={`Photo de ${room.title}`}
          className="w-full h-52 object-cover"
        />
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{room.title}</h2>
        <p className="text-indigo-600 font-medium">{room.hotel.name}</p>
          <p className="text-gray-500 text-sm mb-2">📍 {room.hotel.city}</p>
          <p className="text-gray-900 font-semibold text-lg mb-4">
            {room.pricePerNight} € <span className="text-sm font-normal text-gray-500">/ nuit</span>
          </p>

          <div className="mt-auto flex flex-col items-start justify-between gap-2">
  <div
    className="flex items-center gap-1 text-yellow-400"
    aria-label={`Note de la chambre : ${room.rating} sur 5`}
    title={`${room.rating} étoiles sur 5`}
  >
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 fill-current transition-colors duration-300 ${
          i < Math.floor(room.rating) ? "text-yellow-400" : "text-gray-300"
        } hover:text-yellow-500`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.965c.3.92-.755 1.688-1.538 1.118L10 13.347l-3.388 2.462c-.783.57-1.838-.197-1.538-1.118l1.286-3.965a1 1 0 00-.364-1.118L3.608 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
      </svg>
    ))}
  </div>
  <BookButton room={room} />
</div>

        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
}
