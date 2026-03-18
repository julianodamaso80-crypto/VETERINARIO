'use client';

import StatusBadge from '@/components/admin/StatusBadge';
import EmptyState from '@/components/admin/EmptyState';
import { mockTickets, formatDateTime, SupportTicket } from '@/data/admin-mock';
import { useState } from 'react';
import {
  Headphones,
  Search,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Send,
  User,
} from 'lucide-react';

export default function SuportePage() {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});

  // KPI counts
  const totalTickets = mockTickets.length;
  const openTickets = mockTickets.filter((t) => t.status === 'open').length;
  const inProgressTickets = mockTickets.filter((t) => t.status === 'in_progress').length;
  const resolvedTickets = mockTickets.filter(
    (t) => t.status === 'resolved' || t.status === 'closed'
  ).length;

  // Filter and search
  const filteredTickets = mockTickets.filter((ticket) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !search ||
      ticket.subject.toLowerCase().includes(searchLower) ||
      ticket.clientName.toLowerCase().includes(searchLower);

    const matchesPriority =
      priorityFilter === 'all' || ticket.priority === priorityFilter;

    const matchesStatus =
      statusFilter === 'all' || ticket.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  function toggleExpand(ticketId: string) {
    setExpandedTicket((prev) => (prev === ticketId ? null : ticketId));
  }

  function handleReplyChange(ticketId: string, value: string) {
    setReplyTexts((prev) => ({ ...prev, [ticketId]: value }));
  }

  function getInitial(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  function isStaffMessage(sender: string): boolean {
    const staffNames = ['Suporte', 'Suporte Tech', 'Produto'];
    return staffNames.includes(sender);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Suporte</h1>
        <p className="text-sm text-slate-500 mt-1">
          Gerencie tickets de suporte dos clientes
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total de Tickets</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{totalTickets}</p>
            </div>
            <div className="w-11 h-11 bg-slate-100 rounded-lg flex items-center justify-center">
              <Headphones className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Abertos</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{openTickets}</p>
            </div>
            <div className="w-11 h-11 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Em Andamento</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{inProgressTickets}</p>
            </div>
            <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Resolvidos</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{resolvedTickets}</p>
            </div>
            <div className="w-11 h-11 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por assunto ou cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Todas as prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baixa</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Todos os status</option>
              <option value="open">Aberto</option>
              <option value="in_progress">Em andamento</option>
              <option value="resolved">Resolvido</option>
              <option value="closed">Fechado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200">
            <EmptyState
              title="Nenhum ticket encontrado"
              description="Tente ajustar os filtros ou o termo de busca para encontrar o que procura."
            />
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const isExpanded = expandedTicket === ticket.id;
            const replyText = replyTexts[ticket.id] || '';

            return (
              <div
                key={ticket.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
              >
                {/* Ticket Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleExpand(ticket.id)}
                >
                  {/* Line 1: ID, Subject, Priority */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-xs font-mono text-slate-400">
                      #{ticket.id}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 flex-1">
                      {ticket.subject}
                    </h3>
                    <StatusBadge variant={ticket.priority} />
                  </div>

                  {/* Line 2: Client, Status, Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {ticket.clientName}
                      </span>
                    </div>
                    <StatusBadge variant={ticket.status} />
                    <span className="text-xs text-slate-400">
                      {formatDateTime(ticket.createdAt)}
                    </span>
                  </div>

                  {/* Line 3: Assignee + Expand Button */}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      {ticket.assignedTo && (
                        <span className="text-xs text-slate-500">
                          Atribuido a:{' '}
                          <span className="font-medium text-slate-700">
                            {ticket.assignedTo}
                          </span>
                        </span>
                      )}
                    </div>
                    <button
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(ticket.id);
                      }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      {ticket.messages.length} mensage{ticket.messages.length === 1 ? 'm' : 'ns'}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded: Messages */}
                {isExpanded && (
                  <div className="border-t border-slate-200 p-4">
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {ticket.messages.map((msg, idx) => {
                        const staff = isStaffMessage(msg.sender);
                        return (
                          <div
                            key={idx}
                            className={`flex gap-3 ${staff ? 'flex-row-reverse' : ''}`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                                staff
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {getInitial(msg.sender)}
                            </div>
                            <div
                              className={`flex-1 max-w-[80%] ${
                                staff ? 'text-right' : ''
                              }`}
                            >
                              <div
                                className={`flex items-center gap-2 mb-1 ${
                                  staff ? 'justify-end' : ''
                                }`}
                              >
                                <span className="text-xs font-semibold text-slate-700">
                                  {msg.sender}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {formatDateTime(msg.date)}
                                </span>
                              </div>
                              <div
                                className={`inline-block rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                                  staff
                                    ? 'bg-blue-50 text-blue-900 rounded-tr-sm'
                                    : 'bg-slate-50 text-slate-800 rounded-tl-sm'
                                }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reply Input */}
                    <div className="mt-4 flex gap-3">
                      <textarea
                        value={replyText}
                        onChange={(e) =>
                          handleReplyChange(ticket.id, e.target.value)
                        }
                        placeholder="Escreva sua resposta..."
                        rows={2}
                        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <button className="self-end inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <Send className="w-4 h-4" />
                        Enviar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Metrics Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Metricas de Suporte
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">2h 15min</p>
            <p className="text-sm text-slate-500 mt-1">Tempo medio de resposta</p>
          </div>

          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">87%</p>
            <p className="text-sm text-slate-500 mt-1">Taxa de resolucao</p>
          </div>

          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Headphones className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">4.5/5</p>
            <p className="text-sm text-slate-500 mt-1">Satisfacao dos clientes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
