import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function AddUser() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <Link href="/users" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Geri Dön
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Yeni Kullanıcı Ekle</h1>

      <form className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow">
        <div className="mb-6">
          <label htmlFor="name" className="block text-cyan-300 mb-2">
            İsim
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-cyan-300 mb-2">
            E-posta
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="role" className="block text-cyan-300 mb-2">
            Rol
          </label>
          <select
            id="role"
            name="role"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="admin">Admin</option>
            <option value="owner">Sahip</option>
            <option value="worker">İşçi</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-cyan-300 mb-2">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white rounded px-4 py-2 hover:bg-cyan-700 transition-colors duration-300"
        >
          Kullanıcı Ekle
        </button>
      </form>
    </div>
  )
}

