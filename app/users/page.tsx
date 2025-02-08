"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PencilSquareIcon, UserMinusIcon } from "@heroicons/react/24/outline";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role !== "admin") {
      router.push("/");
    } else {
      fetchUsers();
    }
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Kullanıcılar getirilemedi");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Kullanıcılar yüklenirken hata oluştu:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-cyan-400">Yükleniyor...</div>
      </div>
    );
  }

  if (session?.user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300">
        Kullanıcı Yönetimi
      </h1>

      <div className="rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-gray-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-cyan-300">
                  {user.name}
                </h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-cyan-600 text-white">
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{user.email}</p>
              <div className="flex justify-end space-x-2">
                <Link
                  href={`/users/edit/${user._id}`}
                  className="text-cyan-400 hover:text-cyan-300"
                >
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
  );
}
