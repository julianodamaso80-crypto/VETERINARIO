import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    period: '/mes',
    features: ['Ate 50 tutores', 'Agendamentos basicos', '1 usuario'],
    current: true,
  },
  {
    name: 'Profissional',
    price: 'R$ 149',
    period: '/mes',
    features: [
      'Tutores ilimitados',
      'WhatsApp integrado',
      'Ate 5 usuarios',
      'Relatorios avancados',
    ],
    highlighted: true,
  },
  {
    name: 'Empresarial',
    price: 'R$ 299',
    period: '/mes',
    features: [
      'Tudo do Profissional',
      'Usuarios ilimitados',
      'Suporte prioritario',
      'API personalizada',
    ],
  },
];

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Crown className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Planos PetPro</h1>
        <p className="text-gray-600 mt-2">
          Escolha o plano ideal para o seu negocio
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={
              plan.highlighted ? 'border-2 border-primary shadow-lg' : ''
            }
          >
            <CardHeader className="text-center">
              <CardTitle>{plan.name}</CardTitle>
              <div className="text-3xl font-bold mt-2">
                {plan.price}
                <span className="text-sm font-normal text-gray-500">
                  {plan.period}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.current ? 'outline' : 'default'}
                disabled={plan.current}
              >
                {plan.current ? 'Plano Atual' : 'Em breve'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/dashboard" className="text-primary hover:underline text-sm">
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  );
}
