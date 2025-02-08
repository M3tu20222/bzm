"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PlusCircleIcon, PencilIcon } from "lucide-react";
import type React from "react";

interface Season {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
  year: number;
}

interface Farmland {
  _id: string;
  name: string;
  size: number;
  owners: Array<{ user: { _id: string; name: string }; sharePercent: number }>;
  product: string;
  status: string;
  irrigated: boolean;
  rented: boolean;
  plotInfo: string;
  currentSeason: { _id: string; name: string };
}

export default function FarmlandManagementPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [farmlands, setFarmlands] = useState<Farmland[]>([]);
  const [isAddSeasonModalOpen, setIsAddSeasonModalOpen] = useState(false);
  const [isEditSeasonModalOpen, setIsEditSeasonModalOpen] = useState(false);
  const [isAddFarmlandModalOpen, setIsAddFarmlandModalOpen] = useState(false);
  const [newSeason, setNewSeason] = useState({
    year: new Date().getFullYear(),
  });
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);
  const [newFarmland, setNewFarmland] = useState({
    name: "",
    size: 0,
    owners: [{ user: "", sharePercent: 0 }],
    product: "",
    status: "",
    irrigated: false,
    rented: false,
    plotInfo: "",
    currentSeason: "",
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else {
      fetchSeasons();
      fetchFarmlands();
    }
  }, [status, router]);

  const fetchSeasons = async () => {
    try {
      const response = await fetch("/api/seasons");
      if (!response.ok) throw new Error("Failed to fetch seasons");
      const data = await response.json();
      setSeasons(data);
    } catch (error) {
      toast.error("Sezonlar yüklenirken bir hata oluştu");
    }
  };

  const fetchFarmlands = async () => {
    try {
      const response = await fetch("/api/farmlands");
      if (!response.ok) throw new Error("Failed to fetch farmlands");
      const data = await response.json();
      setFarmlands(data);
    } catch (error) {
      toast.error("Tarlalar yüklenirken bir hata oluştu");
    }
  };

  const handleAddSeason = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/seasons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: newSeason.year,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add season");
      }
      setIsAddSeasonModalOpen(false);
      fetchSeasons();
      toast.success("Sezon başarıyla eklendi");
    } catch (error) {
      console.error("Season creation error:", error);
      toast.error("Sezon eklenirken bir hata oluştu");
    }
  };

  const handleEditSeason = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSeason) return;

    try {
      const response = await fetch(`/api/seasons/${editingSeason._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: editingSeason.year,
          active: editingSeason.active,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update season");
      }
      setIsEditSeasonModalOpen(false);
      fetchSeasons();
      toast.success("Sezon başarıyla güncellendi");
    } catch (error) {
      console.error("Season update error:", error);
      toast.error("Sezon güncellenirken bir hata oluştu");
    }
  };

  const handleAddFarmland = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/farmlands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFarmland),
      });
      if (!response.ok) throw new Error("Failed to add farmland");
      setIsAddFarmlandModalOpen(false);
      fetchFarmlands();
      toast.success("Tarla başarıyla eklendi");
    } catch (error) {
      toast.error("Tarla eklenirken bir hata oluştu");
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center text-neon-blue animate-pulse">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-5xl font-bold text-center mb-12 text-neon-pink glow-text-pink">
        Tarla ve Sezon Yönetimi
      </h1>

      {/* Sezonlar */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-neon-blue glow-text-blue">
            Sezonlar
          </h2>
          <Button
            onClick={() => setIsAddSeasonModalOpen(true)}
            className="bg-transparent text-neon-blue border-2 border-neon-blue hover:bg-neon-blue hover:text-background transition-all duration-300 shadow-neon-blue"
          >
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Yeni Sezon Ekle
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {seasons.map((season) => (
            <Card
              key={season._id}
              className="border-2 border-neon-blue shadow-lg hover:shadow-neon-blue transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-neon-blue">{season.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-neon-pink">Başlangıç:</span>
                    <span className="text-neon-yellow font-bold">
                      {new Date(season.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neon-pink">Bitiş:</span>
                    <span className="text-neon-yellow font-bold">
                      {new Date(season.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neon-pink">Durum:</span>
                    <span className="text-neon-yellow">
                      {season.active ? "Aktif" : "Pasif"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neon-pink">Yıl:</span>
                    <span className="text-neon-yellow">{season.year}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    setEditingSeason(season);
                    setIsEditSeasonModalOpen(true);
                  }}
                  className="w-full bg-transparent text-neon-green border-2 border-neon-green hover:bg-neon-green hover:text-background transition-all duration-300 shadow-neon-green"
                >
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Düzenle
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Tarlalar */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-neon-purple glow-text-purple">
            Tarlalar
          </h2>
          <Button
            onClick={() => setIsAddFarmlandModalOpen(true)}
            className="bg-transparent text-neon-yellow border-2 border-neon-yellow hover:bg-neon-yellow hover:text-background transition-all duration-300 shadow-neon-yellow"
          >
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Yeni Tarla Ekle
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {farmlands.map((farmland) => (
            <Card
              key={farmland._id}
              className="border-2 border-neon-purple shadow-lg hover:shadow-neon-purple transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-neon-purple">
                  {farmland.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neon-blue">Dekar: {farmland.size}</p>
                <p className="text-neon-green">Ürün: {farmland.product}</p>
                <p className="text-neon-yellow">Durum: {farmland.status}</p>
                <p className="text-neon-pink">
                  Sulanan: {farmland.irrigated ? "Evet" : "Hayır"}
                </p>
                <p className="text-neon-blue">
                  Kiralık: {farmland.rented ? "Evet" : "Hayır"}
                </p>
                <p className="text-neon-green">
                  Ada-Parsel: {farmland.plotInfo}
                </p>
                <p className="text-neon-yellow">
                  Sezon: {farmland.currentSeason.name}
                </p>
                <div className="mt-2">
                  <h4 className="text-neon-pink font-semibold">Sahipler:</h4>
                  {farmland.owners.map((owner, index) => (
                    <p key={index} className="text-neon-blue">
                      {owner.user.name}: %{owner.sharePercent}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sezon Ekleme Modal */}
      <Dialog
        open={isAddSeasonModalOpen}
        onOpenChange={setIsAddSeasonModalOpen}
      >
        <DialogContent className="bg-background/95 border-2 border-neon-blue shadow-neon-blue backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-neon-blue glow-text-blue">
              Yeni Sezon Ekle
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSeason}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-neon-yellow text-sm font-semibold">
                  Sezon Yılı
                </label>
                <Input
                  type="number"
                  min={2000}
                  max={2100}
                  value={newSeason.year}
                  onChange={(e) =>
                    setNewSeason({ year: Number.parseInt(e.target.value) })
                  }
                  className="border-2 border-neon-yellow bg-background/50 text-neon-yellow focus:ring-neon-yellow"
                  placeholder="Örn: 2024"
                />
              </div>
            </div>
            <DialogFooter className="mt-8">
              <Button
                type="submit"
                className="w-full bg-transparent text-neon-blue border-2 border-neon-blue hover:bg-neon-blue hover:text-background transition-all duration-300 shadow-neon-blue"
              >
                Ekle
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sezon Düzenleme Modal */}
      <Dialog
        open={isEditSeasonModalOpen}
        onOpenChange={setIsEditSeasonModalOpen}
      >
        <DialogContent className="bg-background/95 border-2 border-neon-green shadow-neon-green backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-neon-green glow-text-green">
              Sezon Düzenle
            </DialogTitle>
          </DialogHeader>
          {editingSeason && (
            <form onSubmit={handleEditSeason}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-neon-yellow text-sm font-semibold">
                    Sezon Yılı
                  </label>
                  <Input
                    type="number"
                    min={2000}
                    max={2100}
                    value={editingSeason.year}
                    onChange={(e) =>
                      setEditingSeason({
                        ...editingSeason,
                        year: Number.parseInt(e.target.value),
                      })
                    }
                    className="border-2 border-neon-yellow bg-background/50 text-neon-yellow focus:ring-neon-yellow"
                    placeholder="Örn: 2024"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-neon-pink text-sm font-semibold">
                    Durum
                  </label>
                  <Select
                    value={editingSeason.active ? "active" : "inactive"}
                    onValueChange={(value) =>
                      setEditingSeason({
                        ...editingSeason,
                        active: value === "active",
                      })
                    }
                  >
                    <SelectTrigger className="border-2 border-neon-pink bg-background/50 text-neon-pink">
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Pasif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-8">
                <Button
                  type="submit"
                  className="w-full bg-transparent text-neon-green border-2 border-neon-green hover:bg-neon-green hover:text-background transition-all duration-300 shadow-neon-green"
                >
                  Güncelle
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Tarla Ekleme Modal */}
      <Dialog
        open={isAddFarmlandModalOpen}
        onOpenChange={setIsAddFarmlandModalOpen}
      >
        <DialogContent className="bg-background/95 border-2 border-neon-yellow shadow-lg backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-neon-yellow">
              Yeni Tarla Ekle
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddFarmland}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-neon-yellow text-sm">Tarla Adı</label>
                <Input
                  placeholder="Tarla adı"
                  value={newFarmland.name}
                  onChange={(e) =>
                    setNewFarmland({ ...newFarmland, name: e.target.value })
                  }
                  className="border-2 border-neon-yellow bg-background text-neon-yellow placeholder:text-neon-yellow/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-neon-blue text-sm">Dekar</label>
                <Input
                  type="number"
                  placeholder="Dekar"
                  value={newFarmland.size}
                  onChange={(e) =>
                    setNewFarmland({
                      ...newFarmland,
                      size: Number(e.target.value),
                    })
                  }
                  className="border-2 border-neon-blue bg-background text-neon-blue placeholder:text-neon-blue/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-neon-green text-sm">Ürün</label>
                <Input
                  placeholder="Ürün"
                  value={newFarmland.product}
                  onChange={(e) =>
                    setNewFarmland({ ...newFarmland, product: e.target.value })
                  }
                  className="border-2 border-neon-green bg-background text-neon-green placeholder:text-neon-green/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-neon-pink text-sm">Durum</label>
                <Input
                  placeholder="Durum"
                  value={newFarmland.status}
                  onChange={(e) =>
                    setNewFarmland({ ...newFarmland, status: e.target.value })
                  }
                  className="border-2 border-neon-pink bg-background text-neon-pink placeholder:text-neon-pink/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-neon-blue text-sm">Ada-Parsel</label>
                <Input
                  placeholder="Ada-Parsel"
                  value={newFarmland.plotInfo}
                  onChange={(e) =>
                    setNewFarmland({ ...newFarmland, plotInfo: e.target.value })
                  }
                  className="border-2 border-neon-blue bg-background text-neon-blue placeholder:text-neon-blue/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-neon-green text-sm">Sezon</label>
                <Select
                  value={newFarmland.currentSeason}
                  onValueChange={(value) =>
                    setNewFarmland({ ...newFarmland, currentSeason: value })
                  }
                >
                  <SelectTrigger className="border-2 border-neon-green bg-background text-neon-green">
                    <SelectValue placeholder="Sezon seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season._id} value={season._id}>
                        {season.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="irrigated"
                  checked={newFarmland.irrigated}
                  onChange={(e) =>
                    setNewFarmland({
                      ...newFarmland,
                      irrigated: e.target.checked,
                    })
                  }
                  className="text-neon-yellow focus:ring-neon-yellow"
                />
                <label htmlFor="irrigated" className="text-neon-yellow text-sm">
                  Sulanan
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rented"
                  checked={newFarmland.rented}
                  onChange={(e) =>
                    setNewFarmland({ ...newFarmland, rented: e.target.checked })
                  }
                  className="text-neon-pink focus:ring-neon-pink"
                />
                <label htmlFor="rented" className="text-neon-pink text-sm">
                  Kiralık
                </label>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full bg-background text-neon-yellow border-2 border-neon-yellow hover:bg-neon-yellow hover:text-background transition-all duration-300 shadow-lg hover:shadow-neon-yellow"
              >
                Ekle
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
