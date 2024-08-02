import z from '@/lib/zod';

export const QuestionSchema = z
    .object({
        title: z.string().describe('O título da questão'),
        index: z
            .number()
            .int()
            .positive()
            .describe('O número da questão na prova'),
        discipline: z.string().nullable().describe('A disciplina da questão'),
        language: z.string().nullable().describe('O idioma da questão'),
    })
    .openapi({
        title: 'Questão',
    });

export const QuestionDetailSchema = QuestionSchema.extend({
    year: z
        .number()
        .int()
        .positive()
        .describe('O ano em que a prova foi aplicada'),
    context: z
        .string()
        .nullable()
        .describe('O contexto da questão, em Makdown'),
    files: z.array(z.string()).describe('Os arquivos da questão'),
    correctAlternative: z
        .enum(['A', 'B', 'C', 'D', 'E'])
        .describe('A alternativa correta da questão'),
    alternativesIntroduction: z
        .string()
        .describe('O texto introdutório das alternativas da questão'),
    alternatives: z
        .array(
            z.object({
                letter: z
                    .enum(['A', 'B', 'C', 'D', 'E'])
                    .describe('A letra da alternativa'),
                text: z.string().nullable().describe('O texto da alternativa'),
                file: z
                    .string()
                    .nullable()
                    .describe('O arquivo da alternativa'),
                isCorrect: z
                    .boolean()
                    .describe('Se a alternativa é a correta ou não'),
            }),
        )
        .describe('As alternativas da questão'),
}).openapi({
    title: 'Detalhes da questão',
});

export const GetQuestionsResponseSchema = z.object({
    metadata: z.object({
        limit: z
            .number()
            .int()
            .positive()
            .describe('O número máximo de questões retornadas'),
        offset: z
            .number()
            .int()
            .nonnegative()
            .describe('O número da primeira questão retornada'),
        total: z
            .number()
            .int()
            .nonnegative()
            .describe('O número total de questões da prova'),
        hasMore: z.boolean().describe('Se há mais questões disponíveis ou não'),
    }),
    questions: z.array(QuestionDetailSchema).describe('As questões da prova'),
});

export const GetQuestionsQuerySchema = z.object({
    limit: z.coerce
        .number()
        .int()
        .positive()
        .default(10)
        .describe('O número máximo de questões a serem retornadas'),
    offset: z.coerce
        .number()
        .int()
        .nonnegative()
        .default(0)
        .describe('O numero da primeira questão a ser retornada'),
    language: z.string().optional().describe('O idioma desejado das questões'),
});

export const GetQuestionDetailsQuerySchema = z.object({
    language: z.string().optional().describe('O idioma desejado da questão'),
});
