// ============================================
// PETPRO ADMIN - DADOS MOCK
// ============================================

export interface SaaSClient {
  id: string;
  clinicName: string;
  responsible: string;
  email: string;
  phone: string;
  cnpj: string;
  plan: 'free' | 'professional' | 'enterprise' | 'trial';
  status: 'active' | 'trial' | 'cancelled' | 'overdue';
  city: string;
  state: string;
  petsCount: number;
  tutorsCount: number;
  appointmentsMonth: number;
  revenueMonth: number;
  mrr: number;
  registeredAt: string;
  lastLogin: string;
  trialEndsAt?: string;
}

export interface Transaction {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
  plan: string;
  method: 'pix' | 'credit_card' | 'boleto';
  invoiceUrl?: string;
}

export interface SupportTicket {
  id: string;
  clientId: string;
  clientName: string;
  subject: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: { sender: string; text: string; date: string }[];
}

export interface SystemLog {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  details?: string;
  clientId?: string;
  clientName?: string;
  timestamp: string;
  source: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  price: number;
  features: string[];
  maxPets: number;
  maxUsers: number;
  clientsCount: number;
  isPopular?: boolean;
}

// ============================================
// CLIENTES MOCK (25+)
// ============================================
export const mockClients: SaaSClient[] = [
  {
    id: 'c1',
    clinicName: 'Clinica Vet Vida Animal',
    responsible: 'Dr. Roberto Mendes',
    email: 'contato@vidaanimal.com.br',
    phone: '(11) 99876-5432',
    cnpj: '12.345.678/0001-01',
    plan: 'professional',
    status: 'active',
    city: 'Sao Paulo',
    state: 'SP',
    petsCount: 342,
    tutorsCount: 198,
    appointmentsMonth: 87,
    revenueMonth: 28500,
    mrr: 149,
    registeredAt: '2025-08-15',
    lastLogin: '2026-02-10',
  },
  {
    id: 'c2',
    clinicName: 'PetShop Amor & Patas',
    responsible: 'Carla Ferreira',
    email: 'carla@amorepatas.com.br',
    phone: '(21) 98765-4321',
    cnpj: '23.456.789/0001-02',
    plan: 'professional',
    status: 'active',
    city: 'Rio de Janeiro',
    state: 'RJ',
    petsCount: 256,
    tutorsCount: 145,
    appointmentsMonth: 63,
    revenueMonth: 19800,
    mrr: 149,
    registeredAt: '2025-09-02',
    lastLogin: '2026-02-09',
  },
  {
    id: 'c3',
    clinicName: 'Hotel Pet Paradise',
    responsible: 'Marcos Oliveira',
    email: 'marcos@petparadise.com.br',
    phone: '(31) 97654-3210',
    cnpj: '34.567.890/0001-03',
    plan: 'enterprise',
    status: 'active',
    city: 'Belo Horizonte',
    state: 'MG',
    petsCount: 512,
    tutorsCount: 287,
    appointmentsMonth: 134,
    revenueMonth: 45200,
    mrr: 399,
    registeredAt: '2025-07-20',
    lastLogin: '2026-02-10',
  },
  {
    id: 'c4',
    clinicName: 'Clinica Vet Dr. Patinhas',
    responsible: 'Dra. Juliana Costa',
    email: 'juliana@drpatinhas.com.br',
    phone: '(41) 96543-2109',
    cnpj: '45.678.901/0001-04',
    plan: 'professional',
    status: 'active',
    city: 'Curitiba',
    state: 'PR',
    petsCount: 189,
    tutorsCount: 112,
    appointmentsMonth: 45,
    revenueMonth: 15600,
    mrr: 149,
    registeredAt: '2025-10-01',
    lastLogin: '2026-02-08',
  },
  {
    id: 'c5',
    clinicName: 'AuMiau Pet Care',
    responsible: 'Pedro Santos',
    email: 'pedro@aumiau.com.br',
    phone: '(71) 95432-1098',
    cnpj: '56.789.012/0001-05',
    plan: 'free',
    status: 'active',
    city: 'Salvador',
    state: 'BA',
    petsCount: 45,
    tutorsCount: 28,
    appointmentsMonth: 12,
    revenueMonth: 3200,
    mrr: 0,
    registeredAt: '2025-12-10',
    lastLogin: '2026-02-07',
  },
  {
    id: 'c6',
    clinicName: 'Vet Center Esperanca',
    responsible: 'Dr. Andre Lima',
    email: 'andre@vetesperanca.com.br',
    phone: '(61) 94321-0987',
    cnpj: '67.890.123/0001-06',
    plan: 'professional',
    status: 'overdue',
    city: 'Brasilia',
    state: 'DF',
    petsCount: 167,
    tutorsCount: 89,
    appointmentsMonth: 34,
    revenueMonth: 12400,
    mrr: 149,
    registeredAt: '2025-09-15',
    lastLogin: '2026-01-28',
  },
  {
    id: 'c7',
    clinicName: 'Pet & Cia Floripa',
    responsible: 'Fernanda Ramos',
    email: 'fernanda@petcia.com.br',
    phone: '(48) 93210-9876',
    cnpj: '78.901.234/0001-07',
    plan: 'trial',
    status: 'trial',
    city: 'Florianopolis',
    state: 'SC',
    petsCount: 23,
    tutorsCount: 15,
    appointmentsMonth: 8,
    revenueMonth: 2100,
    mrr: 0,
    registeredAt: '2026-02-01',
    lastLogin: '2026-02-10',
    trialEndsAt: '2026-02-15',
  },
  {
    id: 'c8',
    clinicName: 'Mundo Animal Veterinaria',
    responsible: 'Dra. Camila Souza',
    email: 'camila@mundoanimal.vet.br',
    phone: '(51) 92109-8765',
    cnpj: '89.012.345/0001-08',
    plan: 'professional',
    status: 'active',
    city: 'Porto Alegre',
    state: 'RS',
    petsCount: 278,
    tutorsCount: 156,
    appointmentsMonth: 72,
    revenueMonth: 23400,
    mrr: 149,
    registeredAt: '2025-08-25',
    lastLogin: '2026-02-10',
  },
  {
    id: 'c9',
    clinicName: 'Bicho Bom Pet Shop',
    responsible: 'Lucas Almeida',
    email: 'lucas@bichobom.com.br',
    phone: '(85) 91098-7654',
    cnpj: '90.123.456/0001-09',
    plan: 'free',
    status: 'active',
    city: 'Fortaleza',
    state: 'CE',
    petsCount: 67,
    tutorsCount: 38,
    appointmentsMonth: 15,
    revenueMonth: 4800,
    mrr: 0,
    registeredAt: '2025-11-20',
    lastLogin: '2026-02-06',
  },
  {
    id: 'c10',
    clinicName: 'PetVet Premium',
    responsible: 'Dr. Ricardo Barros',
    email: 'ricardo@petvetpremium.com.br',
    phone: '(19) 90987-6543',
    cnpj: '01.234.567/0001-10',
    plan: 'enterprise',
    status: 'active',
    city: 'Campinas',
    state: 'SP',
    petsCount: 623,
    tutorsCount: 345,
    appointmentsMonth: 156,
    revenueMonth: 52800,
    mrr: 399,
    registeredAt: '2025-07-10',
    lastLogin: '2026-02-10',
  },
  {
    id: 'c11',
    clinicName: 'Caes & Gatos Clinica',
    responsible: 'Dra. Patricia Melo',
    email: 'patricia@caesegatos.com.br',
    phone: '(62) 99876-1234',
    cnpj: '11.222.333/0001-11',
    plan: 'professional',
    status: 'active',
    city: 'Goiania',
    state: 'GO',
    petsCount: 198,
    tutorsCount: 115,
    appointmentsMonth: 52,
    revenueMonth: 17200,
    mrr: 149,
    registeredAt: '2025-10-15',
    lastLogin: '2026-02-09',
  },
  {
    id: 'c12',
    clinicName: 'Happy Paws Veterinaria',
    responsible: 'Dr. Thiago Nunes',
    email: 'thiago@happypaws.vet.br',
    phone: '(27) 98765-5678',
    cnpj: '22.333.444/0001-12',
    plan: 'trial',
    status: 'trial',
    city: 'Vitoria',
    state: 'ES',
    petsCount: 12,
    tutorsCount: 8,
    appointmentsMonth: 5,
    revenueMonth: 900,
    mrr: 0,
    registeredAt: '2026-02-05',
    lastLogin: '2026-02-10',
    trialEndsAt: '2026-02-19',
  },
  {
    id: 'c13',
    clinicName: 'Zoo Vet Manaus',
    responsible: 'Dr. Felipe Araujo',
    email: 'felipe@zoovet.com.br',
    phone: '(92) 97654-9012',
    cnpj: '33.444.555/0001-13',
    plan: 'free',
    status: 'active',
    city: 'Manaus',
    state: 'AM',
    petsCount: 34,
    tutorsCount: 20,
    appointmentsMonth: 9,
    revenueMonth: 2400,
    mrr: 0,
    registeredAt: '2026-01-05',
    lastLogin: '2026-02-04',
  },
  {
    id: 'c14',
    clinicName: 'Pet Center Recife',
    responsible: 'Ana Paula Dias',
    email: 'ana@petcenter.com.br',
    phone: '(81) 96543-3456',
    cnpj: '44.555.666/0001-14',
    plan: 'professional',
    status: 'cancelled',
    city: 'Recife',
    state: 'PE',
    petsCount: 145,
    tutorsCount: 78,
    appointmentsMonth: 0,
    revenueMonth: 0,
    mrr: 0,
    registeredAt: '2025-08-01',
    lastLogin: '2025-12-15',
  },
  {
    id: 'c15',
    clinicName: 'Patitas Vet Clinic',
    responsible: 'Dra. Maria Luiza',
    email: 'marialuiza@patitas.vet.br',
    phone: '(47) 95432-7890',
    cnpj: '55.666.777/0001-15',
    plan: 'professional',
    status: 'active',
    city: 'Joinville',
    state: 'SC',
    petsCount: 210,
    tutorsCount: 125,
    appointmentsMonth: 58,
    revenueMonth: 19200,
    mrr: 149,
    registeredAt: '2025-09-20',
    lastLogin: '2026-02-09',
  },
  {
    id: 'c16',
    clinicName: 'Amigo Fiel Pet',
    responsible: 'Bruno Cardoso',
    email: 'bruno@amigofiel.com.br',
    phone: '(67) 94321-2345',
    cnpj: '66.777.888/0001-16',
    plan: 'free',
    status: 'active',
    city: 'Campo Grande',
    state: 'MS',
    petsCount: 56,
    tutorsCount: 33,
    appointmentsMonth: 14,
    revenueMonth: 3900,
    mrr: 0,
    registeredAt: '2025-12-01',
    lastLogin: '2026-02-05',
  },
  {
    id: 'c17',
    clinicName: 'VetLife Clinica',
    responsible: 'Dr. Eduardo Pinto',
    email: 'eduardo@vetlife.com.br',
    phone: '(65) 93210-6789',
    cnpj: '77.888.999/0001-17',
    plan: 'professional',
    status: 'overdue',
    city: 'Cuiaba',
    state: 'MT',
    petsCount: 134,
    tutorsCount: 72,
    appointmentsMonth: 28,
    revenueMonth: 9800,
    mrr: 149,
    registeredAt: '2025-10-10',
    lastLogin: '2026-01-20',
  },
  {
    id: 'c18',
    clinicName: 'Pet Dreams Hotel',
    responsible: 'Vanessa Ribeiro',
    email: 'vanessa@petdreams.com.br',
    phone: '(11) 92109-0123',
    cnpj: '88.999.000/0001-18',
    plan: 'enterprise',
    status: 'active',
    city: 'Santos',
    state: 'SP',
    petsCount: 445,
    tutorsCount: 234,
    appointmentsMonth: 112,
    revenueMonth: 38600,
    mrr: 399,
    registeredAt: '2025-08-05',
    lastLogin: '2026-02-10',
  },
  {
    id: 'c19',
    clinicName: 'Quatro Patas Vet',
    responsible: 'Dra. Isabela Martins',
    email: 'isabela@quatropatas.vet.br',
    phone: '(84) 91098-4567',
    cnpj: '99.000.111/0001-19',
    plan: 'trial',
    status: 'trial',
    city: 'Natal',
    state: 'RN',
    petsCount: 18,
    tutorsCount: 11,
    appointmentsMonth: 6,
    revenueMonth: 1200,
    mrr: 0,
    registeredAt: '2026-02-08',
    lastLogin: '2026-02-10',
    trialEndsAt: '2026-02-22',
  },
  {
    id: 'c20',
    clinicName: 'Bichinho Feliz Pet Shop',
    responsible: 'Roberto Gomes',
    email: 'roberto@bichinhofeliz.com.br',
    phone: '(91) 90987-8901',
    cnpj: '00.111.222/0001-20',
    plan: 'professional',
    status: 'active',
    city: 'Belem',
    state: 'PA',
    petsCount: 178,
    tutorsCount: 95,
    appointmentsMonth: 41,
    revenueMonth: 14200,
    mrr: 149,
    registeredAt: '2025-11-01',
    lastLogin: '2026-02-08',
  },
  {
    id: 'c21',
    clinicName: 'PetShop Tropical',
    responsible: 'Sandra Vieira',
    email: 'sandra@pettropical.com.br',
    phone: '(98) 99876-2345',
    cnpj: '11.222.333/0001-21',
    plan: 'free',
    status: 'cancelled',
    city: 'Sao Luis',
    state: 'MA',
    petsCount: 23,
    tutorsCount: 14,
    appointmentsMonth: 0,
    revenueMonth: 0,
    mrr: 0,
    registeredAt: '2025-10-20',
    lastLogin: '2025-11-30',
  },
  {
    id: 'c22',
    clinicName: 'Vet Mais Saude',
    responsible: 'Dr. Gustavo Pereira',
    email: 'gustavo@vetmaissaude.com.br',
    phone: '(16) 98765-6789',
    cnpj: '22.333.444/0001-22',
    plan: 'professional',
    status: 'active',
    city: 'Ribeirao Preto',
    state: 'SP',
    petsCount: 234,
    tutorsCount: 142,
    appointmentsMonth: 65,
    revenueMonth: 21800,
    mrr: 149,
    registeredAt: '2025-09-10',
    lastLogin: '2026-02-10',
  },
  {
    id: 'c23',
    clinicName: 'Dog & Cat Spa',
    responsible: 'Tatiana Freitas',
    email: 'tatiana@dogcatspa.com.br',
    phone: '(43) 97654-0123',
    cnpj: '33.444.555/0001-23',
    plan: 'professional',
    status: 'active',
    city: 'Londrina',
    state: 'PR',
    petsCount: 156,
    tutorsCount: 88,
    appointmentsMonth: 47,
    revenueMonth: 16400,
    mrr: 149,
    registeredAt: '2025-10-25',
    lastLogin: '2026-02-09',
  },
  {
    id: 'c24',
    clinicName: 'PetZone Veterinaria',
    responsible: 'Dr. Daniel Rocha',
    email: 'daniel@petzone.vet.br',
    phone: '(82) 96543-4567',
    cnpj: '44.555.666/0001-24',
    plan: 'trial',
    status: 'trial',
    city: 'Maceio',
    state: 'AL',
    petsCount: 8,
    tutorsCount: 5,
    appointmentsMonth: 3,
    revenueMonth: 600,
    mrr: 0,
    registeredAt: '2026-02-07',
    lastLogin: '2026-02-10',
    trialEndsAt: '2026-02-12',
  },
  {
    id: 'c25',
    clinicName: 'Clinica Vet Saude Total',
    responsible: 'Dra. Renata Campos',
    email: 'renata@saudetotal.vet.br',
    phone: '(79) 95432-8901',
    cnpj: '55.666.777/0001-25',
    plan: 'enterprise',
    status: 'active',
    city: 'Aracaju',
    state: 'SE',
    petsCount: 389,
    tutorsCount: 210,
    appointmentsMonth: 98,
    revenueMonth: 34500,
    mrr: 399,
    registeredAt: '2025-08-10',
    lastLogin: '2026-02-10',
  },
  {
    id: 'c26',
    clinicName: 'Patas & Bigodes',
    responsible: 'Marina Lopes',
    email: 'marina@patasebigodes.com.br',
    phone: '(35) 94321-1234',
    cnpj: '66.777.888/0001-26',
    plan: 'free',
    status: 'active',
    city: 'Pocos de Caldas',
    state: 'MG',
    petsCount: 38,
    tutorsCount: 22,
    appointmentsMonth: 10,
    revenueMonth: 2800,
    mrr: 0,
    registeredAt: '2026-01-15',
    lastLogin: '2026-02-03',
  },
  {
    id: 'c27',
    clinicName: 'Animal Care Plus',
    responsible: 'Dr. Henrique Azevedo',
    email: 'henrique@animalcare.com.br',
    phone: '(24) 93210-5678',
    cnpj: '77.888.999/0001-27',
    plan: 'professional',
    status: 'active',
    city: 'Petropolis',
    state: 'RJ',
    petsCount: 201,
    tutorsCount: 118,
    appointmentsMonth: 55,
    revenueMonth: 18900,
    mrr: 149,
    registeredAt: '2025-11-10',
    lastLogin: '2026-02-10',
  },
];

