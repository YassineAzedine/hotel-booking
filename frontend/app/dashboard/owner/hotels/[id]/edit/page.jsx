"use client";

import { useRouter, useParams } from "next/navigation";
import HotelForm from "../../../../components/Hotels/HotelForm";
import { useHotelById, useUpdateHotel } from "../../../../api/hotels/hooks";

export default function EditHotelPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { data: hotel, isLoading, isError } = useHotelById(id);
  const updateHotel = useUpdateHotel();

  const handleUpdate = async (data) => {
    try {
      await updateHotel.mutateAsync({ id, data });
      router.push("/dashboard/hotels");
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement de l'hôtel</p>;

  return (
    <div className="p-6 max-w-1xl mx-auto bg-gray-500">
      <h1 className="text-3xl font-bold mb-6">Modifier l'hôtel</h1>
      <HotelForm onSubmit={handleUpdate} defaultValues={hotel} />
    </div>
  );
}
