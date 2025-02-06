import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function CreateReport() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <Link href="/reports" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Geri Dön
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Yeni Rapor Oluştur</h1>

      <form className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow">
        <div className="mb-6">
          <label htmlFor="name" className="block text-cyan-300 mb-2">
            Rapor Adı
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
            Rapor Türü
          </label>
          <select
            id="type"
            name="type"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Finansal">Finansal</option>
            <option value="Üretim">Üretim</option>
            <option value="Operasyonel">Operasyonel</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="startDate" className="block text-cyan-300 mb-2">
            Başlangıç Tarihi
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="endDate" className="block text-cyan-300 mb-2">
            Bitiş Tarihi
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-cyan-300 mb-2">
            Açıklama
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white rounded px-4 py-2 hover:bg-cyan-700 transition-colors duration-300"
        >
          Rapor Oluştur
        </button>
      </form>
    </div>
  )
}

