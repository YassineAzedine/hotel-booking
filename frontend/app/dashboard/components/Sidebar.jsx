'use client'
import React from 'react'
import Link from 'next/link'
import { Home, Users, Settings } from 'lucide-react'
import { useUser } from '@/context/UserContext'

const allMenuItems = [
  { name: 'Dashboard', href: '/dashboard/owner', roles: ['owner'], icon: <Home size={20} /> },
  { name: 'Dashboard', href: '/dashboard/admin', roles: ['admin'], icon: <Home size={20} /> },
  { name: 'Hotels', href: '/dashboard/owner/hotels', roles: ['owner'], icon: <Users size={20} /> },
  { name: 'Rooms', href: '/dashboard/owner/rooms', roles: ['owner'], icon: <Users size={20} /> },
  { name: 'User Management', href: '/dashboard/admin/users', roles: ['admin'], icon: <Users size={20} /> },
  { name: 'Settings', href: '/dashboard/settings', roles: ['admin', 'owner'], icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const { user } = useUser()
 console.log(user);
 
  if (!user) return null // ou un loader/spinner

  const menuItems = allMenuItems.filter(item => item.roles.includes(user.role))

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-6 font-bold text-xl">
        {user.role === 'admin' ? 'Admin Panel' : 'Owner Panel'}
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.name}>
              <Link href={item.href} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
