import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function AddField() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <Link href="/fields" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Geri Dön
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Yeni Tarla Ekle</h1>

      <form className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow">
        <div className="mb-6">
          <label htmlFor="name" className="block text-cyan-300 mb-2">
            Tarla Adı
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="size" className="block text-cyan-300 mb-2">
            Boyut
          </label>
          <div className="flex">
            <input
              type="number"
              id="size"
              name="size"
              className="w-2/3 bg-gray-700 text-white rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <select
              id="unit"
              name="unit"
              className="w-1/3 bg-gray-700 text-white rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Dönüm">Dönüm</option>
              <option value="Hektar">Hektar</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="crop" className="block text-cyan-300 mb-2">
            Ürün
          </label>
          <input
            type="text"
            id="crop"
            name="crop"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block text-cyan-300 mb-2">
            Durum
          </label>
          <select
            id="status"
            name="status"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Boş">Boş</option>
            <option value="Ekildi">Ekildi</option>
            <option value="Hasat Bekliyor">Hasat Bekliyor</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white rounded px-4 py-2 hover:bg-cyan-700 transition-colors duration-300"
        >
          Tarla Ekle
        </button>
      </form>
    </div>
  )
}

