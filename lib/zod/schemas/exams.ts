import z from '@/lib/zod';
import { QuestionSchema } from '@/lib/zod/schemas/questions';

export const ExamYearPath = z.string().openapi({
    ref: 'year',
    example: '2020',
    description: 'O ano em que a prova foi aplicada',
});

export const ExamSchema = z
    .object({
        title: z
            .string()
            .describe('O título da prova')
            .openapi({ example: 'ENEM 2020' }),
        year: z
            .number()
            .int()
            .positive()
            .describe('O ano em que a prova foi aplicada')
            .openapi({ example: 2020 }),
        disciplines: z
            .array(
                z.object({
                    label: z.string().describe('O nome da disciplina'),
                    value: z.string().describe('O código da disciplina'),
                }),
            )
            .describe('As disciplinas da prova')
            .openapi({
                example: [
                    {
                        label: 'Ciências Humanas e suas Tecnologias',
                        value: 'ciencias-humanas',
                    },
                    {
                        label: 'Ciências da Natureza e suas Tecnologias',
                        value: 'ciencias-natureza',
                    },
                    {
                        label: 'Linguagens, Códigos e suas Tecnologias',
                        value: 'linguagens',
                    },
                    {
                        label: 'Matemática e suas Tecnologias',
                        value: 'matematica',
                    },
                ],
            }),
        languages: z
            .array(
                z.object({
                    label: z.string().describe('O nome do idioma'),
                    value: z.string().describe('O código do idioma'),
                }),
            )
            .describe('Os idiomas da prova')
            .openapi({
                example: [
                    {
                        label: 'Espanhol',
                        value: 'espanhol',
                    },
                    {
                        label: 'Inglês',
                        value: 'ingles',
                    },
                ],
            }),
    })
    .openapi({
        title: 'Prova',
    });

export const ExamDetailSchema = ExamSchema.extend({
    questions: z.array(QuestionSchema).describe('As questões da prova'),
}).openapi({
    title: 'Detalhes da prova',
});
