import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} from "./index";

// Récupère tous les hôtels
export const useHotels = () =>
  useQuery({ queryKey: ["hotels"], queryFn: getAllHotels });

// Récupère un hôtel par ID
export const useHotelById = (id) =>
  useQuery({
    queryKey: ["hotels", id],
    queryFn: () => getHotelById(id),
    enabled: !!id,
  });

// Mutation pour créer un hôtel
export const useCreateHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createHotel,
    onSuccess: () => queryClient.invalidateQueries(["hotels"]),
  });
};

// Mutation pour mettre à jour un hôtel
export const useUpdateHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateHotel(id, data),
    onSuccess: () => queryClient.invalidateQueries(["hotels"]),
  });
};

// Supprimer
export const useDeleteHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHotel,
    onSuccess: () => queryClient.invalidateQueries(["hotels"]),
  });
};
