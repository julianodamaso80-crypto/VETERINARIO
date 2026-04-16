import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Facebook,
  PawPrint,
  MousePointer2,
} from 'lucide-react';
import { TubesBackground } from '@/components/tubes-background';

const services = [
  {
    index: '01',
    title: 'Prontuario Eletronico',
    tags: ['Historico medico', 'Prescricoes', 'Exames'],
  },
  {
    index: '02',
    title: 'Carteira de Vacinas',
    tags: ['Alertas WhatsApp', 'Automacao', 'Lembretes'],
  },
  {
    index: '03',
    title: 'Agenda Inteligente',
    tags: ['Multi profissional', 'Confirmacao', 'Visual'],
  },
  {
    index: '04',
    title: 'Hotel & Daycare',
    tags: ['Check-in digital', 'Updates com fotos', 'Controle'],
  },
  {
    index: '05',
    title: 'PDV & Estoque',
    tags: ['Vendas integradas', 'Alertas', 'Tempo real'],
  },
  {
    index: '06',
    title: 'WhatsApp Business',
    tags: ['API nativa', 'Mensagens', 'Confirmacao'],
  },
];

const pets = [
  {
    src: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80',
    label: 'CAES // 01',
    meta: 'Consultas / Vacinas',
  },
  {
    src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
    label: 'GATOS // 02',
    meta: 'Prontuario / Exames',
  },
  {
    src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80',
    label: 'FILHOTES // 03',
    meta: 'Protocolo / Hotel',
  },
];

const businessTypes = [
  {
    label: 'Clinica Veterinaria',
    img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Pet Shop',
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Banho e Tosa',
    img: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Hotel Pet',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
  },
];

