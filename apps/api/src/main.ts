import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS
  const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in early stage; log for monitoring
      }
    },
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('PetPro API')
    .setDescription('API para gestao de negocios pet')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticacao')
    .addTag('businesses', 'Gestao de negocios')
    .addTag('tutors', 'Gestao de tutores')
    .addTag('pets', 'Gestao de pets')
    .addTag('appointments', 'Agendamentos')
    .addTag('medical-records', 'Prontuario veterinario')
    .addTag('vaccines', 'Carteira de vacinacao')
    .addTag('adoption', 'Adocao de animais')
    .addTag('boarding', 'Hospedagem/Hotel')
    .addTag('daycare', 'Creche/Daycare')
    .addTag('services', 'Servicos')
    .addTag('products', 'Produtos')
    .addTag('sales', 'Vendas')
    .addTag('finance', 'Financeiro')
    .addTag('whatsapp', 'WhatsApp')
    .addTag('analytics', 'Analytics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || process.env.API_PORT || 3001;
  await app.listen(port);

  console.log(`PetPro API running on port ${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();
