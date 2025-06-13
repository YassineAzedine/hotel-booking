'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PaymentPage({ params }) {
  const { roomId } = params;
  const searchParams = useSearchParams();

  const arrivalDate = searchParams.get('arrival');
  const departureDate = searchParams.get('departure');

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleChange = (e) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Paiement effectué avec succès pour la chambre ${roomId} du ${arrivalDate} au ${departureDate}`);
    // Tu peux ici envoyer vers une API ou router.push('/confirmation')
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Paiement de la réservation</h1>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Récapitulatif</h2>
        <p><strong>Chambre :</strong> {roomId}</p>
        <p><strong>Date d'arrivée :</strong> {arrivalDate}</p>
        <p><strong>Date de départ :</strong> {departureDate}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Numéro de carte
          <input
            type="text"
            name="cardNumber"
            required
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            className="mt-1 w-full border p-2 rounded"
            placeholder="1234 5678 9012 3456"
          />
        </label>

        <div className="flex gap-4">
          <label className="block flex-1">
            Expiration
            <input
              type="text"
              name="expiry"
              required
              value={paymentInfo.expiry}
              onChange={handleChange}
              className="mt-1 w-full border p-2 rounded"
              placeholder="MM/AA"
            />
          </label>
          <label className="block flex-1">
            CVC
            <input
              type="text"
              name="cvc"
              required
              value={paymentInfo.cvc}
              onChange={handleChange}
              className="mt-1 w-full border p-2 rounded"
              placeholder="123"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Payer maintenant
        </button>
      </form>
    </div>
  );
}
