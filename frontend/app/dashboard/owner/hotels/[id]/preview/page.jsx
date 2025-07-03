"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useHotelById } from "../../../../api/hotels/hooks";
import Image from "next/image";

export default function HotelViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: hotel, isLoading, isError } = useHotelById(id);

  if (isLoading)
    return (
      <p className="p-6 text-center text-lg text-gray-500 animate-pulse">
        Chargement de l’hôtel...
      </p>
    );
  if (isError || !hotel)
    return (
      <p className="p-6 text-center text-lg text-red-600 font-semibold">
        Erreur : Hôtel introuvable
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header hôtel */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-900">{hotel.name}</h1>
        <p className="text-lg text-gray-700 max-w-3xl">{hotel.description}</p>
        <p className="mt-2 text-sm text-gray-500">
          📍 {hotel.address}, {hotel.city}, {hotel.region}, {hotel.country}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {hotel.amenities?.map((a) => (
            <span
              key={a}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
            >
              {a}
            </span>
          )) || <span className="text-gray-400">Aucune commodité listée</span>}
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <strong>Check-in:</strong> {hotel.checkInTime} &nbsp;|&nbsp;{" "}
          <strong>Check-out:</strong> {hotel.checkOutTime}
        </div>
      </header>

      {/* Images principales */}
      <section>
        <Image
          src={hotel.mainImage}
          alt={`Image principale de ${hotel.name}`}
          width={1200}
          height={500}
          className="rounded-lg object-cover w-full max-h-[500px] shadow-lg"
          priority
        />

        {hotel.images?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {hotel.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Image galerie ${i + 1}`}
                width={300}
                height={200}
                className="rounded-lg object-cover shadow-md hover:scale-105 transition-transform cursor-pointer"
                onClick={() => router.push(img)} // Exemple : tu peux ouvrir en grand
              />
            ))}
          </div>
        )}
      </section>

      {/* Liste des chambres */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-8 border-b pb-3 border-gray-300 max-w-max">
          Chambres disponibles
        </h2>

        {hotel.rooms?.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hotel.rooms.map((room) => (
              <article
                key={room.id}
                className="border rounded-lg shadow-md hover:shadow-xl transition p-5 flex flex-col"
              >
                {/* Galerie mini */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {room.images?.slice(0, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Image chambre ${room.title} ${idx + 1}`}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:brightness-90 transition"
                    />
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{room.title}</h3>
                <p className="text-gray-700 flex-grow">{room.description}</p>

                <ul className="mt-3 space-y-1 text-gray-600 text-sm">
                  <li>
                    <strong>Type :</strong> {room.type}
                  </li>
                  <li>
                    <strong>Prix :</strong> {room.pricePerNight} {room.currency}
                  </li>
                  <li>
                    <strong>Occupation max :</strong> {room.maxOccupancy}{" "}
                    {room.maxOccupancy > 1 ? "personnes" : "personne"}
                  </li>
                  <li>
                    <strong>Lits :</strong> {room.beds} ({room.bedType})
                  </li>
                  <li>
                    <strong>Disponibilité :</strong>{" "}
                    <span
                      className={`font-semibold ${
                        room.isAvailable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {room.isAvailable ? "Disponible" : "Indisponible"}
                    </span>
                  </li>
                  <li>
                    <strong>Commodités :</strong>{" "}
                    {room.amenities?.join(", ") || "Aucune"}
                  </li>
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-12">
            Aucune chambre disponible pour cet hôtel.
          </p>
        )}
      </section>
    </div>
  );
}
