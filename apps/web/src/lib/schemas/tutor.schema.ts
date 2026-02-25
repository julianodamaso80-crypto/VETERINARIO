import { z } from 'zod';

export const createTutorSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(14, 'Telefone invalido'),
  email: z.string().email('Email invalido').or(z.literal('')).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().max(2, 'Use a sigla do estado (ex: SP)').optional(),
  zipCode: z.string().optional(),
});

export type CreateTutorInput = z.infer<typeof createTutorSchema>;
