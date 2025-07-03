"use client";

import React, { useState } from "react";

export default function RoomForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    roomNumber: "",
    type: "",
    beds: 1,
    bedType: "",
    pricePerNight: 0,
    currency: "MAD",
    maxOccupancy: 1,
    isAvailable: true,
    amenities: [],
    mainImage: null,
    images: [],
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, mainImage: file }));
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const addAmenity = () =>
    setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, ""] }));

  const handleAmenityChange = (index, value) => {
    const updated = [...formData.amenities];
    updated[index] = value;
    setFormData({ ...formData, amenities: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ici tu peux préparer un FormData si tu envoies des fichiers à une API
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow rounded"
    >
      {/* Colonne gauche - Données principales */}
      <div className="space-y-4">
        <input
          name="title"
          placeholder="Titre"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="roomNumber"
            placeholder="Numéro"
            value={formData.roomNumber}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        <select
  name="type"
  value={formData.type}
  onChange={handleChange}
  className="w-full border px-3 py-2 rounded"
>
  <option value="">-- Sélectionner un type --</option>
  <option value="single">Simple</option>
  <option value="double">Double</option>
  <option value="twin">Twin (2 lits)</option>
  <option value="triple">Triple</option>
  <option value="quad">Quadruple</option>
  <option value="queen">Queen</option>
  <option value="king">King</option>
  <option value="suite">Suite</option>
  <option value="studio">Studio</option>
  <option value="apartment">Appartement</option>
  <option value="family">Familiale</option>
  <option value="connecting">Communicantes</option>
  <option value="accessible">Accessible (PMR)</option>
  <option value="deluxe">Deluxe</option>
  <option value="executive">Executive</option>
  <option value="presidential">Présidentielle</option>
</select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="beds"
            type="number"
            placeholder="Lits"
            value={formData.beds}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            name="bedType"
            placeholder="Type de lit"
            value={formData.bedType}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="pricePerNight"
            type="number"
            placeholder="Prix/nuit"
            value={formData.pricePerNight}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            placeholder="Devise"
            className="border px-3 py-2 rounded"
          />
        </div>

        <input
          name="maxOccupancy"
          type="number"
          placeholder="Max personnes"
          value={formData.maxOccupancy}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
          />
          <label>Disponible</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded w-full"
        >
          Enregistrer
        </button>
      </div>

      {/* Colonne droite - Images + commodités */}
      <div className="space-y-6">
        <div>
          <label className="font-medium">Image principale</label>
          <input type="file" accept="image/*" onChange={handleMainImageUpload} />
          {mainImagePreview && (
            <img
              src={mainImagePreview}
              alt="preview"
              className="mt-2 h-40 w-full object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="font-medium">Galerie</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
          />
          <div className="grid grid-cols-3 gap-2 mt-2">
            {imagePreviews.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`preview-${i}`}
                className="h-24 w-full object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="font-medium">Commodités</label>
          {formData.amenities.map((item, i) => (
            <input
              key={i}
              value={item}
              onChange={(e) => handleAmenityChange(i, e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          ))}
          <button
            type="button"
            onClick={addAmenity}
            className="text-blue-500 mt-2"
          >
            + Ajouter une commodité
          </button>
        </div>
      </div>
    </form>
  );
}
