import api from "@/lib/axios";

// GET tous les hôtels
export const getAllHotels = async () => {
  const res = await api.get("/hotels");

  
  return res.data;
};

// POST : créer un hôtel
export const createHotel = async (hotelData) => {
  const res = await api.post("/hotels", hotelData);
  return res.data;
};

// PUT : modifier un hôtel
export const updateHotel = async ({ id, data }) => {
  const res = await api.put(`/hotels/${id}`, data);
  return res.data;
};

// DELETE : supprimer un hôtel
export const deleteHotel = async (id) => {
  const res = await api.delete(`/hotels/${id}`);
  return res.data;
};
export const getHotelById = async (id) => {
  console.log("id>>>>>>>>>>>>>", id);
  
  const res = await api.get(`/hotels/${id}`);
  return res.data;
};