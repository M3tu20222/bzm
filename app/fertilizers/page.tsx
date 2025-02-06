import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

// Örnek veri
const fertilizers = [
  {
    id: 1,
    name: "NPK 15-15-15",
    type: "Kimyasal",
    nutrientContent: "Azot, Fosfor, Potasyum",
    applicationRate: "50 kg/dönüm",
  },
  { id: 2, name: "Çiftlik Gübresi", type: "Organik", nutrientContent: "Karışık", applicationRate: "1-2 ton/dönüm" },
  { id: 3, name: "Üre", type: "Kimyasal", nutrientContent: "Azot", applicationRate: "20-30 kg/dönüm" },
]

export default function FertilizerManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Gübre Yönetimi</h1>

      <div className="mb-8">
        <Link
          href="/fertilizers/add"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Gübre Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fertilizers.map((fertilizer) => (
          <div
            key={fertilizer.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">{fertilizer.name}</h2>
            <p className="text-gray-400 mb-1">Tür: {fertilizer.type}</p>
            <p className="text-gray-400 mb-1">Besin İçeriği: {fertilizer.nutrientContent}</p>
            <p className="text-gray-400 mb-4">Uygulama Oranı: {fertilizer.applicationRate}</p>
            <div className="flex justify-end space-x-2">
              <Link href={`/fertilizers/edit/${fertilizer.id}`} className="text-cyan-400 hover:text-cyan-300">
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

