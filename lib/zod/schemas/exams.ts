import z from '@/lib/zod';
import { QuestionSchema } from '@/lib/zod/schemas/questions';

export const ExamSchema = z
    .object({
        title: z.string().describe('O título da prova'),
        year: z
            .number()
            .int()
            .positive()
            .describe('O ano em que a prova foi aplicada'),
        disciplines: z
            .array(
                z.object({
                    label: z.string().describe('O nome da disciplina'),
                    value: z.string().describe('O código da disciplina'),
                }),
            )
            .describe('As disciplinas da prova'),
        languages: z
            .array(
                z.object({
                    label: z.string().describe('O nome do idioma'),
                    value: z.string().describe('O código do idioma'),
                }),
            )
            .describe('Os idiomas da prova'),
    })
    .openapi({
        title: 'Prova',
    });

export const ExamDetailSchema = ExamSchema.extend({
    questions: z.array(QuestionSchema).describe('As questões da prova'),
}).openapi({
    title: 'Detalhes da prova',
});
