"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  Square2StackIcon,
  BeakerIcon,
  CloudIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  TagIcon,
  TruckIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const navItems = [
  { name: "Ana Sayfa", href: "/", icon: HomeIcon },
  { name: "Kullanıcı Yönetimi", href: "/users", icon: UserGroupIcon },
  { name: "Tarla Yönetimi", href: "/fields", icon: Square2StackIcon },
  { name: "Ürün Yönetimi", href: "/products", icon: BeakerIcon },
  { name: "Gübre Yönetimi", href: "/fertilizers", icon: CloudIcon },
  { name: "Sulama Yönetimi", href: "/irrigation", icon: CloudIcon },
  { name: "Finansal Yönetim", href: "/finance", icon: CurrencyDollarIcon },
  { name: "Raporlama", href: "/reports", icon: ChartBarIcon },
  {
    name: "Envanter Yönetimi",
    href: "/inventory",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Gider Kategori Yönetimi",
    href: "/expense-categories",
    icon: TagIcon,
  },
  { name: "Mazot Harcamaları", href: "/fuel-expenses", icon: TruckIcon },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleNav}
        className={`fixed top-4 z-20 p-2 bg-gray-800 rounded-md text-cyan-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ${
          isOpen ? "left-64 sm:left-64" : "left-4"
        }`}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>
      <nav
        className={`fixed top-0 left-0 h-full bg-gray-800 text-cyan-400 p-4 transform transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } z-10`}
      >
        {isOpen ? (
          <>
            <div className="text-2xl font-bold text-center mb-8 text-cyan-300">
              Çiftçilik Sistemi
            </div>
            <ul>
              {navItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
                      pathname === item.href ? "bg-gray-700" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-6 w-6 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className="mt-16">
            {navItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  href={item.href}
                  className={`flex justify-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
                    pathname === item.href ? "bg-gray-700" : ""
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