// ============================================
// MRR HISTORICO (12 meses)
// ============================================
export const mrrHistory = [
  { month: 'Mar/25', mrr: 1245, clients: 8 },
  { month: 'Abr/25', mrr: 1692, clients: 11 },
  { month: 'Mai/25', mrr: 2238, clients: 14 },
  { month: 'Jun/25', mrr: 2835, clients: 17 },
  { month: 'Jul/25', mrr: 3680, clients: 20 },
  { month: 'Ago/25', mrr: 4527, clients: 23 },
  { month: 'Set/25', mrr: 5372, clients: 26 },
  { month: 'Out/25', mrr: 5968, clients: 28 },
  { month: 'Nov/25', mrr: 6415, clients: 29 },
  { month: 'Dez/25', mrr: 6712, clients: 29 },
  { month: 'Jan/26', mrr: 7158, clients: 31 },
  { month: 'Fev/26', mrr: 7653, clients: 33 },
];

// ============================================
// NOVOS vs CANCELAMENTOS (6 meses)
// ============================================
export const clientsFlow = [
  { month: 'Set/25', novos: 5, cancelamentos: 0 },
  { month: 'Out/25', novos: 4, cancelamentos: 1 },
  { month: 'Nov/25', novos: 3, cancelamentos: 0 },
  { month: 'Dez/25', novos: 2, cancelamentos: 1 },
  { month: 'Jan/26', novos: 4, cancelamentos: 0 },
  { month: 'Fev/26', novos: 5, cancelamentos: 1 },
];

