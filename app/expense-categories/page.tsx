import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

// Örnek veri
const expenseCategories = [
  { id: 1, name: "Gübre", description: "Gübre alımları ve uygulamaları" },
  { id: 2, name: "Yakıt", description: "Traktör ve diğer araçlar için yakıt giderleri" },
  { id: 3, name: "İşçilik", description: "Geçici ve sürekli işçi ücretleri" },
  { id: 4, name: "Ekipman Bakımı", description: "Tarım ekipmanlarının bakım ve onarım giderleri" },
]

export default function ExpenseCategoryManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Gider Kategori Yönetimi</h1>

      <div className="mb-8">
        <Link
          href="/expense-categories/add"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Kategori Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenseCategories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">{category.name}</h2>
            <p className="text-gray-400 mb-4">{category.description}</p>
            <div className="flex justify-end space-x-2">
              <Link href={`/expense-categories/edit/${category.id}`} className="text-cyan-400 hover:text-cyan-300">
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

