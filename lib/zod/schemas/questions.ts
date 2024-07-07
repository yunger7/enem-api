import z from '@/lib/zod';

export const QuestionSchema = z.object({
    title: z.string().describe('The title of the question'),
    index: z
        .number()
        .int()
        .positive()
        .describe('The index of the question'),
    discipline: z
        .string()
        .nullable()
        .describe('The discipline of the question'),
    language: z
        .string()
        .nullable()
        .describe('The language of the question'),
}).openapi({
    title: 'Question',
});

export const QuestionDetailSchema = QuestionSchema.extend({
    year: z
        .number()
        .int()
        .positive()
        .describe('The year the exam was taken'),
    context: z.string().describe('The context of the question in Markdown'),
    files: z.array(z.string()).describe('The files of the question'),
    correctAlternative: z.enum(['A', 'B', 'C', 'D', 'E']).describe('The correct alternative of the question'),
    alternativesIntroduction: z.string().describe('The introduction of the alternatives'),
    alternatives: z
        .array(
            z.object({
                letter: z.enum(['A', 'B', 'C', 'D', 'E']).describe('The letter of the alternative'),
                text: z.string().describe('The text of the alternative'),
                file: z.string().nullable().describe('The file of the alternative'),
                isCorrect: z.boolean().describe('Whether the alternative is correct'),
            }),
        )
        .describe('The alternatives of the question'),
}).openapi({
    title: 'QuestionDetail',
});

