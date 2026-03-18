'use client';

export const dynamic = "force-dynamic";

import { useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  DollarSign,
  UserPlus,
  TrendingDown,
  Clock,
  Receipt,
  AlertTriangle,
  CreditCard,
  Headphones,
  ChevronRight,
  Building2,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';
import {
  mockClients,
  mrrHistory,
  clientsFlow,
  getKPIs,
  getPlanDistribution,
  formatCurrency,
  formatDate,
  timeAgo,
  getGreeting,
  getPlanLabel,
  getStatusLabel,
  mockTickets,
} from '@/data/admin-mock';

// Custom tooltip for MRR chart
function MrrTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-lg">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-sm text-blue-600 font-semibold">
          MRR: {formatCurrency(payload[0].value)}
        </p>
        {payload[0].payload.clients && (
          <p className="text-xs text-slate-500">
            {payload[0].payload.clients} clientes
          </p>
        )}
      </div>
    );
  }
  return null;
}

// Custom tooltip for flow chart
function FlowTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-lg">
        <p className="text-sm font-medium text-slate-700 mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p
            key={i}
            className="text-sm font-semibold"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// Custom tooltip for pie chart
function PieTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-lg">
        <p className="text-sm font-medium text-slate-700">
          {payload[0].name}
        </p>
        <p className="text-sm font-semibold" style={{ color: payload[0].payload.color }}>
          {payload[0].value} clientes
        </p>
      </div>
    );
  }
  return null;
}