const testimonials = [
  {
    quote:
      'O PetPro transformou nossa clinica. Antes perdiamos tempo com papel, agora tudo e digital e os tutores adoram receber avisos pelo WhatsApp.',
    name: 'Dra. Marina Silva',
    role: 'Clinica VetCare / Sao Paulo',
  },
  {
    quote:
      'Controle de estoque perfeito. Nunca mais fiquei sem racao para vender. O sistema avisa quando esta acabando.',
    name: 'Ricardo Almeida',
    role: 'Pet Shop Amigo Fiel / RJ',
  },
  {
    quote:
      'Tutores ficam tranquilos com updates diarios. Nossa taxa de retorno subiu 40% desde que usamos o PetPro.',
    name: 'Carla Mendes',
    role: 'Hotel Pet Paradise / MG',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'R$ 0',
    period: '/ gratis para sempre',
    features: ['50 pets', 'Agenda ilimitada', 'Prontuario basico', '1 usuario'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R$ 149',
    period: '/ mes',
    features: [
      'Pets ilimitados',
      'WhatsApp integrado',
      '5 usuarios',
      'Relatorios avancados',
      'Suporte prioritario',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '/ sob consulta',
    features: ['Multi unidades', 'API dedicada', 'Usuarios ilimitados', 'SLA garantido'],
    highlighted: false,
  },
];

const stats = [
  { value: '500+', label: 'Negocios Ativos' },
  { value: '50K', label: 'Pets Cadastrados' },
  { value: '100K', label: 'Agendamentos / Mes' },
  { value: '99.9%', label: 'Uptime Garantido' },
];

const marqueeItems = ['PETPRO', 'GESTAO', 'VETERINARIA', 'PETSHOP', 'HOTEL', 'DAYCARE'];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FF4D00] text-black font-mono-brut kinetic-selection overflow-x-hidden">
      {/* ==================== FLOATING NAV ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black flex items-center justify-center">
            <PawPrint className="h-5 w-5 text-[#FF4D00]" strokeWidth={2.5} />
          </div>
          <span className="font-archivo text-xl">PETPRO</span>
        </Link>

        <nav className="hidden md:flex bg-black rounded-full px-2 py-2">
          {[
            { href: '#servicos', label: 'SERVICOS' },
            { href: '#trabalhos', label: 'PETS' },
            { href: '#planos', label: 'PLANOS' },
            { href: '#contato', label: 'CONTATO' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white text-[12px] font-bold tracking-tight uppercase px-5 py-2 rounded-full transition-colors duration-200 hover:bg-white hover:text-black"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="Instagram"
            className="w-10 h-10 border-2 border-black flex items-center justify-center bg-[#FF4D00] hover:bg-black hover:text-[#FF4D00] transition-colors duration-200"
          >
            <Instagram className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="w-10 h-10 border-2 border-black flex items-center justify-center bg-[#FF4D00] hover:bg-black hover:text-[#FF4D00] transition-colors duration-200"
          >
            <Linkedin className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="pt-28 md:pt-36 pb-0">
        <div className="px-6 md:px-10">
          {/* Top meta row */}
          <div className="flex items-center justify-between text-[11px] font-bold uppercase mb-10 md:mb-14">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse inline-block" />
              [ ao vivo / 500+ clinicas ]
            </span>
            <span className="hidden md:inline">PLATAFORMA // GESTAO PET / v.4 2026</span>
            <span>BRASIL / SP</span>
          </div>

          {/* Split hero: text left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-stretch">
            {/* LEFT — Headline + copy + CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h1
                  className="font-archivo text-black leading-[0.82] mb-8"
                  style={{ fontSize: 'clamp(2.75rem, 9.5vw, 11rem)' }}
                >
                  Gestao
                  <br />
                  pro seu
                  <br />
                  pet shop<span className="text-white">.</span>
                </h1>

                <p className="max-w-xl text-[15px] md:text-lg leading-tight font-mono-brut mb-10">
                  Plataforma <strong>all-in-one</strong> pra clinicas veterinarias,
                  pet shops, hoteis e daycares. Agenda, prontuario, vacinas,
                  estoque, PDV e WhatsApp — tudo num lugar so.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-3 bg-black text-white rounded-full px-7 py-4 font-archivo text-sm md:text-base uppercase hover:scale-105 hover:bg-white hover:text-black transition-all duration-200"
                  >
                    Comecar gratis
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                  </Link>
                  <a
                    href="#servicos"
                    className="inline-flex items-center gap-3 border-2 border-black text-black rounded-full px-7 py-4 font-archivo text-sm md:text-base uppercase hover:bg-black hover:text-[#FF4D00] transition-colors duration-200"
                  >
                    Ver recursos
                  </a>
                </div>
              </div>

              {/* Mini stats bar */}
              <div className="grid grid-cols-3 border-t-2 border-black pt-5">
                <div>
                  <div className="font-archivo text-3xl md:text-4xl leading-none">500+</div>
                  <div className="text-[10px] font-bold uppercase mt-1">Negocios</div>
                </div>
                <div className="border-l-2 border-black pl-4">
                  <div className="font-archivo text-3xl md:text-4xl leading-none">50K</div>
                  <div className="text-[10px] font-bold uppercase mt-1">Pets ativos</div>
                </div>
                <div className="border-l-2 border-black pl-4">
                  <div className="font-archivo text-3xl md:text-4xl leading-none">99.9%</div>
                  <div className="text-[10px] font-bold uppercase mt-1">Uptime</div>
                </div>
              </div>
            </div>

            {/* RIGHT — Pet image + Interactive 3D tubes */}
            <div className="lg:col-span-5 flex flex-col gap-4 min-h-[420px] md:min-h-[560px]">
              {/* Pet image card */}
              <div className="relative border-2 border-black bg-black flex-1 overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1400&q=85"
                  alt="Golden retriever — clientes satisfeitos PetPro"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                  <span className="bg-[#FF4D00] text-black border-2 border-black px-3 py-1 text-[10px] font-bold uppercase">
                    [ ATENDIDOS HOJE / 1.247 PETS ]
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#FF4D00] border-2 border-black flex items-center justify-center animate-spin-slow">
                    <span className="text-black text-xs font-bold">●</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-black/85 backdrop-blur-sm border-t-2 border-[#FF4D00] text-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-[#FF4D00] mb-1">
                        Modulo em destaque
                      </div>
                      <div className="font-archivo text-base md:text-lg leading-none">
                        Vacinas via WhatsApp
                      </div>
                    </div>
                    <ArrowUpRight className="h-7 w-7 md:h-9 md:w-9 text-[#FF4D00] shrink-0" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Interactive 3D tubes card */}
              <div className="relative border-2 border-black bg-black h-[160px] md:h-[180px] overflow-hidden cursor-pointer">
                <TubesBackground
                  className="bg-black"
                  colors={['#FF4D00', '#FFFFFF', '#FF8A2E']}
                  lightColors={['#FF4D00', '#FFB703', '#FF8A2E', '#FFFFFF']}
                >
                  <div className="absolute inset-0 flex items-center justify-between p-5 pointer-events-none">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-[#FF4D00] mb-2">
                        [ Sistema vivo 3D ]
                      </div>
                      <div className="font-archivo text-white text-xl md:text-2xl leading-[0.9]">
                        Mova o mouse.
                        <br />
                        Clique pra trocar cor.
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <MousePointer2
                        className="h-8 w-8 md:h-10 md:w-10 text-[#FF4D00]"
                        strokeWidth={2}
                      />
                      <span className="text-[9px] font-bold uppercase text-white/80">
                        interativo
                      </span>
                    </div>
                  </div>
                </TubesBackground>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata row divider */}
        <div className="mt-10 md:mt-16 border-t-2 border-black">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center px-6 md:px-10 py-6 gap-6">
            <div>
              <div className="text-[11px] font-bold uppercase mb-2">[ Sediado em ]</div>
              <div className="font-archivo text-lg md:text-xl leading-none">
                Sao Paulo / Brasil
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-28 h-28">
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 144 144">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 72,72 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                    />
                  </defs>
                  <text
                    fill="#000000"
                    style={{
                      fontFamily: 'var(--font-space-mono), monospace',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <textPath href="#circlePath" startOffset="0">
                      {' SCROLL DOWN • SCROLL DOWN • SCROLL DOWN • SCROLL DOWN • '}
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ArrowDown className="h-5 w-5 text-black" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <div className="md:text-right">
              <div className="text-[11px] font-bold uppercase mb-2">[ Setup ]</div>
              <div className="font-archivo text-lg md:text-xl leading-none">
                5 minutos / sem cartao
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== IMAGE STRIP - PETS ==================== */}
      <section id="trabalhos" className="border-t-2 border-black">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {pets.map((pet, i) => (
            <div
              key={i}
              className={`relative aspect-square border-black ${
                i > 0 ? 'border-t-2 md:border-t-0 md:border-l-2' : ''
              } overflow-hidden group bg-black`}
            >
              <Image
                src={pet.src}
                alt={pet.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between text-white">
                <div>
                  <div className="text-[11px] font-bold uppercase opacity-80">{pet.meta}</div>
                  <div className="font-archivo text-2xl mt-1">{pet.label}</div>
                </div>
                <ArrowUpRight
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  strokeWidth={2}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SKEWED MARQUEE ==================== */}
      <section
        className="relative bg-black py-16 md:py-20 overflow-hidden border-y-2 border-black"
        style={{ transform: 'skewY(-2deg)', marginTop: '-20px', marginBottom: '-20px' }}
      >
        <div style={{ transform: 'skewY(2deg)' }}>
          {/* Row 1 — orange */}
          <div className="relative flex overflow-hidden py-2">
            <div className="flex animate-marquee-left whitespace-nowrap">
              {[...Array(2)].map((_, r) => (
                <div key={r} className="flex shrink-0">
                  {marqueeItems.map((item, i) => (
                    <span
                      key={`${r}-${i}`}
                      className="font-archivo text-[#FF4D00] mx-10 inline-flex items-center gap-10"
                      style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
                    >
                      {item}
                      <span className="text-[#FF4D00]">●</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — white reversed */}
          <div className="relative flex overflow-hidden py-2">
            <div className="flex animate-marquee-right whitespace-nowrap">
              {[...Array(2)].map((_, r) => (
                <div key={r} className="flex shrink-0">
                  {['CUIDAR', 'GESTAO', 'CRESCER', 'SIMPLIFICAR', 'ESCALAR', 'AUTOMATIZAR'].map(
                    (item, i) => (
                      <span
                        key={`${r}-${i}`}
                        className="font-archivo text-white/80 mx-10 inline-flex items-center gap-10"
                        style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
                      >
                        {item}
                        <span>+</span>
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VERTICAL SERVICE LIST ==================== */}
      <section id="servicos" className="bg-black text-white relative pt-24 pb-8">
        <div className="px-6 md:px-10 mb-16 flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase text-[#FF4D00] mb-3">
              [ 02 ] Nossos Servicos
            </div>
            <h2
              className="font-archivo leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              O que fazemos
            </h2>
          </div>
          <p className="max-w-md text-sm uppercase tracking-tight">
            Seis modulos integrados em uma unica plataforma. Escolha os que precisa,
            ative quando quiser.
          </p>
        </div>

        <div className="border-t border-white/20">
          {services.map((svc) => (
            <a
              key={svc.index}
              href="#planos"
              className="group flex items-center justify-between px-6 md:px-10 py-8 md:py-10 border-b border-white/20 hover:bg-white/5 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-8 md:gap-16 flex-1 min-w-0">
                <span className="font-mono-brut text-[#FF4D00] text-sm md:text-base font-bold shrink-0">
                  {svc.index}
                </span>
                <div className="flex-1 min-w-0 transition-transform duration-300 group-hover:translate-x-4">
                  <h3
                    className="font-archivo leading-[0.9] truncate"
                    style={{ fontSize: 'clamp(2rem, 7vw, 5.5rem)' }}
                  >
                    {svc.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold uppercase px-3 py-1 border border-white/30 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                className="h-12 w-12 md:h-16 md:w-16 text-[#FF4D00] opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300 shrink-0 ml-4"
                strokeWidth={2}
              />
            </a>
          ))}
        </div>
      </section>

      {/* ==================== STATS STRIP ==================== */}
      <section className="bg-[#FF4D00] border-y-2 border-black">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 md:divide-y-0 divide-y-2 divide-black">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-8 md:p-12 ${i > 1 ? 'border-t-2 border-black md:border-t-0' : ''}`}
            >
              <div
                className="font-archivo leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
              >
                {stat.value}
              </div>
              <div className="text-[11px] font-bold uppercase mt-3">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== BUSINESS TYPES ==================== */}
      <section className="bg-[#FF4D00] border-b-2 border-black py-24 px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="text-[11px] font-bold uppercase mb-3">[ 03 ] Para quem </div>
            <h2
              className="font-archivo leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              Todo tipo
              <br />
              de negocio pet
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-black">
          {businessTypes.map((type, i) => (
            <div
              key={i}
              className={`relative aspect-[4/5] overflow-hidden group bg-black ${
                i > 0 ? 'border-t-2 lg:border-t-0 lg:border-l-2 md:border-l-2 md:[&:nth-child(3)]:border-l-0 md:[&:nth-child(3)]:border-t-2 md:[&:nth-child(4)]:border-t-2 lg:[&:nth-child(3)]:border-t-0 lg:[&:nth-child(4)]:border-t-0 border-black' : ''
              }`}
            >
              <Image
                src={type.img}
                alt={type.label}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="text-[10px] font-bold uppercase opacity-70 mb-1">
                  0{i + 1}
                </div>
                <h3 className="font-archivo text-xl leading-none">{type.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="bg-white border-b-2 border-black py-24 px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="text-[11px] font-bold uppercase mb-3">[ 04 ] Depoimentos</div>
            <h2
              className="font-archivo leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              Quem usa,
              <br />
              recomenda.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 bg-white ${
                i > 0 ? 'border-t-2 md:border-t-0 md:border-l-2 border-black' : ''
              }`}
            >
              <div className="text-[#FF4D00] font-archivo text-6xl leading-none mb-6">&ldquo;</div>
              <p className="text-base md:text-lg leading-tight mb-8 font-mono-brut">
                {t.quote}
              </p>
              <div className="border-t-2 border-black pt-4">
                <div className="font-archivo text-sm">{t.name}</div>
                <div className="text-[11px] font-bold uppercase mt-1 text-black/60">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="planos" className="bg-[#FF4D00] border-b-2 border-black py-24 px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="text-[11px] font-bold uppercase mb-3">[ 05 ] Planos</div>
            <h2
              className="font-archivo leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              Escolha
              <br />
              seu plano.
            </h2>
          </div>
          <p className="max-w-md text-sm uppercase tracking-tight">
            Comece gratis. Escale quando precisar. Sem fidelidade, sem pegadinha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 flex flex-col ${
                plan.highlighted ? 'bg-black text-white' : 'bg-white text-black'
              } ${i > 0 ? 'border-t-2 md:border-t-0 md:border-l-2 border-black' : ''}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-[11px] font-bold uppercase">[ 0{i + 1} ]</div>
                {plan.highlighted && (
                  <span className="text-[10px] font-bold uppercase bg-[#FF4D00] text-black px-2 py-1">
                    Popular
                  </span>
                )}
              </div>
              <h3 className="font-archivo text-3xl mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="font-archivo text-5xl">{plan.price}</span>
                <div className="text-[11px] font-bold uppercase opacity-70 mt-1">
                  {plan.period}
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`font-bold ${plan.highlighted ? 'text-[#FF4D00]' : 'text-black'}`}
                    >
                      +
                    </span>
                    <span className="uppercase tracking-tight">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`block text-center w-full py-4 rounded-full font-bold uppercase text-xs tracking-tight transition-all duration-200 hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-[#FF4D00] text-black hover:bg-white'
                    : 'bg-black text-white hover:bg-[#FF4D00] hover:text-black'
                }`}
              >
                Comecar agora
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== GIANT CTA ==================== */}
      <section className="bg-[#FF4D00] border-b-2 border-black py-28 md:py-40 px-6 md:px-10 text-center">
        <div className="text-[11px] font-bold uppercase mb-8">[ Pronto pra comecar? ]</div>
        <h2
          className="font-archivo leading-[0.85] mb-12"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 16rem)' }}
        >
          Comece
          <br />
          Agora.
        </h2>
        <Link
          href="/register"
          className="inline-flex items-center gap-4 bg-black text-white rounded-full px-10 py-6 font-archivo text-lg md:text-xl hover:scale-110 hover:bg-white hover:text-black transition-all duration-300"
        >
          Criar conta gratis
          <ArrowUpRight className="h-6 w-6" strokeWidth={2.5} />
        </Link>
        <p className="mt-8 text-[11px] font-bold uppercase">
          Sem cartao de credito · setup em 5 minutos · cancele quando quiser
        </p>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer
        id="contato"
        className="bg-[#FF4D00] border-t-2 border-black px-6 md:px-10 py-12"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-black flex items-center justify-center">
                <PawPrint className="h-5 w-5 text-[#FF4D00]" strokeWidth={2.5} />
              </div>
              <span className="font-archivo text-2xl">PETPRO</span>
            </div>
            <p className="text-xs uppercase font-bold">
              Plataforma completa para negocios pet
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase">
            <a href="#servicos" className="hover:underline">
              Servicos
            </a>
            <a href="#planos" className="hover:underline">
              Planos
            </a>
            <a href="mailto:contato@petpro.site" className="hover:underline">
              contato@petpro.site
            </a>
          </div>
        </div>

        <div className="border-t-2 border-black pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-bold uppercase">
          <div>© 2026 Petpro / Sao Paulo, Brasil</div>
          <div className="flex gap-6">
            <a href="#" className="flex items-center gap-2 hover:underline">
              <Instagram className="h-3 w-3" strokeWidth={2.5} />
              Instagram
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <Linkedin className="h-3 w-3" strokeWidth={2.5} />
              Linkedin
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <Facebook className="h-3 w-3" strokeWidth={2.5} />
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