// ============================================
// TRANSACOES MOCK
// ============================================
export const mockTransactions: Transaction[] = [
  { id: 't1', clientId: 'c1', clientName: 'Clinica Vet Vida Animal', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'pix' },
  { id: 't2', clientId: 'c2', clientName: 'PetShop Amor & Patas', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'credit_card' },
  { id: 't3', clientId: 'c3', clientName: 'Hotel Pet Paradise', amount: 399, date: '2026-02-03', status: 'paid', plan: 'Enterprise', method: 'pix' },
  { id: 't4', clientId: 'c4', clientName: 'Clinica Vet Dr. Patinhas', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'boleto' },
  { id: 't5', clientId: 'c6', clientName: 'Vet Center Esperanca', amount: 149, date: '2026-02-01', status: 'overdue', plan: 'Profissional', method: 'boleto' },
  { id: 't6', clientId: 'c8', clientName: 'Mundo Animal Veterinaria', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'credit_card' },
  { id: 't7', clientId: 'c10', clientName: 'PetVet Premium', amount: 399, date: '2026-02-03', status: 'paid', plan: 'Enterprise', method: 'pix' },
  { id: 't8', clientId: 'c11', clientName: 'Caes & Gatos Clinica', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'pix' },
  { id: 't9', clientId: 'c15', clientName: 'Patitas Vet Clinic', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'credit_card' },
  { id: 't10', clientId: 'c17', clientName: 'VetLife Clinica', amount: 149, date: '2026-02-01', status: 'overdue', plan: 'Profissional', method: 'boleto' },
  { id: 't11', clientId: 'c18', clientName: 'Pet Dreams Hotel', amount: 399, date: '2026-02-03', status: 'paid', plan: 'Enterprise', method: 'pix' },
  { id: 't12', clientId: 'c20', clientName: 'Bichinho Feliz Pet Shop', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'pix' },
  { id: 't13', clientId: 'c22', clientName: 'Vet Mais Saude', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'credit_card' },
  { id: 't14', clientId: 'c23', clientName: 'Dog & Cat Spa', amount: 149, date: '2026-02-05', status: 'pending', plan: 'Profissional', method: 'boleto' },
  { id: 't15', clientId: 'c25', clientName: 'Clinica Vet Saude Total', amount: 399, date: '2026-02-03', status: 'paid', plan: 'Enterprise', method: 'pix' },
  { id: 't16', clientId: 'c27', clientName: 'Animal Care Plus', amount: 149, date: '2026-02-05', status: 'paid', plan: 'Profissional', method: 'credit_card' },
];

