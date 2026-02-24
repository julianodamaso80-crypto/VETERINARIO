'use client';

import { useState } from 'react';
import {
  Settings,
  Building,
  Bell,
  Shield,
  Palette,
  Save,
  Globe,
  Mail,
  CreditCard,
  Key,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
} from 'lucide-react';

type Tab = 'geral' | 'notificacoes' | 'pagamentos' | 'seguranca' | 'aparencia';

const tabs = [
  { id: 'geral' as Tab, label: 'Geral', icon: Building },
  { id: 'notificacoes' as Tab, label: 'Notificacoes', icon: Bell },
  { id: 'pagamentos' as Tab, label: 'Pagamentos', icon: CreditCard },
  { id: 'seguranca' as Tab, label: 'Seguranca', icon: Shield },
  { id: 'aparencia' as Tab, label: 'Aparencia', icon: Palette },
];

export default function AdminConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('geral');
  const [saved, setSaved] = useState(false);

  // Geral
  const [platformName, setPlatformName] = useState('PetPro');
  const [platformEmail, setPlatformEmail] = useState('contato@petpro.site');
  const [platformUrl, setPlatformUrl] = useState('https://petpro.site');
  const [supportEmail, setSupportEmail] = useState('suporte@petpro.site');

  // Notificações
  const [notifyNewClient, setNotifyNewClient] = useState(true);
  const [notifyPayment, setNotifyPayment] = useState(true);
  const [notifyOverdue, setNotifyOverdue] = useState(true);
  const [notifyTicket, setNotifyTicket] = useState(true);
  const [notifyTrialExpiring, setNotifyTrialExpiring] = useState(true);
  const [notifyWeeklyReport, setNotifyWeeklyReport] = useState(false);

  // Pagamentos
  const [paymentGateway, setPaymentGateway] = useState('stripe');
  const [trialDays, setTrialDays] = useState('14');
  const [gracePeriod, setGracePeriod] = useState('7');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!enabled)} className="flex-shrink-0">
      {enabled ? (
        <ToggleRight className="w-10 h-6 text-blue-600" />
      ) : (
        <ToggleLeft className="w-10 h-6 text-slate-300" />
      )}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configuracoes</h1>
        <p className="text-slate-500 mt-1">Ajustes gerais da plataforma PetPro</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {/* Tab Geral */}
        {activeTab === 'geral' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Informacoes da Plataforma
              </h2>
              <p className="text-sm text-slate-500 mt-1">Dados basicos da sua plataforma SaaS</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome da Plataforma</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Principal</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={platformEmail}
                    onChange={(e) => setPlatformEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">URL da Plataforma</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={platformUrl}
                    onChange={(e) => setPlatformUrl(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email de Suporte</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Notificações */}
        {activeTab === 'notificacoes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notificacoes por Email
              </h2>
              <p className="text-sm text-slate-500 mt-1">Escolha quais notificacoes deseja receber</p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Novo cliente cadastrado', desc: 'Receba um email quando um novo cliente se cadastrar', value: notifyNewClient, set: setNotifyNewClient },
                { label: 'Pagamento recebido', desc: 'Notificacao quando um pagamento for confirmado', value: notifyPayment, set: setNotifyPayment },
                { label: 'Pagamento atrasado', desc: 'Alerta quando um cliente atrasar o pagamento', value: notifyOverdue, set: setNotifyOverdue },
                { label: 'Novo ticket de suporte', desc: 'Notificacao quando um ticket for aberto', value: notifyTicket, set: setNotifyTicket },
                { label: 'Trial expirando', desc: 'Alerta quando um trial estiver perto de expirar', value: notifyTrialExpiring, set: setNotifyTrialExpiring },
                { label: 'Relatorio semanal', desc: 'Resumo semanal com metricas da plataforma', value: notifyWeeklyReport, set: setNotifyWeeklyReport },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle enabled={item.value} onChange={item.set} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Pagamentos */}
        {activeTab === 'pagamentos' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Configuracoes de Pagamento
              </h2>
              <p className="text-sm text-slate-500 mt-1">Configure o gateway de pagamento e regras de cobranca</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Gateway de Pagamento</label>
                <select
                  value={paymentGateway}
                  onChange={(e) => setPaymentGateway(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="stripe">Stripe</option>
                  <option value="mercadopago">Mercado Pago</option>
                  <option value="pagarme">Pagar.me</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Dias de Trial</label>
                  <input
                    type="number"
                    value={trialDays}
                    onChange={(e) => setTrialDays(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Periodo gratuito para novos clientes</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Periodo de Carencia (dias)</label>
                  <input
                    type="number"
                    value={gracePeriod}
                    onChange={(e) => setGracePeriod(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Dias de tolerancia antes de suspender conta</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Key className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Chaves de API</p>
                    <p className="text-xs text-amber-600 mt-1">
                      As chaves de API do gateway de pagamento devem ser configuradas nas variaveis de ambiente do servidor por seguranca.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Segurança */}
        {activeTab === 'seguranca' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Seguranca
              </h2>
              <p className="text-sm text-slate-500 mt-1">Configuracoes de seguranca da plataforma</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">Autenticacao de dois fatores (2FA)</p>
                  <p className="text-xs text-slate-500 mt-0.5">Exigir 2FA para todos os administradores</p>
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Em breve</span>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">Politica de senhas</p>
                  <p className="text-xs text-slate-500 mt-0.5">Minimo 8 caracteres, 1 maiuscula, 1 numero</p>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Ativo</span>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">Sessoes ativas</p>
                  <p className="text-xs text-slate-500 mt-0.5">Tempo maximo de sessao: 24 horas</p>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Ativo</span>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-900">Rate Limiting</p>
                  <p className="text-xs text-slate-500 mt-0.5">Limite de 100 requisicoes/minuto por cliente</p>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Ativo</span>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">Backup automatico</p>
                  <p className="text-xs text-slate-500 mt-0.5">Backup diario as 06:00 UTC</p>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Ativo</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Aparência */}
        {activeTab === 'aparencia' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" />
                Aparencia
              </h2>
              <p className="text-sm text-slate-500 mt-1">Personalize a aparencia da plataforma</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Cor Primaria</label>
                <div className="flex gap-3">
                  {['#2563EB', '#4F46E5', '#7C3AED', '#059669', '#DC2626', '#EA580C'].map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-lg border-2 border-slate-200 hover:border-slate-400 transition-colors flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      {color === '#2563EB' && <CheckCircle className="w-5 h-5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600">
                  Mais opcoes de personalizacao estarao disponiveis em breve, incluindo logotipo customizado,
                  temas escuros e personalizacao de emails transacionais.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex items-center justify-end mt-8 pt-6 border-t border-slate-200">
          {saved && (
            <div className="flex items-center gap-2 mr-4 text-emerald-600 animate-in fade-in duration-300">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Salvo com sucesso!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Salvar Alteracoes
          </button>
        </div>
      </div>
    </div>
  );
}
