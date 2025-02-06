import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function AddIrrigationPlan() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <Link href="/irrigation" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Geri Dön
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Yeni Sulama Planı Ekle</h1>

      <form className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow">
        <div className="mb-6">
          <label htmlFor="fieldName" className="block text-cyan-300 mb-2">
            Tarla Adı
          </label>
          <input
            type="text"
            id="fieldName"
            name="fieldName"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="method" className="block text-cyan-300 mb-2">
            Sulama Yöntemi
          </label>
          <select
            id="method"
            name="method"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Damla Sulama">Damla Sulama</option>
            <option value="Yağmurlama">Yağmurlama</option>
            <option value="Salma Sulama">Salma Sulama</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="frequency" className="block text-cyan-300 mb-2">
            Sıklık
          </label>
          <input
            type="text"
            id="frequency"
            name="frequency"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="duration" className="block text-cyan-300 mb-2">
            Süre
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white rounded px-4 py-2 hover:bg-cyan-700 transition-colors duration-300"
        >
          Sulama Planı Ekle
        </button>
      </form>
    </div>
  )
}

