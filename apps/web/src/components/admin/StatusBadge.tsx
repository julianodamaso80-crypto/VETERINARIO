'use client';

type BadgeVariant = 'active' | 'trial' | 'cancelled' | 'overdue' | 'paid' | 'pending' | 'refunded' |
  'open' | 'in_progress' | 'resolved' | 'closed' | 'high' | 'medium' | 'low' |
  'info' | 'warning' | 'error' | 'free' | 'professional' | 'enterprise';

const variantStyles: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  trial: 'bg-amber-50 text-amber-700 border-amber-200',
  cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
  overdue: 'bg-red-50 text-red-700 border-red-200',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  refunded: 'bg-slate-100 text-slate-600 border-slate-200',
  open: 'bg-blue-50 text-blue-700 border-blue-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
  resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  closed: 'bg-slate-100 text-slate-600 border-slate-200',
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  free: 'bg-slate-100 text-slate-600 border-slate-200',
  professional: 'bg-blue-50 text-blue-700 border-blue-200',
  enterprise: 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

const variantLabels: Record<string, string> = {
  active: 'Ativo',
  trial: 'Trial',
  cancelled: 'Cancelado',
  overdue: 'Inadimplente',
  paid: 'Pago',
  pending: 'Pendente',
  refunded: 'Estornado',
  open: 'Aberto',
  in_progress: 'Em andamento',
  resolved: 'Resolvido',
  closed: 'Fechado',
  high: 'Alta',
  medium: 'Media',
  low: 'Baixa',
  info: 'Info',
  warning: 'Alerta',
  error: 'Erro',
  free: 'Gratuito',
  professional: 'Profissional',
  enterprise: 'Enterprise',
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
}

export default function StatusBadge({ variant, label }: StatusBadgeProps) {
  const style = variantStyles[variant] || variantStyles.active;
  const text = label || variantLabels[variant] || variant;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      {text}
    </span>
  );
}
