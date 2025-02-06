import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function AddFuelExpense() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <Link
        href="/fuel-expenses"
        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Geri Dön
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">
        Yeni Mazot Harcaması Ekle
      </h1>

      <form className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow">
        <div className="mb-6">
          <label htmlFor="date" className="block text-cyan-300 mb-2">
            Tarih
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="amount" className="block text-cyan-300 mb-2">
            Tutar (TL)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="liters" className="block text-cyan-300 mb-2">
            Miktar (L)
          </label>
          <input
            type="number"
            id="liters"
            name="liters"
            step="0.1"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="vehicle" className="block text-cyan-300 mb-2">
            Araç
          </label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="field" className="block text-cyan-300 mb-2">
            Tarla/İş
          </label>
          <input
            type="text"
            id="field"
            name="field"
            className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white rounded px-4 py-2 hover:bg-cyan-700 transition-colors duration-300"
        >
          Mazot Harcaması Ekle
        </button>
      </form>
    </div>
  );
}
