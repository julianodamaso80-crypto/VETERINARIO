'use client';

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-50',
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const isNegativeGood = title.toLowerCase().includes('churn') && change !== undefined && change < 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className={`w-3.5 h-3.5 ${title.toLowerCase().includes('churn') ? 'text-red-500' : 'text-emerald-500'}`} />
              ) : (
                <TrendingDown className={`w-3.5 h-3.5 ${isNegativeGood ? 'text-emerald-500' : 'text-red-500'}`} />
              )}
              <span
                className={`text-xs font-semibold ${
                  isNegativeGood
                    ? 'text-emerald-600'
                    : isPositive
                    ? title.toLowerCase().includes('churn')
                      ? 'text-red-600'
                      : 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-slate-400">vs mes anterior</span>
            </div>
          )}
        </div>
        <div className={`w-11 h-11 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
