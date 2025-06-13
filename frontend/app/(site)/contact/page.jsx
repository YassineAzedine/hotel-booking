"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    )
      newErrors.email = "Email invalide";
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    else if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.phone))
      newErrors.phone = "Numéro de téléphone invalide";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // Ici tu peux envoyer le formData à ton backend / API
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      setErrors(formErrors);
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">
          Contactez-Nous
        </h1>
        {submitted && (
          <div className="bg-green-100 text-green-800 p-4 mb-6 rounded-md text-center font-semibold">
            Merci pour votre message, nous vous répondrons rapidement !
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom complet
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Votre nom complet"
            />
            {errors.fullName && (
              <p className="mt-1 text-red-600 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="exemple@domaine.com"
            />
            {errors.email && (
              <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Numéro de téléphone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="+33 6 12 34 56 78"
            />
            {errors.phone && (
              <p className="mt-1 text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Votre message ici..."
            />
            {errors.message && (
              <p className="mt-1 text-red-600 text-sm">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
