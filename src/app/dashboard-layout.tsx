"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  HelpCircle,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "Users", href: "/Dashboard/user" },
    { icon: BookOpen, label: "Bookings", href: "/bookings" },
    { icon: FileText, label: "CMS", href: "/Dashboard/cms" },
    { icon: HelpCircle, label: "Customer Support", href: "/Dashboard/support" },
    { icon: Settings, label: "Report & Analytics", href: "/reports" },
    { icon: Settings, label: "Admin Roles", href: "/admin" },
  ];

  return (
    <div className="flex h-screen lg:bg-gray-100 bg-[#fff]  ">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen">
        <div className="p-6">
          <Link href="/" className="text-blue-700 text-xl font-semibold">
            TravelMate
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg text-sm ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 ${
                    isActive ? "text-blue-700" : "text-gray-500"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center px-4 py-3 text-sm text-red-500 hover:bg-gray-100 rounded-lg w-full">
            <LogOut className="h-5 w-5 mr-3" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-end p-4 md:p-6 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button className="flex items-center gap-2 rounded-full">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="font-medium">Admin</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto lg:p-[40px] px-0  md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
