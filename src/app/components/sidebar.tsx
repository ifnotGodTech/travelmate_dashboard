"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { LayoutDashboard, Users, BookOpen, FileText, HelpCircle, Settings, LogOut } from "lucide-react"

const Sidebar: React.FC = () => {
  const router = useRouter()

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: BookOpen, label: "Bookings", href: "/bookings" },
    { icon: FileText, label: "CMS", href: "/cms" },
    { icon: HelpCircle, label: "Customer Support", href: "/support" },
    { icon: Settings, label: "Report & Analytics", href: "/reports" },
    { icon: Settings, label: "Admin Roles", href: "/admin" },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen">
      <div className="p-6">
        <Link href="/" className="text-blue-700 text-xl font-semibold">
          TravelMate
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href || (item.href !== "/" && router.pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg text-sm ${
                isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${isActive ? "text-blue-700" : "text-gray-500"}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center px-4 py-3 text-sm text-red-500 hover:bg-gray-100 rounded-lg w-full">
          <LogOut className="h-5 w-5 mr-3" />
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar

