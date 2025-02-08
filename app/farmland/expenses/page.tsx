"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/24/solid";

interface Expense {
  _id: string;
  farmland: { _id: string; name: string };
  type: string;
  totalCost: number;
  season: string;
  expenseDate: string;
}

interface Distribution {
  _id: string;
  expense: string;
  user: { _id: string; name: string };
  allocatedCost: number;
  paidCost: number;
  creditor: { _id: string; name: string };
  status: "pending" | "partialPaid" | "paid";
}

export default function FarmlandExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    farmland: "",
    type: "",
    totalCost: 0,
    season: "",
    expenseDate: "",
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedDistribution, setSelectedDistribution] =
    useState<Distribution | null>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else {
      fetchExpenses();
      fetchDistributions();
    }
  }, [status, router]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/farmland/expense");
      if (!response.ok) throw new Error("Failed to fetch expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      toast.error("Masraflar yüklenirken bir hata oluştu");
    }
  };

  const fetchDistributions = async () => {
    try {
      const response = await fetch("/api/farmland/expense/distribution");
      if (!response.ok) throw new Error("Failed to fetch distributions");
      const data = await response.json();
      setDistributions(data);
    } catch (error) {
      toast.error("Masraf dağılımları yüklenirken bir hata oluştu");
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/farmland/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });
      if (!response.ok) throw new Error("Failed to add expense");
      setIsAddExpenseModalOpen(false);
      fetchExpenses();
      fetchDistributions();
      toast.success("Masraf başarıyla eklendi");
    } catch (error) {
      toast.error("Masraf eklenirken bir hata oluştu");
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDistribution) return;

    try {
      const response = await fetch(
        `/api/farmland/expense/distribution/${selectedDistribution._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paidAmount: paymentAmount }),
        }
      );
      if (!response.ok) throw new Error("Failed to update payment");
      setIsPaymentModalOpen(false);
      fetchDistributions();
      toast.success("Ödeme başarıyla kaydedildi");
    } catch (error) {
      toast.error("Ödeme kaydedilirken bir hata oluştu");
    }
  };

  if (status === "loading") {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-neon-pink animate-pulse">
        Tarla Masrafları
      </h1>
      <Button
        onClick={() => setIsAddExpenseModalOpen(true)}
        className="w-full bg-background text-neon-blue border-2 border-neon-blue hover:bg-neon-blue hover:text-background transition-all duration-300 mb-8 shadow-lg hover:shadow-neon-blue"
      >
        Yeni Masraf Ekle
      </Button>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {expenses.map((expense) => (
          <Card
            key={expense._id}
            className="border-2 border-neon-blue shadow-lg hover:shadow-neon-blue transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold text-neon-blue">
                <CurrencyDollarIcon className="w-6 h-6 mr-2" />
                {expense.farmland.name} - {expense.type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                Toplam Tutar:{" "}
                <span className="text-neon-yellow">{expense.totalCost} TL</span>
              </p>
              <p className="mb-2">
                Sezon:{" "}
                <span className="text-neon-purple">{expense.season}</span>
              </p>
              <p>
                Tarih:{" "}
                <span className="text-neon-green">
                  {new Date(expense.expenseDate).toLocaleDateString()}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-neon-purple animate-pulse">
        Masraf Dağılımları
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {distributions.map((dist) => (
          <Card
            key={dist._id}
            className="border-2 border-neon-purple shadow-lg hover:shadow-neon-purple transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold text-neon-purple">
                <ChartBarIcon className="w-6 h-6 mr-2" />
                {dist.user.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                Paylaşılan Tutar:{" "}
                <span className="text-neon-yellow">
                  {dist.allocatedCost} TL
                </span>
              </p>
              <p className="mb-2">
                Ödenen Tutar:{" "}
                <span className="text-neon-green">{dist.paidCost} TL</span>
              </p>
              <p className="mb-2">
                Durum: <span className="text-neon-blue">{dist.status}</span>
              </p>
              <p className="mb-4">
                Alacaklı:{" "}
                <span className="text-neon-pink">{dist.creditor.name}</span>
              </p>
              <Button
                onClick={() => {
                  setSelectedDistribution(dist);
                  setIsPaymentModalOpen(true);
                }}
                className="w-full bg-secondary text-secondary-foreground hover:bg-neon-purple hover:text-background transition-colors duration-300"
              >
                Ödeme Yap
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={isAddExpenseModalOpen}
        onOpenChange={setIsAddExpenseModalOpen}
      >
        <DialogContent className="bg-background/95 border-2 border-neon-blue shadow-lg backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-neon-blue">
              Yeni Masraf Ekle
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddExpense}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-neon-blue text-sm">Tarla</label>
                <Select
                  value={newExpense.farmland}
                  onValueChange={(value) =>
                    setNewExpense({ ...newExpense, farmland: value })
                  }
                >
                  <SelectTrigger className="border-2 border-neon-blue bg-background text-neon-blue">
                    <SelectValue
                      placeholder="Tarla seçin"
                      className="text-neon-blue/50"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-2 border-neon-blue">
                    {expenses.map((expense) => (
                      <SelectItem
                        key={expense.farmland._id}
                        value={expense.farmland._id}
                        className="text-foreground hover:bg-neon-blue hover:text-background"
                      >
                        {expense.farmland.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-neon-pink text-sm">Masraf Türü</label>
                <Input
                  placeholder="Masraf türü"
                  value={newExpense.type}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, type: e.target.value })
                  }
                  className="border-2 border-neon-pink bg-background text-neon-pink placeholder:text-neon-pink/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-neon-yellow text-sm">Toplam Tutar</label>
                <Input
                  type="number"
                  placeholder="Toplam tutar"
                  value={newExpense.totalCost}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      totalCost: Number.parseFloat(e.target.value),
                    })
                  }
                  className="border-2 border-neon-yellow bg-background text-neon-yellow placeholder:text-neon-yellow/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-neon-purple text-sm">Sezon</label>
                <Input
                  placeholder="Sezon"
                  value={newExpense.season}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, season: e.target.value })
                  }
                  className="border-2 border-neon-purple bg-background text-neon-purple placeholder:text-neon-purple/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-neon-blue text-sm">Tarih</label>
                <Input
                  type="date"
                  value={newExpense.expenseDate}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      expenseDate: e.target.value,
                    })
                  }
                  className="border-2 border-neon-blue bg-background text-neon-blue placeholder:text-neon-blue/50"
                  placeholder="gg.aa.yyyy"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full bg-background text-neon-blue border-2 border-neon-blue hover:bg-neon-blue hover:text-background transition-all duration-300 shadow-lg hover:shadow-neon-blue"
              >
                Ekle
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="bg-background border-2 border-neon-pink shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-neon-pink">
              Ödeme Yap
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePayment}>
            <div className="space-y-4">
              <p className="text-neon-blue">
                Kalan Borç:{" "}
                <span className="text-neon-yellow">
                  {selectedDistribution
                    ? selectedDistribution.allocatedCost -
                      selectedDistribution.paidCost
                    : 0}{" "}
                  TL
                </span>
              </p>
              <div className="space-y-2">
                <label className="text-neon-pink text-sm">Ödeme Tutarı</label>
                <Input
                  type="number"
                  placeholder="Ödeme tutarı"
                  value={paymentAmount}
                  onChange={(e) =>
                    setPaymentAmount(Number.parseFloat(e.target.value))
                  }
                  className="border-2 border-neon-pink bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-neon-pink hover:text-background transition-colors duration-300"
              >
                Öde
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
