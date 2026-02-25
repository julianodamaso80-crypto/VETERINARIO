'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { maskPhone } from '@/lib/utils';
import { Calendar, Clock, PawPrint, Check, ArrowLeft, ArrowRight, Dog, Cat, Bird } from 'lucide-react';
import Link from 'next/link';

const speciesLabels: Record<string, string> = {
  DOG: 'Cachorro',
  CAT: 'Gato',
  BIRD: 'Ave',
  RODENT: 'Roedor',
  REPTILE: 'Reptil',
  FISH: 'Peixe',
  OTHER: 'Outro',
};

export default function PublicBookingPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    petName: '',
    petSpecies: 'DOG',
    notes: '',
  });

  const { data: business, isLoading: loadingBusiness } = useQuery({
    queryKey: ['public-business', params.slug],
    queryFn: async () => {
      const response = await api.get(`/businesses/slug/${params.slug}`);
      return response.data;
    },
  });

  const { data: services } = useQuery({
    queryKey: ['public-services', params.slug],
    queryFn: async () => {
      const response = await api.get(`/businesses/slug/${params.slug}/services`);
      return response.data;
    },
    enabled: !!business,
  });

  const selectedService = services?.find((s: any) => s.id === formData.serviceId);

  const bookMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.post(`/businesses/slug/${params.slug}/book`, data);
      return response.data;
    },
    onSuccess: () => {
      setStep(5); // success screen
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao agendar',
        description: error.response?.data?.message || 'Tente novamente',
        variant: 'destructive',
      });
    },
  });

  const canProceed = () => {
    switch (step) {
      case 1: return !!formData.serviceId;
      case 2: return !!formData.date && !!formData.time;
      case 3: return !!formData.name && !!formData.phone && !!formData.petName;
      default: return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      bookMutation.mutate(formData);
    }
  };

  if (loadingBusiness) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <PawPrint className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Estabelecimento nao encontrado</h2>
            <p className="text-gray-500">Verifique o link e tente novamente.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success screen
  if (step === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Agendamento Solicitado!</h2>
            <p className="text-gray-600 mb-6">
              Sua solicitacao foi enviada para {business.name}.
              Voce recebera uma confirmacao em breve.
            </p>
            <Button onClick={() => { setStep(1); setFormData({ serviceId: '', date: '', time: '', name: '', phone: '', email: '', petName: '', petSpecies: 'DOG', notes: '' }); }}>
              Fazer novo agendamento
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">{business.name}</span>
            </div>
            {business.phone && (
              <span className="text-sm text-gray-600">{business.phone}</span>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Agendar Atendimento</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para solicitar seu agendamento
            </CardDescription>

            {/* Progress */}
            <div className="flex justify-center gap-2 mt-6">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-12 h-2 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-200'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">Etapa {step} de {totalSteps}</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Service */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Escolha o Servico</h3>
                  <div className="space-y-2">
                    {services?.map((service: any) => (
                      <label
                        key={service.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.serviceId === service.id
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="service"
                            value={service.id}
                            checked={formData.serviceId === service.id}
                            onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                            className="h-4 w-4 text-primary"
                          />
                          <div>
                            <p className="font-medium">{service.name}</p>
                            {service.description && (
                              <p className="text-sm text-gray-500">{service.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            R$ {Number(service.price).toFixed(2).replace('.', ',')}
                          </p>
                          <p className="text-xs text-gray-500">{service.duration} min</p>
                        </div>
                      </label>
                    ))}
                    {(!services || services.length === 0) && (
                      <p className="text-center text-gray-500 py-4">
                        Nenhum servico disponivel no momento.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Data e Horario</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Data desejada *</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Horario desejado *</label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                  {selectedService && (
                    <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Duracao estimada: {selectedService.duration} minutos
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Contact & Pet Info */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Seus Dados</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Seu nome *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">WhatsApp *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome do Pet *</label>
                    <Input
                      value={formData.petName}
                      onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                      placeholder="Nome do seu pet"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Especie</label>
                    <select
                      value={formData.petSpecies}
                      onChange={(e) => setFormData({ ...formData, petSpecies: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {Object.entries(speciesLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Observacoes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Alguma observacao importante sobre seu pet..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Confirmar Agendamento</h3>
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Servico</span>
                      <span className="font-medium">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data</span>
                      <span className="font-medium">
                        {formData.date && new Date(formData.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horario</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-gray-600">Tutor</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Telefone</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pet</span>
                      <span className="font-medium">{formData.petName} ({speciesLabels[formData.petSpecies]})</span>
                    </div>
                    {selectedService && (
                      <div className="border-t pt-3 flex justify-between text-lg">
                        <span className="font-semibold">Valor</span>
                        <span className="font-bold text-primary">
                          R$ {Number(selectedService.price).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    )}
                  </div>
                  {formData.notes && (
                    <div className="p-3 bg-amber-50 rounded-lg text-sm">
                      <p className="font-medium text-amber-800 mb-1">Observacoes:</p>
                      <p className="text-amber-700">{formData.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                ) : (
                  <div />
                )}
                <Button type="submit" disabled={!canProceed() || bookMutation.isPending}>
                  {step < totalSteps ? (
                    <>
                      Proximo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  ) : bookMutation.isPending ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Confirmar Agendamento
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
