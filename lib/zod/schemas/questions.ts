import z from '@/lib/zod';

export const QuestionIndexPath = z.string().openapi({
    ref: 'index',
    example: '42',
    description: 'O número da questão na prova',
});

export const QuestionSchema = z
    .object({
        title: z
            .string()
            .describe('O título da questão')
            .openapi({ example: 'Questão 1 - ENEM 2020' }),
        index: z
            .number()
            .int()
            .positive()
            .describe('O número da questão na prova')
            .openapi({ example: 1 }),
        discipline: z
            .string()
            .nullable()
            .describe('A disciplina da questão')
            .openapi({ example: 'linguagens' }),
        language: z
            .string()
            .nullable()
            .describe('O idioma da questão')
            .openapi({ example: 'ingles' }),
    })
    .openapi({
        title: 'Questão',
    });

export const QuestionDetailSchema = QuestionSchema.extend({
    year: z
        .number()
        .int()
        .positive()
        .describe('O ano em que a prova foi aplicada')
        .openapi({ example: 2020 }),
    context: z
        .string()
        .nullable()
        .describe('O contexto da questão, em Makdown')
        .openapi({
            example:
                'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        }),
    files: z
        .array(z.string())
        .describe('Os arquivos da questão')
        .openapi({
            example: [
                'https://enem.dev/2020/questions/1-ingles/6e1ca12e-9bc4-472b-8809-84e7e394714a.png',
            ],
        }),
    correctAlternative: z
        .enum(['A', 'B', 'C', 'D', 'E'])
        .describe('A alternativa correta da questão')
        .openapi({ example: 'A' }),
    alternativesIntroduction: z
        .string()
        .describe('O texto introdutório das alternativas da questão')
        .openapi({
            example: 'Com base no texto, selecione a alternativa correta',
        }),
    alternatives: z
        .array(
            z.object({
                letter: z
                    .enum(['A', 'B', 'C', 'D', 'E'])
                    .describe('A letra da alternativa')
                    .openapi({ example: 'A' }),
                text: z
                    .string()
                    .nullable()
                    .describe('O texto da alternativa')
                    .openapi({
                        example:
                            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
                    }),
                file: z
                    .string()
                    .nullable()
                    .describe('O arquivo da alternativa')
                    .openapi({
                        example:
                            'https://enem.dev/2020/questions/1-ingles/6e1ca12e-9bc4-472b-8809-84e7e394714a.png',
                    }),
                isCorrect: z
                    .boolean()
                    .describe('Se a alternativa é a correta ou não')
                    .openapi({ example: true }),
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
            .describe('O número máximo de questões retornadas')
            .openapi({ example: 10 }),
        offset: z
            .number()
            .int()
            .nonnegative()
            .describe('O número da primeira questão retornada')
            .openapi({ example: 0 }),
        total: z
            .number()
            .int()
            .nonnegative()
            .describe('O número total de questões da prova')
            .openapi({ example: 180 }),
        hasMore: z
            .boolean()
            .describe('Se há mais questões disponíveis ou não')
            .openapi({ example: true }),
    }),
    questions: z.array(QuestionDetailSchema).describe('As questões da prova'),
});

export const GetQuestionsQuerySchema = z.object({
    limit: z.coerce
        .number()
        .int()
        .positive()
        .default(10)
        .describe('O número máximo de questões a serem retornadas')
        .openapi({ example: 10 }),
    offset: z.coerce
        .number()
        .int()
        .nonnegative()
        .default(0)
        .describe('O numero da primeira questão a ser retornada')
        .openapi({ example: 0 }),
    language: z
        .string()
        .optional()
        .describe('O idioma desejado das questões')
        .openapi({ example: 'ingles' }),
});

export const GetQuestionDetailsQuerySchema = z.object({
    language: z
        .string()
        .optional()
        .describe('O idioma desejado da questão')
        .openapi({ example: 'ingles' }),
});
