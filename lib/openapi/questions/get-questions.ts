import z from '@/lib/zod';
import { ZodOpenApiOperationObject } from 'zod-openapi';
import { ExamYearPath } from '@/lib/zod/schemas/exams';
import {
    GetQuestionsResponseSchema,
    GetQuestionsQuerySchema,
} from '@/lib/zod/schemas/questions';
import { openApiErrorResponses } from '@/lib/openapi/responses';

export const getQuestions: ZodOpenApiOperationObject = {
    operationId: 'getQuestions',
    summary: 'Listar questões',
    description: 'Listar questões de uma prova por seu ano',
    requestParams: {
        path: z.object({
            year: ExamYearPath,
        }),
        query: GetQuestionsQuerySchema,
    },
    responses: {
        '200': {
            description: 'Lista de questões',
            content: {
                'application/json': {
                    schema: GetQuestionsResponseSchema,
                },
            },
        },
        ...openApiErrorResponses,
    },
    tags: ['Questões'],
};
