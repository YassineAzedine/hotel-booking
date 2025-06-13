'use client';

import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation , Pagination} from 'swiper/modules';
import { useRouter } from "next/navigation"; 

import {fetchHotelById} from '@/lib/api';
import BookButton from '@/components/BookButton';

// FilterPanel Component
const FilterPanel = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedType,
  setSelectedType,
  minBeds,
  setMinBeds,
}) => (
  <div className="bg-white rounded-xl shadow-md p-6 space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
    {/* Prix min */}
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">Prix minimum</label>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ex : 50"
        min={0}
      />
    </div>

    {/* Prix max */}
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">Prix maximum</label>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ex : 300"
        min={0}
      />
    </div>

    {/* Type de chambre */}
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">Type de chambre</label>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Tous les types</option>
        <option value="Simple">Simple</option>
        <option value="Double">Double</option>
        <option value="Deluxe">Deluxe</option>
        <option value="Familiale">Familiale</option>
      </select>
    </div>

    {/* Lits minimum */}
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">Lits minimum</label>
      <input
        type="number"
        value={minBeds}
        onChange={(e) => setMinBeds(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ex : 2"
        min={0}
      />
    </div>
  </div>
);


// HotelPage Component
const HotelPage =  ({ hotel }) => {
   


    const RoomCard = ({ room }) => (
  <div className="relative border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white h-full flex flex-col hover:scale-[1.02] hover:z-10">
    {/* Badge type */}
    <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
      {room.type}
    </div>

    {/* Swiper images */}
    <div className="w-full overflow-hidden rounded-t-xl aspect-w-16 aspect-h-9">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="h-full"
      >
        {room.images?.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <img
              src={imgUrl}
              alt={`Image ${index + 1} de ${room.title}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Contenu */}
    <div className="p-5 flex flex-col flex-1 space-y-4">
      <h3 className="text-xl font-semibold text-indigo-800">{room.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{room.description}</p>

      <div className="text-sm text-gray-500">Lits : {room.beds}</div>
      <div className="font-bold text-indigo-700 text-lg">${room.pricePerNight} / nuit</div>

    <BookButton room={room} />
    </div>
  </div>
);
  function handleClick() {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      router.push("/login");
    }
  }
    
      const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();


//   const hotel = {
//     id:1,
//     name: 'Grand Hotel',
//     location: 'Paris, France',
//     lat: 48.858844,
//     lng: 2.294351,
//     rating: 4.5,
//     image: 'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     description: 'Un hôtel de luxe au cœur de Paris, avec vue sur la Tour Eiffel.',
//     services: ['Wi-Fi gratuit', 'Piscine', 'Spa', 'Restaurant'],
//     price: 250,
//     images : [
//         'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         'https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=800&q=80',
//         'https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=800&q=80'
//     ]
//   };

const allRooms = [
  {
    id: 1,
    title: 'Chambre Simple',
    description: 'Parfaite pour une personne seule.',
    price: 100,
    type: 'Simple',
    beds: 1,
    amenities: ['Wi-Fi'],
    images: [
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 2,
    title: 'Chambre Double',
    description: 'Idéale pour un couple.',
    price: 180,
    type: 'Double',
    beds: 2,
    amenities: ['Wi-Fi', 'TV'],
     images: [
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 3,
    title: 'Suite Deluxe',
    description: 'Luxe et confort avec vue.',
    price: 300,
    type: 'Deluxe',
    beds: 3,
    amenities: ['Wi-Fi', 'TV', 'Mini-bar'],
   images: [
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: 4,
    title: 'Chambre Familiale',
    description: 'Spacieuse pour une famille.',
    price: 220,
    type: 'Familiale',
    beds: 4,
    amenities: ['Wi-Fi', 'TV'],
     images: [
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1657349226767-66c983d7df39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
];


  // Filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedType, setSelectedType] = useState('');
  const [minBeds, setMinBeds] = useState(0);

  // Memoized Filtering
  const filteredRooms = useMemo(() => {
    return hotel.rooms.filter((room) =>
      room.pricePerNight >= minPrice &&
      room.pricePerNight <= maxPrice &&
      (selectedType === '' || room.type === selectedType) &&
      room.maxOccupancy >= minBeds
    );
  }, [minPrice, maxPrice, selectedType, minBeds]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-10">
      {/* Header */}
      <header >
        <h1 className="text-6xl font-bold ">{hotel.name}</h1>
        <p className="text-gray-600">{hotel.location}</p>
        <div className="text-yellow-500 text-lg">⭐ {hotel.rating}</div>
      </header>

      {/* Image & Map */}
     <section className="grid grid-cols-12 gap-6">
  {/* Carousel d'images */}
  <div className="col-span-12 md:col-span-8 h-96 rounded-lg overflow-hidden">
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
         pagination={{
          type: 'fraction',
        }}
      modules={[Navigation , Pagination]}
       
      className="h-full rounded-lg mySwiper"

    >
      {(hotel.images || [hotel.image]).map((img, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={img}
            alt={`Image ${idx + 1} de ${hotel.name}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Carte Google Maps */}
  <div className="col-span-12 md:col-span-4 h-96 rounded-lg overflow-hidden">
    <iframe
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA7kAa0yyIcaEmkm_6ZFhkI-LDpnRNSJLE&q=${hotel.lat},${hotel.lng}`}
      title="Localisation de l'hôtel"
    ></iframe>
  </div>
</section>


      {/* Description */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{hotel.description}</p>
      </section>

      {/* Services */}
    <section>
  <h2 className="text-xl font-semibold mb-2">Services</h2>
  {hotel?.amenities?.length > 0 ? (
    <ul className="flex flex-wrap gap-3">
      {hotel.amenities.map((service) => (
        <li key={service} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">{service}</li>
      ))}
    </ul>
  ) : (
    <p>No services available</p>
  )}
</section>

      {/* Filtres */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Filtres</h2>
        <FilterPanel
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          minBeds={minBeds}
          setMinBeds={setMinBeds}
        />
      </section>

      {/* Chambres disponibles */}
     <section>
  <h2 className="text-2xl font-bold mb-4">Chambres disponibles</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {filteredRooms.length > 0 ? (
      filteredRooms.map((room) => <RoomCard key={room.id} room={room} />)
    ) : (
      <p>Aucune chambre disponible selon les critères sélectionnés.</p>
    )}
  </div>
</section>

    </div>
    
  );
  
};

export default HotelPage;
