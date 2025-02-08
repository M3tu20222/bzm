"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PencilSquareIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
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
      toast.error("Kullanıcılar yüklenirken bir hata oluştu");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Kullanıcı silinemedi");
        }
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("Kullanıcı başarıyla silindi");
      } catch (error) {
        console.error("Kullanıcı silinirken hata oluştu:", error);
        toast.error("Kullanıcı silinirken bir hata oluştu");
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch(`/api/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      });
      if (!response.ok) {
        throw new Error("Kullanıcı güncellenemedi");
      }
      setUsers(
        users.map((user) => (user._id === editingUser._id ? editingUser : user))
      );
      setIsEditModalOpen(false);
      toast.success("Kullanıcı başarıyla güncellendi");
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
      toast.error("Kullanıcı güncellenirken bir hata oluştu");
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
                <button
                  onClick={() => handleEdit(user)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  <PencilSquareIcon className="h-5 w-5 inline" />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-pink-400 hover:text-pink-300"
                >
                  <UserMinusIcon className="h-5 w-5 inline" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kullanıcı Düzenle</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <form onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300"
                  >
                    İsim
                  </label>
                  <Input
                    id="name"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    E-posta
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Rol
                  </label>
                  <Select
                    value={editingUser.role}
                    onValueChange={(value) =>
                      setEditingUser({ ...editingUser, role: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Rol seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="ortak">Ortak</SelectItem>
                      <SelectItem value="işçi">İşçi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit">Güncelle</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
