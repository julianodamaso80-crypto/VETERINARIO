import { z } from 'zod';
import { validateCPF } from '@/lib/utils';

export const createTutorSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(14, 'Telefone invalido'),
  email: z.string().email('Email invalido').or(z.literal('')).optional(),
  cpf: z
    .string()
    .refine((val) => !val || validateCPF(val), 'CPF invalido')
    .or(z.literal(''))
    .optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().max(2, 'Use a sigla do estado (ex: SP)').optional(),
  zipCode: z.string().optional(),
});

export type CreateTutorInput = z.infer<typeof createTutorSchema>;