// ============================================
// TICKETS SUPORTE MOCK
// ============================================
export const mockTickets: SupportTicket[] = [
  {
    id: 'tk1', clientId: 'c1', clientName: 'Clinica Vet Vida Animal',
    subject: 'Erro ao gerar relatorio financeiro',
    priority: 'high', status: 'open',
    createdAt: '2026-02-10T08:30:00', updatedAt: '2026-02-10T08:30:00',
    messages: [{ sender: 'Dr. Roberto Mendes', text: 'Ao clicar em gerar relatorio mensal, aparece erro 500. Preciso do relatorio para a contabilidade.', date: '2026-02-10T08:30:00' }],
  },
  {
    id: 'tk2', clientId: 'c3', clientName: 'Hotel Pet Paradise',
    subject: 'Integracao WhatsApp parou de funcionar',
    priority: 'high', status: 'in_progress',
    createdAt: '2026-02-09T14:15:00', updatedAt: '2026-02-10T09:00:00', assignedTo: 'Suporte Tech',
    messages: [
      { sender: 'Marcos Oliveira', text: 'O WhatsApp desconectou e nao consigo reconectar. QR Code nao aparece.', date: '2026-02-09T14:15:00' },
      { sender: 'Suporte Tech', text: 'Estamos verificando o servidor da Evolution API. Vou te dar um retorno em breve.', date: '2026-02-10T09:00:00' },
    ],
  },
  {
    id: 'tk3', clientId: 'c8', clientName: 'Mundo Animal Veterinaria',
    subject: 'Como exportar lista de tutores?',
    priority: 'low', status: 'resolved',
    createdAt: '2026-02-08T10:00:00', updatedAt: '2026-02-08T11:30:00', assignedTo: 'Suporte',
    messages: [
      { sender: 'Dra. Camila Souza', text: 'Preciso exportar a lista de tutores em Excel. Como faco?', date: '2026-02-08T10:00:00' },
      { sender: 'Suporte', text: 'Voce pode acessar Tutores > Exportar CSV no canto superior direito. Se precisar em Excel, abra o CSV no Excel.', date: '2026-02-08T11:30:00' },
    ],
  },
  {
    id: 'tk4', clientId: 'c6', clientName: 'Vet Center Esperanca',
    subject: 'Problema com cobranca duplicada',
    priority: 'high', status: 'open',
    createdAt: '2026-02-09T16:45:00', updatedAt: '2026-02-09T16:45:00',
    messages: [{ sender: 'Dr. Andre Lima', text: 'Recebi duas cobracas do plano Profissional neste mes. Favor verificar e estornar a duplicada.', date: '2026-02-09T16:45:00' }],
  },
  {
    id: 'tk5', clientId: 'c15', clientName: 'Patitas Vet Clinic',
    subject: 'Sugestao: adicionar campo de peso no pet',
    priority: 'low', status: 'closed',
    createdAt: '2026-02-05T09:20:00', updatedAt: '2026-02-07T14:00:00', assignedTo: 'Produto',
    messages: [
      { sender: 'Dra. Maria Luiza', text: 'Seria otimo ter um campo de peso historico no cadastro do pet para acompanhar a evolucao.', date: '2026-02-05T09:20:00' },
      { sender: 'Produto', text: 'Excelente sugestao! Ja esta no nosso roadmap para a proxima sprint. Obrigado pelo feedback!', date: '2026-02-07T14:00:00' },
    ],
  },
  {
    id: 'tk6', clientId: 'c22', clientName: 'Vet Mais Saude',
    subject: 'Lentidao ao carregar dashboard',
    priority: 'medium', status: 'in_progress',
    createdAt: '2026-02-09T11:00:00', updatedAt: '2026-02-10T08:00:00', assignedTo: 'Suporte Tech',
    messages: [
      { sender: 'Dr. Gustavo Pereira', text: 'O dashboard esta demorando mais de 10 segundos para carregar. Antes era rapido.', date: '2026-02-09T11:00:00' },
      { sender: 'Suporte Tech', text: 'Identificamos o problema. Estamos otimizando a query de analytics. Previsao de correcao: hoje.', date: '2026-02-10T08:00:00' },
    ],
  },
];

