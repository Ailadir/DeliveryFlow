import { z } from 'zod'

export const step1Schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  phone: z
    .string()
    .regex(
      /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
      'Неверный формат телефона'
    ),
  city: z.string().min(1, 'Укажите город'),
})

export type Step1Data = z.infer<typeof step1Schema>

export const step2Schema = z
  .object({
    receiverName: z.string().min(1, 'Укажите имя получателя'),
    receiverCity: z.string().min(1, 'Укажите город получателя'),
    senderCity: z.string(),
    cargoType: z.enum(['documents', 'fragile', 'regular'] as const, 'Выберите тип груза'),
    weight: z
      .number({ error: 'Введите вес' })
      .min(0.1, 'Минимальный вес 0.1 кг')
      .max(30, 'Максимальный вес 30 кг'),
  })
  .refine((data) => data.receiverCity !== data.senderCity, {
    message: 'Город получателя должен отличаться от города отправителя',
    path: ['receiverCity'],
  })

export type Step2Data = z.infer<typeof step2Schema>

export const step3Schema = z.object({
  agreedToTerms: z.literal(true, 'Необходимо согласиться с условиями'),
})

export type Step3Data = z.infer<typeof step3Schema>
