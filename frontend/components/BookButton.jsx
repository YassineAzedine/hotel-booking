"use client";
import React  ,{useContext}from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ router hook
import { UserContext } from "../context/UserContext";

export default function BookButton({ room }) {
  const isLoggedIn = true; // Replace with your auth logic
  const router = useRouter();
  const { user, logout } = useContext(UserContext);
  function handleClick() {
    if (user) {
      // Redirect to booking page with room ID or slug
      router.push(`/bookings/${room.id}`);
    } else {
      router.push(`/auth/login?redirect=/bookings/${room.id}`);
    }
  }

  return (
  <button 
  aria-label={`Réserver la chambre ${room.title}`}
  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition w-full mt-auto flex items-center justify-center gap-2 cursor-pointer"
  onClick={handleClick}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10m-10 4h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
    />
  </svg>
  Réserver cette chambre
</button>

  );
}
