"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
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
  {
    name: "Tarla Yönetimi",
    href: "/farmland-management",
    icon: Square2StackIcon,
  }, // Updated this line
  { name: "Ürün Yönetimi", href: "/products", icon: BeakerIcon },
  { name: "Gübre Yönetimi", href: "/fertilizers", icon: CloudIcon },
  { name: "Sulama Yönetimi", href: "/irrigation", icon: CloudIcon },
  { name: "Finansal Yönetim", href: "/finance", icon: CurrencyDollarIcon },
  {
    name: "Tarla Masrafları",
    href: "/farmland/expenses",
    icon: CurrencyDollarIcon,
  },
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
  const { data: session, status } = useSession();

  const toggleNav = () => setIsOpen(!isOpen);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return (
      <div className="fixed top-4 right-4 z-20 flex space-x-4">
        <Link
          href="/auth/signin"
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          Giriş Yap
        </Link>
        <Link
          href="/auth/signup"
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
        >
          Kayıt Ol
        </Link>
      </div>
    );
  }

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
        {session && (
          <button
            onClick={() => signOut()}
            className="absolute bottom-4 left-0 right-0 text-center text-cyan-400 hover:text-cyan-300"
          >
            Çıkış Yap
          </button>
        )}
      </nav>
    </>
  );
}