// ============================================
// LOGS MOCK
// ============================================
export const mockLogs: SystemLog[] = [
  { id: 'l1', type: 'error', message: 'Falha na conexao com Redis', details: 'ConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:6379', timestamp: '2026-02-10T10:15:00', source: 'api/cache' },
  { id: 'l2', type: 'warning', message: 'Rate limit atingido', clientId: 'c10', clientName: 'PetVet Premium', details: '150 requests/min excedido', timestamp: '2026-02-10T09:45:00', source: 'api/middleware' },
  { id: 'l3', type: 'info', message: 'Novo cliente cadastrado', clientId: 'c24', clientName: 'PetZone Veterinaria', timestamp: '2026-02-10T09:30:00', source: 'auth/register' },
  { id: 'l4', type: 'error', message: 'Falha ao enviar WhatsApp', clientId: 'c3', clientName: 'Hotel Pet Paradise', details: 'Evolution API timeout after 30s', timestamp: '2026-02-10T09:00:00', source: 'whatsapp/send' },
  { id: 'l5', type: 'info', message: 'Backup do banco concluido', details: 'Tamanho: 245MB, Duracao: 12s', timestamp: '2026-02-10T06:00:00', source: 'system/backup' },
  { id: 'l6', type: 'warning', message: 'Certificado SSL expira em 15 dias', details: 'Dominio: petpro.site', timestamp: '2026-02-10T06:00:00', source: 'system/ssl' },
  { id: 'l7', type: 'info', message: 'Deploy realizado com sucesso', details: 'Versao: 1.4.2, Commit: cb39fda', timestamp: '2026-02-09T22:00:00', source: 'system/deploy' },
  { id: 'l8', type: 'error', message: 'Falha no pagamento', clientId: 'c17', clientName: 'VetLife Clinica', details: 'Cartao recusado - saldo insuficiente', timestamp: '2026-02-09T18:00:00', source: 'billing/payment' },
  { id: 'l9', type: 'info', message: 'Plano alterado', clientId: 'c18', clientName: 'Pet Dreams Hotel', details: 'Profissional -> Enterprise', timestamp: '2026-02-09T15:30:00', source: 'billing/plan' },
  { id: 'l10', type: 'warning', message: 'Uso de CPU acima de 80%', details: 'CPU: 87% por 5 minutos', timestamp: '2026-02-09T14:00:00', source: 'system/monitoring' },
  { id: 'l11', type: 'info', message: 'Cliente cancelou assinatura', clientId: 'c14', clientName: 'Pet Center Recife', timestamp: '2026-02-09T12:00:00', source: 'billing/cancel' },
  { id: 'l12', type: 'error', message: 'Erro 500 no endpoint /api/analytics', details: 'TypeError: Cannot read properties of undefined', timestamp: '2026-02-09T10:30:00', source: 'api/analytics' },
];

