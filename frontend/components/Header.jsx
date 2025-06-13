"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { UserContext } from "../context/UserContext"; // adapte le chemin

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    setMenuOpen(false);

    router.push("/");
  };

  const userName = user?.lastName || user?.name || "User";

  return (
    <header className="bg-gray-900 text-gray-300 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-500 hover:text-indigo-400"
        >
         MarocBooking

        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link href="/hotels" className="hover:text-indigo-400 transition">
            Hotels
          </Link>
          <Link href="/rooms" className="hover:text-indigo-400 transition">
            Rooms
          </Link>
          <Link href="/contact" className="hover:text-indigo-400 transition">
            Contact
          </Link>
        </nav>

        {/* Desktop user section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link
                href="/bookings"
                className="hover:text-indigo-400 transition"
              >
                Booking
              </Link>
              <Link
                href="/auth/profile"
                className="flex items-center hover:text-indigo-400 transition"
              >
                <FaUserCircle className="text-xl mr-1" />
                {userName}
              </Link>
              <button
                onClick={handleSignOut}
                className="hover:text-red-500 transition bg-transparent border-none cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center hover:text-indigo-400 transition"
            >
              <FaUserCircle className="text-xl mr-1" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-indigo-400 transition"
          >
            Home
          </Link>
          <Link
            href="/hotels"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-indigo-400 transition"
          >
            Hotels
          </Link>
          <Link
            href="/rooms"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-indigo-400 transition"
          >
            Rooms
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-indigo-400 transition"
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                href="/bookings"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-indigo-400 transition"
              >
                Booking
              </Link>
              <Link
                href="/auth/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2 hover:text-indigo-400 transition"
              >
                <FaUserCircle className="text-xl" />
                <span>{userName}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left hover:text-red-500 transition bg-transparent border-none cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="block flex items-center hover:text-indigo-400 transition"
            >
              <FaUserCircle className="text-xl mr-1" />
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
