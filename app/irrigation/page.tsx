import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

// Örnek veri
const irrigationPlans = [
  { id: 1, fieldName: "Kuzey Tarlası", method: "Damla Sulama", frequency: "Günlük", duration: "2 saat" },
  { id: 2, fieldName: "Güney Tarlası", method: "Yağmurlama", frequency: "Haftalık", duration: "3 saat" },
  { id: 3, fieldName: "Doğu Çayırı", method: "Salma Sulama", frequency: "Aylık", duration: "4 saat" },
]

export default function IrrigationManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Sulama Yönetimi</h1>

      <div className="mb-8">
        <Link
          href="/irrigation/add"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Sulama Planı Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {irrigationPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">{plan.fieldName}</h2>
            <p className="text-gray-400 mb-1">Sulama Yöntemi: {plan.method}</p>
            <p className="text-gray-400 mb-1">Sıklık: {plan.frequency}</p>
            <p className="text-gray-400 mb-4">Süre: {plan.duration}</p>
            <div className="flex justify-end space-x-2">
              <Link href={`/irrigation/edit/${plan.id}`} className="text-cyan-400 hover:text-cyan-300">
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

