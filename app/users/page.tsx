import Link from "next/link"
import { UserPlusIcon, UserMinusIcon, PencilSquareIcon } from "@heroicons/react/24/outline"

// Bu örnek için statik veri kullanıyoruz. Gerçek uygulamada bu veriler API'den gelecektir.
const users = [
  { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "Admin" },
  { id: 2, name: "Ayşe Demir", email: "ayse@example.com", role: "Sahip" },
  { id: 3, name: "Mehmet Kaya", email: "mehmet@example.com", role: "İşçi" },
]

export default function UserManagement() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300 animate-pulse">Kullanıcı Yönetimi</h1>

      <div className="mb-8">
        <Link
          href="/users/add"
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-300"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Yeni Kullanıcı Ekle
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-cyan-300">{user.name}</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-cyan-600 text-white">{user.role}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{user.email}</p>
              <div className="flex justify-end space-x-2">
                <Link href={`/users/edit/${user.id}`} className="text-cyan-400 hover:text-cyan-300">
                  <PencilSquareIcon className="h-5 w-5 inline" />
                </Link>
                <button className="text-pink-400 hover:text-pink-300">
                  <UserMinusIcon className="h-5 w-5 inline" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

