import Link from "next/link"
import { PlusIcon, ChartBarIcon, DocumentTextIcon } from "@heroicons/react/24/outline"

// Örnek veri
const reports = [
  { id: 1, name: "Aylık Gelir Raporu", type: "Finansal", date: "2023-05-01" },
  { id: 2, name: "Ürün Verimi Analizi", type: "Üretim", date: "2023-04-15" },
  { id: 3, name: "Sulama Etkinliği Raporu", type: "Operasyonel", date: "2023-04-01" },
  { id: 4, name: "Yıllık Gider Özeti", type: "Finansal", date: "2023-03-31" },
]

export default function ReportManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Raporlama</h1>

      <div className="mb-8">
        <Link
          href="/reports/create"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Rapor Oluştur
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-750 transition-colors duration-200"
          >
            <div className="flex items-center mb-4">
              {report.type === "Finansal" ? (
                <ChartBarIcon className="h-8 w-8 text-green-400 mr-3" />
              ) : (
                <DocumentTextIcon className="h-8 w-8 text-blue-400 mr-3" />
              )}
              <h2 className="text-xl font-semibold text-cyan-300">{report.name}</h2>
            </div>
            <p className="text-gray-400 mb-2">Tür: {report.type}</p>
            <p className="text-gray-400 mb-4">Tarih: {report.date}</p>
            <Link
              href={`/reports/${report.id}`}
              className="inline-block bg-cyan-600 text-white rounded px-4 py-2 hover:bg-cyan-700 transition-colors duration-300"
            >
              Raporu Görüntüle
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

