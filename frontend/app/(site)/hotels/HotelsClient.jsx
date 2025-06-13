"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useTranslation } from 'react-i18next';
export default function HotelsPage({ hotels }) {
    const { t } = useTranslation('common');
  // State pour stocker les ids des hôtels likés
  const [likedHotels, setLikedHotels] = useState([]);

  const toggleLike = (hotelId) => {
    setLikedHotels((prev) =>
      prev.includes(hotelId)
        ? prev.filter((id) => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  return (
    <>
      {/* Hero Header Section */}
      <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              Découvrez les meilleurs hôtels au Maroc
            </h1>
            <p className="text-lg mb-6 opacity-90 max-w-md">
              Trouvez facilement un hébergement parfait, que ce soit un riad traditionnel,
              un hôtel moderne ou une station balnéaire.
            </p>
            <button className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition">
              {t('book_now')}
            </button>
          </div>
          <div className="md:w-1/2 relative h-64 w-full md:h-96 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Morocco travel"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        {/* Overlay gradient at bottom for better transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-indigo-600 to-transparent" />
      </header>

      {/* Main Content */}
      <main className="min-h-screen px-12 py-10 bg-gray-50">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Explore Hotels
        </h1>

        {/* Filters */}
       <div className="mb-10 max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-lg">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
    
    {/* Champ de recherche */}
    <input
      type="text"
      placeholder="Rechercher un hôtel ou une ville..."
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />

    {/* Filtres villes */}
    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
      <option value="">Toutes les villes</option>
      <option value="paris">Paris</option>
      <option value="marrakech">Marrakech</option>
      <option value="casablanca">Casablanca</option>
      <option value="lyon">Lyon</option>
    </select>

    {/* Trier par */}
    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
      <option value="">Trier par</option>
      <option value="price">Prix croissant</option>
      <option value="rating">Note moyenne</option>
    </select>

  </div>
</div>


        {/* Hotels Grid */}
         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {hotels.map((hotel) => {
            const isLiked = likedHotels.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition relative"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={hotel.mainImage}
                    alt={hotel.name}
                    fill
                    className="object-cover rounded-t-xl transition-transform transform hover:scale-105"
                  />
                  {/* Bouton coeur en haut à droite */}
                  <button
                    onClick={() => toggleLike(hotel.id)}
                    aria-label={isLiked ? "Unlike hotel" : "Like hotel"}
                    className="absolute top-3 right-3 text-2xl text-red-500 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition"
                  >
                    {isLiked ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 font-bold">${hotel.price}/night</span>
                    <span className="text-yellow-500 font-medium">⭐ {hotel.rating}</span>
                  </div>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    <Link href={`/hotels/${hotel.id}`}>View Details</Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );


}
  export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
  };