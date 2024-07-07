import z from '@/lib/zod';
import { QuestionSchema } from '@/lib/zod/schemas/questions';

export const ExamSchema = z
    .object({
        title: z.string().describe('The title of the exam'),
        year: z
            .number()
            .int()
            .positive()
            .describe('The year the exam was taken'),
        disciplines: z
            .array(
                z.object({
                    label: z.string().describe('The name of the discipline'),
                    value: z.string().describe('The code of the discipline'),
                }),
            )
            .describe('The disciplines of the exam'),
        languages: z
            .array(
                z.object({
                    label: z.string().describe('The name of the language'),
                    value: z.string().describe('The code of the language'),
                }),
            )
            .describe('The languages of the exam'),
    })
    .openapi({
        title: 'Exam',
    });

export const ExamDetailSchema = ExamSchema.extend({
    questions: z
        .array(QuestionSchema)
        .describe('The questions of the exam'),
}).openapi({
    title: 'ExamDetail',
});
