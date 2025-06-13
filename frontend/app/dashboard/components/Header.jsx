'use client'

import React from 'react'
import { Bell } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6 fixed left-64 top-0 right-0 z-10">
      <div className="font-semibold text-lg text-gray-800">Dashboard</div>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center">O</div>
      </div>
    </header>
  )
}
