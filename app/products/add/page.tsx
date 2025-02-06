import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function AddProduct() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <Link href="/products" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Geri Dön
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Yeni Ürün Ekle</h1>

      <form className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow">
        <div className="mb-6">
          <label htmlFor="name" className="block text-cyan-300 mb-2">
            Ürün Adı
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="type" className="block text-cyan-300 mb-2">
            Tür
          </label>
          <input
            type="text"
            id="type"
            name="type"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="plantingSeason" className="block text-cyan-300 mb-2">
            Ekim Mevsimi
          </label>
          <select
            id="plantingSeason"
            name="plantingSeason"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="İlkbahar">İlkbahar</option>
            <option value="Yaz">Yaz</option>
            <option value="Sonbahar">Sonbahar</option>
            <option value="Kış">Kış</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="harvestSeason" className="block text-cyan-300 mb-2">
            Hasat Mevsimi
          </label>
          <select
            id="harvestSeason"
            name="harvestSeason"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="İlkbahar">İlkbahar</option>
            <option value="Yaz">Yaz</option>
            <option value="Sonbahar">Sonbahar</option>
            <option value="Kış">Kış</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white rounded px-4 py-2 hover:bg-cyan-700 transition-colors duration-300"
        >
          Ürün Ekle
        </button>
      </form>
    </div>
  )
}

