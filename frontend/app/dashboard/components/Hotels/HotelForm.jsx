"use client";

import { useState } from "react";

export default function HotelForm({ onSubmit, defaultValues = {} }) {
  const [formData, setFormData] = useState({
    name: defaultValues.name || "",
    description: defaultValues.description || "",
    address: defaultValues.address || "",
    city: defaultValues.city || "",
    region: defaultValues.region || "",
    country: defaultValues.country || "",
    zipCode: defaultValues.zipCode || "",
    latitude: defaultValues.latitude || "",
    longitude: defaultValues.longitude || "",
    phone: defaultValues.phone || "",
    email: defaultValues.email || "",
    website: defaultValues.website || "",
    amenities: defaultValues.amenities || [],
    images: [],
    mainImage: null,
    checkInTime: defaultValues.checkInTime || "",
    checkOutTime: defaultValues.checkOutTime || "",
    rating: defaultValues.rating || 0,
    reviewsCount: defaultValues.reviewsCount || 0,
    pricePerNightFrom: defaultValues.pricePerNightFrom || 0,
    currency: defaultValues.currency || "MAD",
    isActive: defaultValues.isActive ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (name, index, value) => {
    const updated = [...formData[name]];
    updated[index] = value;
    setFormData({ ...formData, [name]: updated });
  };

  const addAmenity = () =>
    setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, ""] }));

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, mainImage: file }));
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (key === "images") {
        formData.images.forEach((img) => data.append("images", img));
      } else if (key === "mainImage") {
        if (formData.mainImage) data.append("mainImage", formData.mainImage);
      } else if (key === "amenities") {
        formData.amenities.forEach((a) => data.append("amenities[]", a));
      } else {
        data.append(key, formData[key]);
      }
    }

    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-lg w-full"
    >
      {/* Column 1 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Informations générales</h2>
        <input name="name" placeholder="Nom" value={formData.name} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
        <input name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          <input name="city" placeholder="Ville" value={formData.city} onChange={handleChange} className="border px-4 py-2 rounded-lg" />
          <input name="region" placeholder="Région" value={formData.region} onChange={handleChange} className="border px-4 py-2 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="country" placeholder="Pays" value={formData.country} onChange={handleChange} className="border px-4 py-2 rounded-lg" />
          <input name="zipCode" placeholder="Code postal" value={formData.zipCode} onChange={handleChange} className="border px-4 py-2 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} className="border px-4 py-2 rounded-lg" />
          <input name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} className="border px-4 py-2 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} className="border px-4 py-2 rounded-lg" />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border px-4 py-2 rounded-lg" />
        </div>
        <input name="website" placeholder="Site Web" value={formData.website} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} placeholder="Note" className="border px-4 py-2 rounded-lg" />
          <input name="reviewsCount" type="number" value={formData.reviewsCount} onChange={handleChange} placeholder="Avis" className="border px-4 py-2 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="pricePerNightFrom" type="number" value={formData.pricePerNightFrom} onChange={handleChange} placeholder="Prix par nuit" className="border px-4 py-2 rounded-lg" />
          <input name="currency" value={formData.currency} onChange={handleChange} placeholder="Devise" className="border px-4 py-2 rounded-lg" />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <label className="text-sm font-medium">Actif</label>
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
        </div>
      </div>

      {/* Column 2 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Images & Commodités</h2>

        <div>
          <label className="font-medium">Image principale</label>
          <input type="file" accept="image/*" onChange={handleMainImageChange} className="w-full border px-4 py-2 rounded-lg" />
          {formData.mainImage && (
            <p className="text-sm text-gray-600 mt-1">{formData.mainImage.name}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Images supplémentaires</label>
          <input type="file" multiple accept="image/*" onChange={handleImagesUpload} className="w-full border px-4 py-2 rounded-lg" />
          <ul className="text-sm mt-2 list-disc list-inside text-gray-600">
            {formData.images.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <label className="font-medium">Commodités</label>
          {formData.amenities.map((a, i) => (
            <input
              key={i}
              value={a}
              onChange={(e) => handleArrayChange("amenities", i, e.target.value)}
              placeholder={`Commodité ${i + 1}`}
              className="w-full border px-4 py-2 rounded-lg mt-2"
            />
          ))}
          <button type="button" onClick={addAmenity} className="text-blue-600 font-medium mt-2">+ Ajouter une commodité</button>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition">
          Enregistrer l’hôtel
        </button>
      </div>
    </form>
  );
}
