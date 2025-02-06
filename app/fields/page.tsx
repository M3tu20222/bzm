import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon, CalendarIcon } from "@heroicons/react/24/outline"

// Örnek veri
const fields = [
  { id: 1, name: "Kuzey Tarlası", size: 100, unit: "Dönüm", crop: "Buğday", status: "Ekildi" },
  { id: 2, name: "Güney Tarlası", size: 75, unit: "Dönüm", crop: "Mısır", status: "Hasat Bekliyor" },
  { id: 3, name: "Doğu Çayırı", size: 50, unit: "Dönüm", crop: "Yonca", status: "Boş" },
]

export default function FieldManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Tarla Yönetimi</h1>

      <div className="mb-8">
        <Link
          href="/fields/add"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Tarla Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <div
            key={field.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">{field.name}</h2>
            <p className="text-gray-400 mb-1">
              Boyut: {field.size} {field.unit}
            </p>
            <p className="text-gray-400 mb-1">Ürün: {field.crop}</p>
            <p className="text-gray-400 mb-4">Durum: {field.status}</p>
            <div className="flex justify-end space-x-2">
              <Link href={`/fields/edit/${field.id}`} className="text-cyan-400 hover:text-cyan-300">
                <PencilSquareIcon className="h-5 w-5" />
              </Link>
              <button className="text-pink-400 hover:text-pink-300">
                <TrashIcon className="h-5 w-5" />
              </button>
              <Link href={`/fields/plan/${field.id}`} className="text-yellow-400 hover:text-yellow-300">
                <CalendarIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

