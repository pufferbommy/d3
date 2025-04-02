"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const menus = [
  { label: "View Config", href: "/" },
  { label: "Temperature Log Form", href: "/logs/new" },
  { label: "View Logs", href: "/logs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = href => pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center font-bold text-xl">
              Drone App
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {menus.map(menu => (
                <Link 
                  key={menu.href}
                  href={menu.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(menu.href)
                    ? "bg-blue-500 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {menu.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {menus.map(menu => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(menu.href)
                ? "bg-blue-500 text-white" 
                : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}