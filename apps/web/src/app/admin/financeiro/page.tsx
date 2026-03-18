'use client';

import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { mockTransactions, mockClients, mrrHistory, formatCurrency, formatDate } from '@/data/admin-mock';
import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Filter,
  Download,
  Search,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Dados mock de receita por plano (6 meses)
const revenueByPlan = [
  { month: 'Set/25', profissional: 3880, enterprise: 1596 },
  { month: 'Out/25', profissional: 4328, enterprise: 1596 },
  { month: 'Nov/25', profissional: 4627, enterprise: 1596 },
  { month: 'Dez/25', profissional: 4776, enterprise: 1596 },
  { month: 'Jan/26', profissional: 5224, enterprise: 1596 },
  { month: 'Fev/26', profissional: 5671, enterprise: 1596 },
];

const methodLabels: Record<string, string> = {
  pix: 'Pix',
  credit_card: 'Cartao',
  boleto: 'Boleto',
};

export default function FinanceiroPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');

  // ===== KPIs =====
  const activeClients = mockClients.filter(c => c.status === 'active' || c.status === 'overdue');
  const mrrTotal = activeClients.reduce((sum, c) => sum + c.mrr, 0);
  const arrTotal = mrrTotal * 12;

  const receitaMes = mockTransactions
    .filter(t => t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const inadimplenciaTotal = mockTransactions
    .filter(t => t.status === 'overdue')
    .reduce((sum, t) => sum + t.amount, 0);

  const paidClients = activeClients.filter(c => c.mrr > 0);
  const ticketMedio = paidClients.length > 0 ? mrrTotal / paidClients.length : 0;
  const ltvMedio = ticketMedio * 18;

  // ===== Filtros da tabela =====
  const filteredTransactions = mockTransactions.filter(t => {
    const matchesSearch =
      !search || t.clientName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || t.status === statusFilter;
    const matchesPeriod = (() => {
      if (periodFilter === 'all') return true;
      const txDate = new Date(t.date);
      const now = new Date();
      if (periodFilter === '7d') {
        const diff = (now.getTime() - txDate.getTime()) / 86400000;
        return diff <= 7;
      }
      if (periodFilter === '30d') {
        const diff = (now.getTime() - txDate.getTime()) / 86400000;
        return diff <= 30;
      }
      if (periodFilter === '90d') {
        const diff = (now.getTime() - txDate.getTime()) / 86400000;
        return diff <= 90;
      }
      return true;
    })();

    return matchesSearch && matchesStatus && matchesPeriod;
  });

  // ===== Inadimplentes =====
  const overdueClients = mockClients.filter(c => c.status === 'overdue');

  function getDaysOverdue(lastLogin: string): number {
    const now = new Date();
    const last = new Date(lastLogin);
    return Math.floor((now.getTime() - last.getTime()) / 86400000);
  }

  // Reset filtros ao mudar busca
  function handleSearchChange(value: string) {
    setSearch(value);
  }

  function handleStatusFilterChange(value: string) {
    setStatusFilter(value);
  }

  function handlePeriodFilterChange(value: string) {
    setPeriodFilter(value);
  }

  // Custom tooltip para graficos
  const currencyTooltipFormatter = (value: number | undefined) => formatCurrency(value ?? 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financeiro</h1>
          <p className="text-sm text-slate-500 mt-1">
            Acompanhe receitas, MRR e cobrancas
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          Exportar Relatorio
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="MRR Total"
          value={formatCurrency(mrrTotal)}
          change={6.9}
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatsCard
          title="ARR"
          value={formatCurrency(arrTotal)}
          change={6.9}
          icon={TrendingUp}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard
          title="Receita do Mes"
          value={formatCurrency(receitaMes)}
          change={8.2}
          icon={CreditCard}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatsCard
          title="Inadimplencia Total"
          value={formatCurrency(inadimplenciaTotal)}
          change={-15.0}
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard
          title="LTV Medio"
          value={formatCurrency(ltvMedio)}
          change={3.2}
          icon={DollarSign}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
        />
      </div>

      {/* Graficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafico de Linha - Evolucao da Receita */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Evolucao da Receita
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrHistory}>
                <defs>
                  <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
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
                <Tooltip
                  formatter={currencyTooltipFormatter}
                  labelStyle={{ color: '#1E293B', fontWeight: 600 }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  name="MRR"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }}
                  fill="url(#mrrGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafico de Barras Empilhadas - Receita por Plano */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Receita por Plano
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByPlan}>
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
                <Tooltip
                  formatter={currencyTooltipFormatter}
                  labelStyle={{ color: '#1E293B', fontWeight: 600 }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', color: '#64748B' }}
                />
                <Bar
                  dataKey="profissional"
                  name="Profissional"
                  stackId="revenue"
                  fill="#2563EB"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="enterprise"
                  name="Enterprise"
                  stackId="revenue"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filtros da Tabela */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome do cliente..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Todos os status</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="overdue">Atrasado</option>
            </select>

            <select
              value={periodFilter}
              onChange={(e) => handlePeriodFilterChange(e.target.value)}
              className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Todos os periodos</option>
              <option value="7d">Ultimos 7 dias</option>
              <option value="30d">Ultimos 30 dias</option>
              <option value="90d">Ultimos 90 dias</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabela de Transacoes */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Transacoes</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {filteredTransactions.length} transacao(oes) encontrada(s)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Plano
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Metodo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-900">
                      {tx.clientName}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {formatCurrency(tx.amount)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-600">
                      {formatDate(tx.date)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge variant={tx.status} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-600">{tx.plan}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-600">
                      {methodLabels[tx.method] || tx.method}
                    </p>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <p className="text-sm text-slate-500">
                      Nenhuma transacao encontrada com os filtros selecionados.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secao Inadimplentes */}
      {overdueClients.length > 0 && (
        <div className="bg-white rounded-xl border border-red-200">
          <div className="px-5 py-4 border-b border-red-200 bg-red-50 rounded-t-xl">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-red-900">
                Inadimplentes
              </h2>
            </div>
            <p className="text-sm text-red-600 mt-0.5">
              {overdueClients.length} cliente(s) com pagamento em atraso
            </p>
          </div>

          <div className="divide-y divide-red-100">
            {overdueClients.map((client) => {
              const daysOverdue = getDaysOverdue(client.lastLogin);
              return (
                <div
                  key={client.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {client.clinicName}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {client.responsible} - {client.city}/{client.state}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-bold text-red-700">
                        {formatCurrency(client.mrr)}
                      </p>
                      <p className="text-xs text-red-500">valor devido</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm font-bold text-red-700">
                        {daysOverdue} dias
                      </p>
                      <p className="text-xs text-red-500">de atraso</p>
                    </div>

                    <button className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                      Enviar Lembrete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
