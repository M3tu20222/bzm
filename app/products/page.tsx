import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

// Örnek veri
const products = [
  { id: 1, name: "Buğday", type: "Tahıl", plantingSeason: "Sonbahar", harvestSeason: "Yaz" },
  { id: 2, name: "Mısır", type: "Tahıl", plantingSeason: "İlkbahar", harvestSeason: "Sonbahar" },
  { id: 3, name: "Domates", type: "Sebze", plantingSeason: "İlkbahar", harvestSeason: "Yaz" },
]

export default function ProductManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Ürün Yönetimi</h1>

      <div className="mb-8">
        <Link
          href="/products/add"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Ürün Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">{product.name}</h2>
            <p className="text-gray-400 mb-1">Tür: {product.type}</p>
            <p className="text-gray-400 mb-1">Ekim Mevsimi: {product.plantingSeason}</p>
            <p className="text-gray-400 mb-4">Hasat Mevsimi: {product.harvestSeason}</p>
            <div className="flex justify-end space-x-2">
              <Link href={`/products/edit/${product.id}`} className="text-cyan-400 hover:text-cyan-300">
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

