import { Trash, Eye, Pencil } from "lucide-react";

export default function HotelCard({ hotel, onDelete, onEdit, onView }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border">
      <img
        src={hotel.mainImage}
        alt={hotel.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{hotel.name}</h2>
        <p className="text-sm text-gray-500">{hotel.city}, {hotel.country}</p>
        <p className="mt-2 text-gray-700 line-clamp-2">{hotel.description}</p>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onView} className="text-blue-600 hover:underline">
            <Eye size={16} />
          </button>
          <button onClick={onEdit} className="text-yellow-500 hover:underline">
            <Pencil size={16} />
          </button>
          <button onClick={onDelete} className="text-red-600 hover:underline">
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
