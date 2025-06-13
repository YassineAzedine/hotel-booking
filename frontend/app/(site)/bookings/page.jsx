"use client";
import api from "@/lib/axios";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  useEffect(() => {
   
async function fetchBookings() {
  try {
    const token = localStorage.getItem("token");

    console.log("token:", token);

    if (!token) {
      console.warn("No token found, user not authenticated");
      setBookings([]);
      return;
    }

    const response = await api.get("/bookings/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data; // ✅ Axios retourne la data directement ici
    console.log("data:", data);

    const adaptedBookings = data.map((b) => ({
      id: b.id,
      room: b.room?.title || "Chambre inconnue",
      arrivalDate: new Date(b.startDate).toISOString().split("T")[0],
      departureDate: new Date(b.endDate).toISOString().split("T")[0],
      status:
        b.status === "confirmed"
          ? "Confirmée"
          : b.status === "cancelled"
          ? "Annulée"
          : b.status,
    }));

    setBookings(adaptedBookings);
  } catch (error) {
    console.error("Erreur lors du fetch des réservations :", error);
    setBookings([]);
  }
}

    fetchBookings();
  }, []);

  // Filtrer les bookings selon le filtre choisi
  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status.toLowerCase() === filter.toLowerCase());

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
console.log(currentBookings);

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-200 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Mes Réservations</h1>

        {/* Filtres */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-100 text-indigo-700"
            } transition`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter("Confirmée")}
            className={`px-4 py-2 rounded ${
              filter === "Confirmée"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700"
            } transition`}
          >
            Confirmées
          </button>
          <button
            onClick={() => setFilter("Annulée")}
            className={`px-4 py-2 rounded ${
              filter === "Annulée"
                ? "bg-red-600 text-white"
                : "bg-red-100 text-red-700"
            } transition`}
          >
            Annulées
          </button>
        </div>

        {/* Liste des réservations */}
        {currentBookings.length === 0 ? (
          <p className="text-gray-600 text-center">Aucune réservation trouvée.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {currentBookings.map((booking) => (
              <li
                key={booking.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between py-4"
              >
                <div>
                  <h2 className="text-xl font-semibold text-indigo-900">{booking.room}</h2>
                  <p className="text-gray-600">
                    Du <strong>{booking.arrivalDate}</strong> au <strong>{booking.departureDate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === "Confirmée"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>

                  {booking.status === "pending"  && (
                 <button
  onClick={() => {
    confirmAlert({
      title: 'Confirmation',
      message: `Voulez-vous annuler la réservation pour ${booking.room} ?`,
      buttons: [
        {
          label: 'Oui',
        onClick: () => {
  api.patch(`/bookings/${booking.id}/cancel`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then(() => {
    toast.success("Réservation annulée avec succès ✅");
    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id ? { ...b, status: "Annulée" } : b
      )
    );
  })
  .catch((err) => {
    toast.error("Erreur : " + (err.response?.data?.message || err.message));
  });
}
        },
        {
          label: 'Non',
          onClick: () => {
            toast.info("Annulation annulée.");
          }
        }
      ]
    });
  }}
  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
>
  Annuler
</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-indigo-500 text-indigo-600 disabled:opacity-50"
            >
              Précédent
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "border-indigo-500 text-indigo-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-indigo-500 text-indigo-600 disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
