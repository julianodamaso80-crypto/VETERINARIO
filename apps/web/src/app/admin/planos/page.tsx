'use client';

import StatusBadge from '@/components/admin/StatusBadge';
import { mockPlans, mockClients, formatCurrency, Plan } from '@/data/admin-mock';
import { useState } from 'react';
import { CreditCard, Users, Check, Edit2, Plus, Star, PawPrint, Zap } from 'lucide-react';

export default function PlanosPage() {
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Modal form state
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formFeatures, setFormFeatures] = useState('');
  const [formMaxPets, setFormMaxPets] = useState(0);
  const [formMaxUsers, setFormMaxUsers] = useState(0);

  const totalClients = mockPlans.reduce((sum, p) => sum + p.clientsCount, 0);

  function openEditModal(plan: Plan) {
    setEditingPlan(plan);
    setFormName(plan.name);
    setFormPrice(plan.price);
    setFormFeatures(plan.features.join('\n'));
    setFormMaxPets(plan.maxPets === -1 ? 0 : plan.maxPets);
    setFormMaxUsers(plan.maxUsers === -1 ? 0 : plan.maxUsers);
    setModalOpen(true);
  }

  function openNewModal() {
    setEditingPlan(null);
    setFormName('');
    setFormPrice(0);
    setFormFeatures('');
    setFormMaxPets(0);
    setFormMaxUsers(0);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingPlan(null);
  }

  function getPlanIcon(slug: string) {
    switch (slug) {
      case 'free':
        return <PawPrint className="w-6 h-6 text-slate-500" />;
      case 'professional':
        return <Zap className="w-6 h-6 text-blue-600" />;
      case 'enterprise':
        return <CreditCard className="w-6 h-6 text-indigo-600" />;
      default:
        return <PawPrint className="w-6 h-6 text-slate-500" />;
    }
  }

  // Calculate revenue summary
  const revenueSummary = mockPlans.map((plan) => {
    const activeClientsOnPlan = mockClients.filter(
      (c) =>
        (c.plan === plan.slug || (plan.slug === 'free' && c.plan === 'free')) &&
        (c.status === 'active' || c.status === 'overdue')
    ).length;
    return {
      plan: plan.name,
      slug: plan.slug,
      clients: activeClientsOnPlan,
      revenue: activeClientsOnPlan * plan.price,
    };
  });

  const totalMRR = revenueSummary.reduce((sum, r) => sum + r.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Planos</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie os planos e precos da plataforma
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Plano
        </button>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlans.map((plan) => {
          const percentage =
            totalClients > 0
              ? ((plan.clientsCount / totalClients) * 100).toFixed(1)
              : '0';

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl border p-6 transition-shadow ${
                plan.isPopular
                  ? 'border-blue-500 shadow-lg shadow-blue-500/10 bg-blue-50/30'
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    <Star className="w-3 h-3 fill-white" />
                    Popular
                  </span>
                </div>
              )}

              {/* Plan Icon & Name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    plan.isPopular
                      ? 'bg-blue-100'
                      : plan.slug === 'enterprise'
                      ? 'bg-indigo-50'
                      : 'bg-slate-100'
                  }`}
                >
                  {getPlanIcon(plan.slug)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <StatusBadge variant={plan.slug as 'free' | 'professional' | 'enterprise'} />
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                {plan.price === 0 ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">Gratuito</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-sm text-slate-500">/mes</span>
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="space-y-2.5 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limits */}
              <div className="border-t border-slate-200 pt-4 mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <PawPrint className="w-4 h-4 text-slate-400" />
                  <span>
                    {plan.maxPets === -1 ? 'Pets ilimitados' : `Ate ${plan.maxPets} pets`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>
                    {plan.maxUsers === -1
                      ? 'Usuarios ilimitados'
                      : `Ate ${plan.maxUsers} usuarios`}
                  </span>
                </div>
              </div>

              {/* Clients on this plan */}
              <div className="border-t border-slate-200 pt-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {plan.clientsCount} clientes ativos
                    </p>
                    <p className="text-xs text-slate-500">{percentage}% da base</p>
                  </div>
                  <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        plan.isPopular
                          ? 'bg-blue-500'
                          : plan.slug === 'enterprise'
                          ? 'bg-indigo-500'
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => openEditModal(plan)}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  plan.isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
            </div>
          );
        })}
      </div>

      {/* Revenue Summary */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Resumo da Receita por Plano</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {revenueSummary.map((item) => (
            <div
              key={item.slug}
              className="bg-white rounded-xl border border-slate-200 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                {getPlanIcon(item.slug)}
                <h3 className="text-sm font-semibold text-slate-700">{item.plan}</h3>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Clientes</span>
                  <span className="text-sm font-medium text-slate-900">{item.clients}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Receita mensal</span>
                  <span className="text-sm font-bold text-slate-900">
                    {formatCurrency(item.revenue)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Total MRR Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-6 h-6 text-blue-200" />
              <h3 className="text-sm font-semibold text-blue-100">MRR Total</h3>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(totalMRR)}</p>
            <p className="text-xs text-blue-200 mt-1">Receita Mensal Recorrente</p>
          </div>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingPlan ? `Editar Plano - ${editingPlan.name}` : 'Novo Plano'}
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nome do plano
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ex: Profissional"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Preco */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Preco (R$)
                </label>
                <input
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  min={0}
                  step={1}
                  placeholder="149"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Features (uma por linha)
                </label>
                <textarea
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  rows={5}
                  placeholder={"Agenda completa\nProntuario eletronico\nWhatsApp"}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Max Pets & Max Users */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max pets
                  </label>
                  <input
                    type="number"
                    value={formMaxPets}
                    onChange={(e) => setFormMaxPets(Number(e.target.value))}
                    min={0}
                    placeholder="500"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-slate-400 mt-1">0 = ilimitado</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max usuarios
                  </label>
                  <input
                    type="number"
                    value={formMaxUsers}
                    onChange={(e) => setFormMaxUsers(Number(e.target.value))}
                    min={0}
                    placeholder="5"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-slate-400 mt-1">0 = ilimitado</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
