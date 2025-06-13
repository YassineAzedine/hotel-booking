'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function ConfirmationPage() {
  const searchParams = useSearchParams();
  const room = searchParams.get('room');
  const arrival = searchParams.get('arrival');
  const departure = searchParams.get('departure');
  const fullName = searchParams.get('fullName');
  const phone = searchParams.get('phone');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl max-w-xl w-full p-10 space-y-6 border border-indigo-100">
        <div className="text-center space-y-2">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
          <h1 className="text-3xl font-extrabold text-indigo-700">
            Réservation Confirmée
          </h1>
          <p className="text-gray-600">
            Merci {fullName || 'Client'} pour votre réservation. Voici les détails :
          </p>
        </div>

        <div className="bg-indigo-50 rounded-xl p-6 space-y-3 text-sm text-gray-800">
          <p><span className="font-semibold">🛏 Chambre :</span> {room || 'Non spécifiée'}</p>
          <p><span className="font-semibold">📅 Arrivée :</span> {arrival || 'Non spécifiée'}</p>
          <p><span className="font-semibold">📅 Départ :</span> {departure || 'Non spécifiée'}</p>
          <p><span className="font-semibold">👤 Nom complet :</span> {fullName || 'Non spécifié'}</p>
          <p><span className="font-semibold">📞 Téléphone :</span> {phone || 'Non spécifié'}</p>
        </div>

        <div className="text-center">
          <Link href="/">
            <button className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md">
              Retour à l’accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