export default function AdminDashboardPage() {
  const kpis = useMemo(() => getKPIs(), []);
  const planDistribution = useMemo(() => getPlanDistribution(), []);

  // Last 10 clients sorted by registeredAt desc
  const latestClients = useMemo(() => {
    return [...mockClients]
      .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
      .slice(0, 10);
  }, []);

  // Alerts data
  const overdueClients = useMemo(
    () => mockClients.filter((c) => c.status === 'overdue'),
    []
  );

  const expiringTrials = useMemo(() => {
    const now = new Date();
    const fiveDaysFromNow = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    return mockClients.filter(
      (c) =>
        c.status === 'trial' &&
        c.trialEndsAt &&
        new Date(c.trialEndsAt) <= fiveDaysFromNow
    );
  }, []);

  const openTickets = useMemo(
    () => mockTickets.filter((t) => t.status === 'open' || t.status === 'in_progress'),
    []
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          {getGreeting()}, Admin
        </h1>
        <p className="text-slate-500 mt-1">
          Aqui esta o resumo da sua plataforma
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="animate-in fade-in duration-500" style={{ animationDelay: '50ms' }}>
          <StatsCard
            title="Clientes Ativos"
            value={String(kpis.activeClients)}
            change={kpis.activeClientsChange}
            icon={Users}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
          />
        </div>
        <div className="animate-in fade-in duration-500" style={{ animationDelay: '100ms' }}>
          <StatsCard
            title="MRR"
            value={formatCurrency(kpis.mrr)}
            change={kpis.mrrChange}
            icon={DollarSign}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
          />
        </div>
        <div className="animate-in fade-in duration-500" style={{ animationDelay: '150ms' }}>
          <StatsCard
            title="Novos este Mes"
            value={String(kpis.newThisMonth)}
            change={kpis.newThisMonthChange}
            icon={UserPlus}
            iconColor="text-indigo-600"
            iconBg="bg-indigo-50"
          />
        </div>
        <div className="animate-in fade-in duration-500" style={{ animationDelay: '200ms' }}>
          <StatsCard
            title="Taxa de Churn"
            value={`${kpis.churnRate}%`}
            change={kpis.churnRateChange}
            icon={TrendingDown}
            iconColor={kpis.churnRate > 5 ? 'text-red-600' : 'text-amber-600'}
            iconBg={kpis.churnRate > 5 ? 'bg-red-50' : 'bg-amber-50'}
          />
        </div>
        <div className="animate-in fade-in duration-500" style={{ animationDelay: '250ms' }}>
          <StatsCard
            title="Trial Ativo"
            value={String(kpis.trialActive)}
            icon={Clock}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
          />
        </div>
        <div className="animate-in fade-in duration-500" style={{ animationDelay: '300ms' }}>
          <StatsCard
            title="Ticket Medio"
            value={formatCurrency(kpis.avgTicket)}
            change={kpis.avgTicketChange}
            icon={Receipt}
            iconColor="text-violet-600"
            iconBg="bg-violet-50"
          />
        </div>
      </div>

      {/* Charts Row - MRR + Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* MRR Evolution Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in duration-500" style={{ animationDelay: '350ms' }}>
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Evolucao do MRR
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrHistory}>
                <defs>
                  <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  tickFormatter={(value) => `R$${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<MrrTooltip />} />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fill="url(#mrrGradient)"
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Novos vs Cancelamentos */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in duration-500" style={{ animationDelay: '400ms' }}>
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Novos vs Cancelamentos
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientsFlow} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<FlowTooltip />} />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
                />
                <Bar
                  dataKey="novos"
                  name="Novos"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="cancelamentos"
                  name="Cancelamentos"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart - Plan Distribution */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in duration-500" style={{ animationDelay: '450ms' }}>
        <h3 className="text-base font-semibold text-slate-800 mb-4">
          Distribuicao por Plano
        </h3>
        <div className="h-72 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
              >
                {planDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: '13px' }}
                formatter={(value: string) => (
                  <span className="text-slate-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table - Ultimos Clientes */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm animate-in fade-in duration-500" style={{ animationDelay: '500ms' }}>
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800">
            Ultimos Clientes Cadastrados
          </h3>
          <Link
            href="/admin/clientes"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
          >
            Ver todos
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Clinica
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Plano
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Data Cadastro
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
                  Ultimo Login
                </th>
              </tr>
            </thead>
            <tbody>
              {latestClients.map((client) => (
                <Link
                  key={client.id}
                  href="/admin/clientes"
                  className="contents"
                >
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {client.clinicName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {client.city}/{client.state}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge
                        variant={client.plan as any}
                        label={getPlanLabel(client.plan)}
                      />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">
                      {formatDate(client.registeredAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge variant={client.status} />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">
                      {timeAgo(client.lastLogin)}
                    </td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-slate-100">
          {latestClients.map((client) => (
            <Link
              key={client.id}
              href="/admin/clientes"
              className="block px-5 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {client.clinicName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {client.city}/{client.state}
                    </p>
                  </div>
                </div>
                <StatusBadge variant={client.status} />
              </div>
              <div className="flex items-center gap-3 mt-2 ml-11">
                <StatusBadge
                  variant={client.plan as any}
                  label={getPlanLabel(client.plan)}
                />
                <span className="text-xs text-slate-400">
                  {formatDate(client.registeredAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="animate-in fade-in duration-500" style={{ animationDelay: '550ms' }}>
        <h3 className="text-base font-semibold text-slate-800 mb-3">
          Alertas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Inadimplentes */}
          <div className="bg-white rounded-xl border border-red-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-700">
                  Inadimplentes
                </p>
                <p className="text-2xl font-bold text-red-800">
                  {overdueClients.length}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              {overdueClients.map((c) => (
                <p key={c.id} className="text-xs text-red-600 truncate">
                  {c.clinicName} - {getPlanLabel(c.plan)}
                </p>
              ))}
              {overdueClients.length === 0 && (
                <p className="text-xs text-slate-400">Nenhum inadimplente</p>
              )}
            </div>
          </div>

          {/* Trials expirando */}
          <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-700">
                  Trials expirando em &lt; 5 dias
                </p>
                <p className="text-2xl font-bold text-amber-800">
                  {expiringTrials.length}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              {expiringTrials.map((c) => (
                <p key={c.id} className="text-xs text-amber-600 truncate">
                  {c.clinicName} - expira{' '}
                  {c.trialEndsAt ? formatDate(c.trialEndsAt) : ''}
                </p>
              ))}
              {expiringTrials.length === 0 && (
                <p className="text-xs text-slate-400">Nenhum trial expirando</p>
              )}
            </div>
          </div>

          {/* Tickets abertos */}
          <div className="bg-white rounded-xl border border-blue-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Headphones className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  Tickets de suporte abertos
                </p>
                <p className="text-2xl font-bold text-blue-800">
                  {openTickets.length}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              {openTickets.map((t) => (
                <p key={t.id} className="text-xs text-blue-600 truncate">
                  {t.clientName} - {t.subject}
                </p>
              ))}
              {openTickets.length === 0 && (
                <p className="text-xs text-slate-400">Nenhum ticket aberto</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
