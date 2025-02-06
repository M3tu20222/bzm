import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

// Örnek veri
const inventoryItems = [
  { id: 1, name: "Traktör", category: "Ekipman", quantity: 2, unit: "Adet" },
  { id: 2, name: "NPK Gübre", category: "Gübre", quantity: 1000, unit: "kg" },
  { id: 3, name: "Mısır Tohumu", category: "Tohum", quantity: 50, unit: "kg" },
  { id: 4, name: "Sulama Borusu", category: "Sulama Ekipmanı", quantity: 500, unit: "m" },
]

export default function InventoryManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Envanter Yönetimi</h1>

      <div className="mb-8">
        <Link
          href="/inventory/add"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Envanter Öğesi Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">{item.name}</h2>
            <p className="text-gray-400 mb-1">Kategori: {item.category}</p>
            <p className="text-gray-400 mb-4">
              Miktar: {item.quantity} {item.unit}
            </p>
            <div className="flex justify-end space-x-2">
              <Link href={`/inventory/edit/${item.id}`} className="text-cyan-400 hover:text-cyan-300">
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