// ============================================
// PLANOS MOCK
// ============================================
export const mockPlans: Plan[] = [
  {
    id: 'plan-free',
    name: 'Gratuito',
    slug: 'free',
    price: 0,
    features: ['Ate 50 pets', '1 usuario', 'Agenda basica', 'Cadastro de tutores'],
    maxPets: 50,
    maxUsers: 1,
    clientsCount: 6,
  },
  {
    id: 'plan-pro',
    name: 'Profissional',
    slug: 'professional',
    price: 149,
    features: ['Ate 500 pets', '5 usuarios', 'Agenda completa', 'Prontuario eletronico', 'Controle de vacinas', 'Financeiro', 'WhatsApp', 'Relatorios'],
    maxPets: 500,
    maxUsers: 5,
    clientsCount: 13,
    isPopular: true,
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    slug: 'enterprise',
    price: 399,
    features: ['Pets ilimitados', 'Usuarios ilimitados', 'Tudo do Profissional', 'Hotel Pet / Daycare', 'Marketplace', 'API personalizada', 'Suporte prioritario', 'Treinamento'],
    maxPets: -1,
    maxUsers: -1,
    clientsCount: 4,
  },
];

// ============================================
// HELPERS
// ============================================
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `ha ${diffMins} min`;
  if (diffHours < 24) return `ha ${diffHours}h`;
  if (diffDays < 30) return `ha ${diffDays} dias`;
  return formatDate(dateStr);
}

