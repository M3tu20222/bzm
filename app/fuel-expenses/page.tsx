import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

// Örnek veri
const fuelExpenses = [
  { id: 1, date: "2023-05-01", amount: 100, liters: 50, vehicle: "Traktör 1", field: "Kuzey Tarlası" },
  { id: 2, date: "2023-05-03", amount: 80, liters: 40, vehicle: "Traktör 2", field: "Güney Tarlası" },
  { id: 3, date: "2023-05-05", amount: 60, liters: 30, vehicle: "Kamyonet", field: "Nakliye" },
  { id: 4, date: "2023-05-07", amount: 120, liters: 60, vehicle: "Traktör 1", field: "Doğu Çayırı" },
]

export default function FuelExpenseManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Mazot Harcamaları</h1>

      <div className="mb-8">
        <Link
          href="/fuel-expenses/add"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Mazot Harcaması Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fuelExpenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <p className="text-gray-400 mb-1">Tarih: {expense.date}</p>
            <p className="text-xl font-semibold text-cyan-300 mb-2">
              {expense.amount.toFixed(2)} TL / {expense.liters} L
            </p>
            <p className="text-gray-400 mb-1">Araç: {expense.vehicle}</p>
            <p className="text-gray-400 mb-4">Tarla/İş: {expense.field}</p>
            <div className="flex justify-end space-x-2">
              <Link href={`/fuel-expenses/edit/${expense.id}`} className="text-cyan-400 hover:text-cyan-300">
                <PencilSquareIcon className="h-5 w-5" />
              </Link>
              <button className="text-pink-400 hover:text-pink-300">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

