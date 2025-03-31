"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, ChevronDown } from "lucide-react";
import { navItems } from "@/components/data";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Find the current active navigation item
  const currentNavItem = navItems.find(
    (item) =>
      pathname === item.href ||
      (pathname.startsWith(`${item.href}/`) && item.href !== "/Dashboard")
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#EBECED] border-r border-gray-200 hidden md:flex flex-col h-screen">
        <div className="p-6">
          <Link href="/" className="text-blue-700 text-xl font-semibold">
            TravelMate
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(`${item.href}/`) && item.href !== "/Dashboard");
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center p-[12px] space-x-[12px] rounded-[18px] ${
                  isActive ? "bg-[#CCD8E8]" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`${
                    isActive ? "bg-[#023E8A]" : "bg-[#DEDFE1]"
                  } w-8 h-8 rounded-full flex items-center justify-center`}
                >
                  <img src={isActive ? item.iconActive : item.icon} alt="" />
                </div>
                <div
                  className={`${
                    isActive ? "text-[#023E8A]" : "text-[#181818]"
                  } font-[400] text-[16px]`}
                >
                  {item.label}
                </div>
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
      <div className="flex-1 flex flex-col overflow-y-auto lg:bg-[#f5f5f5]">
        <Navbar pageName={currentNavItem?.label || "Unknown Page"} />
        <main className="flex-1 lg:px-[40px] px-6 pb-6 ">{children}</main>
      </div>
    </div>
  );
}

const Navbar = ({ pageName }: { pageName: string }) => {
  return (
    <div className="p-4 md:p-6">
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="hidden lg:block">
          <h1 className="text-[28px] font-[600] text-[#181818]">
            {pageName === "CMS" ? "Content Management System" : pageName}
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-[#f5f5f5] lg:bg-[#fff] p-[8px] rounded-[200px]">
          <div className="relative cursor-pointer">
            <button className="flex items-center gap-2 rounded-full">
              <div>
                <Image
                  src="/assets/images/nav-user.svg"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-[16px] text-[#181818] leading-[100%]">
                  Admin
                </span>
                <ChevronDown className="h-4 w-4 text-[#181818]" />
              </div>
            </button>
          </div>
        </div>

        <div className="flex space-x-3 items-center lg:hidden">
          <div className="w-10 h-10 bg-[#f5f5f5] rounded-full flex justify-center items-center cursor-pointer">
            <img src="/assets/icons/Bell.svg" alt="" />
          </div>
          <div className="w-10 h-10 bg-[#f5f5f5] rounded-full flex justify-center items-center cursor-pointer">
            <img src="/assets/icons/Menu.svg" alt="" />
          </div>
        </div>
      </header>
    </div>
  );
};
