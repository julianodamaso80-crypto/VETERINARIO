import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo business
  const business = await prisma.business.upsert({
    where: { slug: 'petshop-demo' },
    update: {},
    create: {
      name: 'PetShop Demo',
      slug: 'petshop-demo',
      phone: '11999999999',
      email: 'contato@petshopdemo.com',
      businessTypes: ['PETSHOP', 'VETERINARY', 'GROOMING'],
      address: 'Rua das Flores, 123',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: '01310-100',
    },
  });

  console.log('Business created:', business.name);

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { businessId_email: { businessId: business.id, email: 'admin@petshopdemo.com' } },
    update: {},
    create: {
      businessId: business.id,
      name: 'Administrador',
      email: 'admin@petshopdemo.com',
      phone: '11999999999',
      role: 'OWNER',
      passwordHash,
    },
  });

  console.log('Admin user created:', admin.email);

  // Create veterinarian
  const vet = await prisma.user.upsert({
    where: { businessId_email: { businessId: business.id, email: 'vet@petshopdemo.com' } },
    update: {},
    create: {
      businessId: business.id,
      name: 'Dr. Carlos Silva',
      email: 'vet@petshopdemo.com',
      phone: '11988888888',
      role: 'VET',
      crmv: '12345-SP',
      passwordHash,
    },
  });

  console.log('Veterinarian created:', vet.name);

  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'service-consulta' },
      update: {},
      create: {
        id: 'service-consulta',
        businessId: business.id,
        name: 'Consulta Veterinaria',
        description: 'Consulta clinica geral',
        category: 'VETERINARY',
        duration: 30,
        price: 150,
        requiresVet: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-banho-p' },
      update: {},
      create: {
        id: 'service-banho-p',
        businessId: business.id,
        name: 'Banho Pequeno Porte',
        description: 'Banho para caes de pequeno porte',
        category: 'GROOMING',
        duration: 60,
        price: 50,
        acceptedSizes: ['MINI', 'SMALL'],
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-banho-m' },
      update: {},
      create: {
        id: 'service-banho-m',
        businessId: business.id,
        name: 'Banho Medio Porte',
        description: 'Banho para caes de medio porte',
        category: 'GROOMING',
        duration: 90,
        price: 70,
        acceptedSizes: ['MEDIUM'],
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-banho-g' },
      update: {},
      create: {
        id: 'service-banho-g',
        businessId: business.id,
        name: 'Banho Grande Porte',
        description: 'Banho para caes de grande porte',
        category: 'GROOMING',
        duration: 120,
        price: 100,
        acceptedSizes: ['LARGE', 'GIANT'],
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-tosa' },
      update: {},
      create: {
        id: 'service-tosa',
        businessId: business.id,
        name: 'Tosa Higienica',
        description: 'Tosa higienica completa',
        category: 'GROOMING',
        duration: 45,
        price: 40,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-vacina' },
      update: {},
      create: {
        id: 'service-vacina',
        businessId: business.id,
        name: 'Aplicacao de Vacina',
        description: 'Aplicacao de vacinas (valor da vacina nao incluso)',
        category: 'VETERINARY',
        duration: 15,
        price: 30,
        requiresVet: true,
      },
    }),
  ]);

  console.log('Services created:', services.length);

  // Create sample tutor
  let tutor = await prisma.tutor.findFirst({
    where: { businessId: business.id, phone: '11977777777' },
  });
  if (!tutor) {
    tutor = await prisma.tutor.create({
      data: {
        businessId: business.id,
        name: 'Maria Santos',
        phone: '11977777777',
        email: 'maria@email.com',
        address: 'Av. Paulista, 1000',
        city: 'Sao Paulo',
        state: 'SP',
      },
    });
  }

  console.log('Tutor created:', tutor.name);

  // Create sample pets
  const pets = await Promise.all([
    prisma.pet.create({
      data: {
        businessId: business.id,
        tutorId: tutor.id,
        name: 'Thor',
        species: 'DOG',
        breed: 'Golden Retriever',
        size: 'LARGE',
        gender: 'MALE',
        birthDate: new Date('2020-03-15'),
      },
    }),
    prisma.pet.create({
      data: {
        businessId: business.id,
        tutorId: tutor.id,
        name: 'Mimi',
        species: 'CAT',
        breed: 'Siames',
        size: 'SMALL',
        gender: 'FEMALE',
        birthDate: new Date('2021-07-20'),
      },
    }),
  ]);

  console.log('Pets created:', pets.length);

  // Create marketplace categories
  const categories = await Promise.all([
    prisma.marketplaceCategory.upsert({
      where: { slug: 'racoes' },
      update: {},
      create: {
        name: 'Racoes',
        slug: 'racoes',
        description: 'Racoes para caes e gatos',
        order: 1,
      },
    }),
    prisma.marketplaceCategory.upsert({
      where: { slug: 'petiscos' },
      update: {},
      create: {
        name: 'Petiscos',
        slug: 'petiscos',
        description: 'Petiscos e snacks',
        order: 2,
      },
    }),
    prisma.marketplaceCategory.upsert({
      where: { slug: 'acessorios' },
      update: {},
      create: {
        name: 'Acessorios',
        slug: 'acessorios',
        description: 'Coleiras, guias e acessorios',
        order: 3,
      },
    }),
    prisma.marketplaceCategory.upsert({
      where: { slug: 'brinquedos' },
      update: {},
      create: {
        name: 'Brinquedos',
        slug: 'brinquedos',
        description: 'Brinquedos para pets',
        order: 4,
      },
    }),
    prisma.marketplaceCategory.upsert({
      where: { slug: 'higiene' },
      update: {},
      create: {
        name: 'Higiene',
        slug: 'higiene',
        description: 'Produtos de higiene',
        order: 5,
      },
    }),
    prisma.marketplaceCategory.upsert({
      where: { slug: 'medicamentos' },
      update: {},
      create: {
        name: 'Medicamentos',
        slug: 'medicamentos',
        description: 'Medicamentos e suplementos',
        order: 6,
      },
    }),
  ]);

  console.log('Marketplace categories created:', categories.length);

  // Create marketplace seller
  let seller = await prisma.marketplaceSeller.findFirst({
    where: { email: 'loja@petshopdemo.com' },
  });
  if (!seller) {
    seller = await prisma.marketplaceSeller.create({
      data: {
        name: 'PetShop Demo Store',
        email: 'loja@petshopdemo.com',
        phone: '11966666666',
        sellerType: 'STORE',
        isVerified: true,
        city: 'Sao Paulo',
        state: 'SP',
      },
    });
  }
  console.log('Marketplace seller created:', seller.name);

  // Create marketplace listings (status: ACTIVE so they appear in queries)
  const listingsData = [
    {
      sellerId: seller.id,
      categoryId: categories[0].id,
      title: 'Racao Premium Adulto 15kg',
      slug: 'racao-premium-adulto-15kg',
      description: 'Racao premium para caes adultos de todas as racas. Rico em proteinas e vitaminas.',
      price: 89.90,
      stock: 50,
      status: 'ACTIVE',
      forSpecies: ['DOG'],
      forSizes: ['SMALL', 'MEDIUM', 'LARGE'],
    },
    {
      sellerId: seller.id,
      categoryId: categories[3].id,
      title: 'Brinquedo Corda Resistente',
      slug: 'brinquedo-corda-resistente',
      description: 'Brinquedo de corda super resistente para caes e gatos. Ideal para brincadeiras interativas.',
      price: 29.90,
      stock: 100,
      status: 'ACTIVE',
      forSpecies: ['DOG', 'CAT'],
      forSizes: ['SMALL', 'MEDIUM', 'LARGE'],
    },
    {
      sellerId: seller.id,
      categoryId: categories[4].id,
      title: 'Shampoo Neutro Pet 500ml',
      slug: 'shampoo-neutro-pet-500ml',
      description: 'Shampoo neutro para caes e gatos. Formula suave, nao irrita a pele.',
      price: 24.90,
      stock: 80,
      status: 'ACTIVE',
      forSpecies: ['DOG', 'CAT'],
    },
  ];

  for (const listing of listingsData) {
    const exists = await prisma.marketplaceListing.findFirst({
      where: { slug: listing.slug },
    });
    if (!exists) {
      await prisma.marketplaceListing.create({ data: listing });
    }
  }
  console.log('Marketplace listings created:', listingsData.length);

  // Create pet sitters (status: APPROVED, isActive: true so they appear in queries)
  const petSittersData = [
    {
      name: 'Ana Oliveira',
      email: 'ana.oliveira@email.com',
      phone: '11955555555',
      bio: 'Apaixonada por animais! Cuido de caes e gatos com muito carinho. Experiencia de 5 anos.',
      city: 'Sao Paulo',
      state: 'SP',
      status: 'APPROVED',
      isActive: true,
      isVerified: true,
      acceptedSpecies: ['DOG', 'CAT'],
      acceptedSizes: ['MINI', 'SMALL', 'MEDIUM', 'LARGE'],
      averageRating: 4.8,
      totalReviews: 23,
      totalBookings: 45,
      hasOwnTransport: true,
      hasYard: false,
      serviceRadius: 15,
    },
    {
      name: 'Bruno Costa',
      email: 'bruno.costa@email.com',
      phone: '11944444444',
      bio: 'Tenho espaco amplo com quintal. Especialista em hospedagem e creche para pets.',
      city: 'Sao Paulo',
      state: 'SP',
      status: 'APPROVED',
      isActive: true,
      isVerified: true,
      acceptedSpecies: ['DOG', 'CAT'],
      acceptedSizes: ['MINI', 'SMALL', 'MEDIUM', 'LARGE', 'GIANT'],
      averageRating: 4.5,
      totalReviews: 15,
      totalBookings: 30,
      hasOwnTransport: false,
      hasYard: true,
      serviceRadius: 10,
    },
  ];

  const petSitterServices = [
    [
      { serviceType: 'WALK', name: 'Passeio 30min', priceType: 'PER_SERVICE', price: 35.00, duration: 30, maxPets: 3 },
      { serviceType: 'VISIT', name: 'Visita em casa', priceType: 'PER_SERVICE', price: 50.00, duration: 60, maxPets: 5 },
    ],
    [
      { serviceType: 'BOARDING', name: 'Hospedagem diaria', priceType: 'PER_NIGHT', price: 80.00, duration: 1440, maxPets: 4, includesFood: true },
      { serviceType: 'DAYCARE', name: 'Creche diurna', priceType: 'PER_DAY', price: 60.00, duration: 480, maxPets: 6, includesFood: true },
    ],
  ];

  for (let i = 0; i < petSittersData.length; i++) {
    const sitterData = petSittersData[i];
    let sitter = await prisma.petSitter.findFirst({
      where: { email: sitterData.email },
    });
    if (!sitter) {
      sitter = await prisma.petSitter.create({ data: sitterData });
      for (const service of petSitterServices[i]) {
        await prisma.petSitterService.create({
          data: { petSitterId: sitter.id, ...service },
        });
      }
    }
  }
  console.log('Pet sitters created:', petSittersData.length);

  // Create boarding room
  await prisma.boardingRoom.upsert({
    where: { businessId_name: { businessId: business.id, name: 'Suite Individual' } },
    update: {},
    create: {
      businessId: business.id,
      name: 'Suite Individual',
      code: 'S01',
      roomType: 'INDIVIDUAL',
      acceptedSpecies: ['DOG', 'CAT'],
      acceptedSizes: ['MINI', 'SMALL', 'MEDIUM'],
      capacity: 1,
      dailyRate: 120,
      amenities: ['Ar condicionado', 'Camera', 'Cama ortopedica'],
      hasCamera: true,
    },
  });

  console.log('Boarding room created');

  // Create daycare package
  await prisma.daycarePackage.upsert({
    where: { id: 'daycare-mensal' },
    update: {},
    create: {
      id: 'daycare-mensal',
      businessId: business.id,
      name: 'Plano Mensal',
      description: 'Plano mensal com 20 diarias',
      packageType: 'MONTHLY',
      daysIncluded: 20,
      validityDays: 30,
      shift: 'FULL',
      price: 800,
      activities: ['Passeio', 'Socializacao', 'Brincadeiras'],
    },
  });

  console.log('Daycare package created');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
