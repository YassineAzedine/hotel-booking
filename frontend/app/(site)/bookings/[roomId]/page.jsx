"use client";
import { useEffect, useState, use , useContext } from "react"; // import use from React
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import api from "@/lib/axios";

import { UserContext } from "@/context/UserContext"; // adapte le chemin

export default function BookingDetailPage({ params }) {
  const router = useRouter();
   const { user, logout  } = useContext(UserContext);
 const fullName = user?.lastName +" "+ user?.firstName
  console.log(user);

  // Unwrap the params promise
  const { roomId } = use(params);
//errors
const [errors, setErrors] = useState({});

  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    arrivalDate: "",
    departureDate: "",
  });

    const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{3,}$/;
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    const today = new Date().toISOString().split("T")[0];

    if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Nom invalide. Minimum 3 lettres, pas de chiffres.";
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide.";
    }

    if (formData.arrivalDate < today) {
      newErrors.arrivalDate = "La date d'arrivée ne peut pas être dans le passé.";
    }

    if (formData.departureDate <= formData.arrivalDate) {
      newErrors.departureDate =
        "La date de départ doit être après la date d'arrivée.";
    }

    return newErrors;
  };

  async function FindRoom() {
    try {
      const res = await api.get(`/rooms/${roomId}`);
      setRoom(res.data);
    } catch (error) {
      console.error("Failed to fetch room:", error);
    }
  }

  useEffect(() => {
    FindRoom();

    setFormData((prev) => ({
      ...prev,
      fullName:fullName ,
    }));
  }, [roomId , user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const { fullName, phone, arrivalDate, departureDate } = formData;
const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  const token = localStorage.getItem("token"); // ou depuis UserContext si tu l’y stockes
  console.log(token);
  
  if (!token) {
    alert("Vous devez être connecté pour réserver.");
    return router.push("/login"); // redirige vers login si pas connecté
  }

  try {
    const response = await api.post(
      "/bookings",
      {
        roomId: parseInt(roomId),
        userId : user.id , 
        fullname: formData.fullName,
        phone: formData.phone,
        startDate: formData.arrivalDate,
        endDate: formData.departureDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      router.push(
        `/bookings/confirmation?room=${roomId}&arrival=${formData.arrivalDate}&departure=${formData.departureDate}&fullName=${encodeURIComponent(
          formData.fullName
        )}&phone=${encodeURIComponent(formData.phone)}`
      );
    }
  } catch (error) {
    console.error("Erreur de réservation :", error.response?.data || error.message);
    alert("Erreur : " + (error.response?.data?.message || "non autorisé"));
  }
};


  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        {/* Left side: Room details + Swiper */}
      <div className="space-y-6 w-full max-w-full">
  <Swiper
    navigation
    modules={[Navigation]}
    spaceBetween={10}
    slidesPerView={1}
    
    className="rounded-2xl overflow-hidden w-full"
  >
    {room.images.map((src, index) => (
      <SwiperSlide key={index}>
        <img
          src={src}
          alt={`Room image ${index + 1}`}
          className="w-full h-72 object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>
  {/* le reste */}
</div>

        {/* Right side: Form */}
        <div className="bg-indigo-50 p-8 rounded-2xl shadow-inner space-y-6">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">
            Réserver cette chambre
          </h3>

         <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-gray-700 mb-1">Nom complet</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:ring-2 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Téléphone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:ring-2 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Date d'arrivée</label>
        <input
          type="date"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:ring-2 ${
            errors.arrivalDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.arrivalDate && (
          <p className="text-sm text-red-500 mt-1">{errors.arrivalDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Date de départ</label>
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:ring-2 ${
            errors.departureDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.departureDate && (
          <p className="text-sm text-red-500 mt-1">{errors.departureDate}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Réserver maintenant
      </button>
    </form>
        </div>
      </div>
    </div>
  );
}
