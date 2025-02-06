import Link from "next/link"
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

// Örnek veri
const transactions = [
  { id: 1, date: "2023-05-01", type: "Gelir", category: "Ürün Satışı", amount: 10000 },
  { id: 2, date: "2023-05-05", type: "Gider", category: "Gübre Alımı", amount: -2000 },
  { id: 3, date: "2023-05-10", type: "Gider", category: "Yakıt", amount: -500 },
  { id: 4, date: "2023-05-15", type: "Gelir", category: "Devlet Desteği", amount: 5000 },
]

export default function FinancialManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Finansal Yönetim</h1>

      <div className="mb-8 flex justify-between">
        <Link
          href="/finance/add-income"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Gelir Ekle
        </Link>
        <Link
          href="/finance/add-expense"
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Gider Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <p className="text-gray-400 mb-1">Tarih: {transaction.date}</p>
            <p
              className={`text-lg font-semibold mb-1 ${transaction.type === "Gelir" ? "text-green-400" : "text-red-400"}`}
            >
              {transaction.type}: {transaction.category}
            </p>
            <p className={`text-2xl font-bold mb-4 ${transaction.amount >= 0 ? "text-green-400" : "text-red-400"}`}>
              {transaction.amount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
            </p>
            <div className="flex justify-end space-x-2">
              <Link href={`/finance/edit/${transaction.id}`} className="text-cyan-400 hover:text-cyan-300">
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