export function getPlanLabel(plan: string): string {
  const labels: Record<string, string> = {
    free: 'Gratuito',
    professional: 'Profissional',
    enterprise: 'Enterprise',
    trial: 'Trial',
  };
  return labels[plan] || plan;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: 'Ativo',
    trial: 'Trial',
    cancelled: 'Cancelado',
    overdue: 'Inadimplente',
  };
  return labels[status] || status;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

// Computed KPIs
export function getKPIs() {
  const activeClients = mockClients.filter(c => c.status === 'active' || c.status === 'overdue');
  const trialClients = mockClients.filter(c => c.status === 'trial');
  const cancelledThisMonth = mockClients.filter(c => c.status === 'cancelled');
  const totalMRR = mockClients.reduce((sum, c) => sum + c.mrr, 0);
  const paidClients = activeClients.filter(c => c.mrr > 0);
  const avgTicket = paidClients.length > 0 ? totalMRR / paidClients.length : 0;
  const churnRate = 2 / (activeClients.length + cancelledThisMonth.length) * 100;
  const newThisMonth = mockClients.filter(c => c.registeredAt >= '2026-02-01').length;

  return {
    activeClients: activeClients.length,
    activeClientsChange: 8.3,
    mrr: totalMRR,
    mrrChange: 6.9,
    newThisMonth,
    newThisMonthChange: 25.0,
    churnRate: parseFloat(churnRate.toFixed(1)),
    churnRateChange: -0.5,
    trialActive: trialClients.length,
    avgTicket: parseFloat(avgTicket.toFixed(0)),
    avgTicketChange: 3.2,
  };
}

// Distribution by plan
export function getPlanDistribution() {
  return [
    { name: 'Gratuito', value: mockClients.filter(c => c.plan === 'free').length, color: '#94A3B8' },
    { name: 'Profissional', value: mockClients.filter(c => c.plan === 'professional').length, color: '#2563EB' },
    { name: 'Enterprise', value: mockClients.filter(c => c.plan === 'enterprise').length, color: '#4F46E5' },
    { name: 'Trial', value: mockClients.filter(c => c.status === 'trial').length, color: '#F59E0B' },
  ];
}
