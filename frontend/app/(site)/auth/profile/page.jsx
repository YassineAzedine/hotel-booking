"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",

    avatar: "", // url ou base64
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Vous devez être connecté");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:3000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const u = response.data.user;
        setUser(u);
        setForm({
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          email: u.email || "",
        
          avatar: u.avatar || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Erreur lors de la récupération du profil");
        setLoading(false);
      });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Convertit une image en base64 pour simplifier l'upload
  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté");
      setSaving(false);
      return;
    }

    axios
      .put(
        "http://localhost:3000/auth/profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setUser(response.data.user);
        setSuccessMsg("Profil mis à jour avec succès !");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Erreur lors de la mise à jour");
      })
      .finally(() => setSaving(false));
  }

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600 mb-4">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 mt-4 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">
        {form.firstName} {form.lastName}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 bg-gray-100 flex justify-center items-center">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt="Avatar utilisateur"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-16 h-16 text-indigo-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 1.2c-3.1 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.5-4.8-9.6-4.8z"
                />
              </svg>
            )}
          </div>

          <label className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            Changer d'avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-1">
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-1">
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

      
      

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
          {successMsg && <p className="text-green-600">{successMsg}</p>}
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
