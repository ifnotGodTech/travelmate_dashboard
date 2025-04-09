"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, ChevronDown, X } from "lucide-react";
import { navItems } from "@/components/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentNavItem = navItems.find(
    (item) =>
      pathname === item.href ||
      (pathname.startsWith(`${item.href}/`) && item.href !== "/Dashboard")
  );

  const handleLinkClick = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar - hidden on mobile */}
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
              (pathname.startsWith(`${item.href}/`) &&
                item.href !== "/Dashboard");
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

      {/* Mobile Sidebar - right positioned */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          
          {/* Sidebar container */}
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-[#EBECED] shadow-lg flex flex-col">
            {/* Close button at the top right */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            
            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto px-4">
              <div className="mb-6 px-2">
                <Link 
                  href="/" 
                  className="text-blue-700 text-xl font-semibold"
                  onClick={handleLinkClick}
                >
                  TravelMate
                </Link>
              </div>
              
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (pathname.startsWith(`${item.href}/`) &&
                      item.href !== "/Dashboard");
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center p-3 space-x-3 rounded-xl ${
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
                        } font-medium text-base`}
                      >
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button className="flex items-center justify-center w-full px-4 py-3 text-sm text-red-500 hover:bg-gray-100 rounded-lg">
                <LogOut className="h-5 w-5 mr-3" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto lg:bg-[#f5f5f5]">
        <Navbar 
          pageName={currentNavItem?.label || "Unknown Page"} 
          onMenuClick={() => setMobileSidebarOpen(true)} 
        />
        <main className="flex-1 lg:px-[40px] px-6 pb-6">{children}</main>
      </div>
    </div>
  );
}

interface NavbarProps {
  pageName: string;
  onMenuClick: () => void;
}

const Navbar = ({ pageName, onMenuClick }: NavbarProps) => {
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full w-[140px]">
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
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)]"
              >
                <DropdownMenuItem className="w-full text-center px-[2px] py-2 hover:bg-gray-200">
                  Support Agent
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full text-center px-[2px] py-2 hover:bg-gray-200">
                  Contact Manager
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex space-x-3 items-center lg:hidden">
          <div className="w-10 h-10 bg-[#f5f5f5] rounded-full flex justify-center items-center cursor-pointer">
            <img src="/assets/icons/Bell.svg" alt="" />
          </div>
          <div 
            className="w-10 h-10 bg-[#f5f5f5] rounded-full flex justify-center items-center cursor-pointer"
            onClick={onMenuClick}
          >
            <img src="/assets/icons/Menu.svg" alt="Menu" />
          </div>
        </div>
      </header>
    </div>
  );
};