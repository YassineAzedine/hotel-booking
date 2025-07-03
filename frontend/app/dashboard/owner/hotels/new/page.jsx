"use client";

import HotelForm from "../../../components/Hotels/HotelForm";
import { useCreateHotel } from "../../../api/hotels/hooks";
import { useRouter } from "next/navigation";

export default function CreateHotelPage() {
  const router = useRouter();
  const createHotel = useCreateHotel();

  const onSubmit = async (data) => {
    try {
      await createHotel.mutateAsync(data);
      router.push("/dashboard/hotels");
    } catch (error) {
      alert("Erreur lors de la création de l'hôtel");
    }
  };

  return (
    <div className="p-6 max-w-1xl mx-auto bg-gray-500">
      <h1 className="text-3xl font-bold mb-6">Ajouter un nouvel hôtel</h1>
      <HotelForm onSubmit={onSubmit} />
    </div>
  );
}
