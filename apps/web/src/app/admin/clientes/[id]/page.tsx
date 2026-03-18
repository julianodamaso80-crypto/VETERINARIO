'use client';

import StatusBadge from '@/components/admin/StatusBadge';
import StatsCard from '@/components/admin/StatsCard';
import {
  mockClients,
  mockTransactions,
  mockTickets,
  formatCurrency,
  formatDate,
  formatDateTime,
  timeAgo,
  getPlanLabel,
} from '@/data/admin-mock';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  PawPrint,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';

const methodLabels: Record<string, string> = {
  pix: 'PIX',
  credit_card: 'Cartao de Credito',
  boleto: 'Boleto',
};

export default function ClientDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle className="w-16 h-16 text-slate-300" />
        <h1 className="text-2xl font-bold text-slate-700">Cliente nao encontrado</h1>
        <p className="text-slate-500">O cliente com ID &quot;{id}&quot; nao foi encontrado no sistema.</p>
        <Link
          href="/admin/clientes"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Clientes
        </Link>
      </div>
    );
  }

  const clientTransactions = mockTransactions.filter((t) => t.clientId === client.id);
  const clientTickets = mockTickets.filter((t) => t.clientId === client.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <Link
            href="/admin/clientes"
            className="mt-1 p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{client.clinicName}</h1>
            <div className="flex items-center gap-2 mt-1.5">
              <StatusBadge variant={client.plan as any} />
              <StatusBadge variant={client.status} />
              {client.trialEndsAt && (
                <span className="text-xs text-slate-500">
                  Trial expira em {formatDate(client.trialEndsAt)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-11 sm:ml-0">
          <button className="px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
            Alterar Plano
          </button>
          <button className="px-3 py-2 text-sm font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
            Suspender Conta
          </button>
          <button className="px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Enviar Mensagem
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Informacoes do Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Responsavel</p>
              <p className="text-sm font-medium text-slate-900">{client.responsible}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="text-sm font-medium text-slate-900">{client.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Telefone</p>
              <p className="text-sm font-medium text-slate-900">{client.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500">CNPJ</p>
              <p className="text-sm font-medium text-slate-900">{client.cnpj}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Cidade / Estado</p>
              <p className="text-sm font-medium text-slate-900">{client.city} / {client.state}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Data de Cadastro</p>
              <p className="text-sm font-medium text-slate-900">{formatDate(client.registeredAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total de Pets"
          value={client.petsCount.toLocaleString('pt-BR')}
          icon={PawPrint}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard
          title="Total de Tutores"
          value={client.tutorsCount.toLocaleString('pt-BR')}
          icon={Users}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatsCard
          title="Agendamentos/Mes"
          value={client.appointmentsMonth.toLocaleString('pt-BR')}
          icon={Calendar}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatsCard
          title="Receita Mensal"
          value={formatCurrency(client.revenueMonth)}
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard
          title="Ultimo Login"
          value={timeAgo(client.lastLogin)}
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      {/* Historico de Pagamentos */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900">Historico de Pagamentos</h2>
        </div>
        {clientTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Metodo</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plano</th>
                </tr>
              </thead>
              <tbody>
                {clientTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-slate-700">{formatDate(tx.date)}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{formatCurrency(tx.amount)}</td>
                    <td className="py-3 px-4"><StatusBadge variant={tx.status} /></td>
                    <td className="py-3 px-4 text-slate-700">{methodLabels[tx.method] || tx.method}</td>
                    <td className="py-3 px-4 text-slate-700">{tx.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <CreditCard className="w-10 h-10 text-slate-200 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Nenhuma transacao encontrada</p>
          </div>
        )}
      </div>

      {/* Tickets de Suporte */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900">Tickets de Suporte</h2>
        </div>
        {clientTickets.length > 0 ? (
          <div className="space-y-3">
            {clientTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{ticket.subject}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Aberto em {formatDateTime(ticket.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge variant={ticket.priority} />
                  <StatusBadge variant={ticket.status} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Nenhum ticket</p>
          </div>
        )}
      </div>
    </div>
  );
}
