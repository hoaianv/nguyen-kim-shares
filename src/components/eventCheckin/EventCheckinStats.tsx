"use client";

import { i18nText } from "@/lib/i18nText";
import { Users, UserCheck, UserX } from "lucide-react";
import { IEventCheckinStats } from "@/interfaces/models/IEventCheckin.interface";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
}

function StatCard({ label, value, icon, accentColor, bgColor }: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden`}
    >
      <div className={`flex items-center gap-4 p-5 border-l-4 ${accentColor}`}>
        <div
          className={`flex items-center justify-center w-11 h-11 rounded-lg ${bgColor}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900 tabular-nums">
            {value.toLocaleString("vi-VN")}
          </p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

interface EventCheckinStatsProps {
  stats: IEventCheckinStats;
}

export default function EventCheckinStats({ stats }: EventCheckinStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <StatCard
        label={i18nText("AUTO.components.eventcheckin.eventcheckinstats.line44_0_tong_khach_moi")}
        value={stats.total}
        icon={<Users className="w-5 h-5 text-blue-600" />}
        accentColor="border-l-blue-500"
        bgColor="bg-blue-50"
      />
      <StatCard
        label={i18nText("AUTO.components.eventcheckin.eventcheckinstats.line51_1_da_check_in")}
        value={stats.checkedIn}
        icon={<UserCheck className="w-5 h-5 text-emerald-600" />}
        accentColor="border-l-emerald-500"
        bgColor="bg-emerald-50"
      />
      <StatCard
        label={i18nText("AUTO.components.eventcheckin.eventcheckinstats.line58_2_chua_check_in")}
        value={stats.notCheckedIn}
        icon={<UserX className="w-5 h-5 text-amber-600" />}
        accentColor="border-l-amber-500"
        bgColor="bg-amber-50"
      />
    </div>
  );
}
