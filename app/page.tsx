import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import type { FC } from "react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: FC<{ className?: string }>;
  change: string;
  changeType: "positive" | "negative";
}

function DashboardCard({
  title,
  value,
  icon: Icon,
  change,
  changeType,
}: DashboardCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-cyan-300">{title}</h2>
        <Icon className="h-8 w-8 text-cyan-400" />
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p
        className={`text-sm ${
          changeType === "positive" ? "text-green-400" : "text-red-400"
        }`}
      >
        {change} geçen haftaya göre
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400">
      <h1 className="text-4xl font-bold mb-8 text-center text-cyan-300 animate-pulse">
        Hoş Geldiniz
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Toplam Gelir"
          value="₺150,000"
          icon={CurrencyDollarIcon}
          change="+5.2%"
          changeType="positive"
        />
        <DashboardCard
          title="Aktif Kullanıcılar"
          value="24"
          icon={UserGroupIcon}
          change="+2"
          changeType="positive"
        />
        <DashboardCard
          title="Ürün Verimi"
          value="92%"
          icon={ChartBarIcon}
          change="-3%"
          changeType="negative"
        />
      </div>
    </div>
  );
}
