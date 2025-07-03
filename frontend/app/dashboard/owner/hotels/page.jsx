"use client";

import { useHotels, useDeleteHotel } from "../../api/hotels/hooks";
import HotelCard from "../../components/Hotels/HotelCard";
import { useRouter } from "next/navigation";

export default function HotelsPage() {
  const router = useRouter();
  const { data: hotels, isLoading, isError } = useHotels();
  const deleteHotelMutation = useDeleteHotel();

  const handleDelete = (id) => {
    if (confirm("Supprimer cet hôtel ?")) {
      deleteHotelMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement des hôtels.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Liste des Hôtels</h1>
        <button
          onClick={() => router.push("/dashboard/owner/hotels/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter un hôtel
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onDelete={() => handleDelete(hotel.id)}
            onEdit={() => router.push(`/dashboard/owner/hotels/${hotel.id}/edit`)}
            onView={() => router.push(`/dashboard/owner/hotels/${hotel.id}/preview`)}
          />
        ))}
      </div>
    </div>
  );
}
