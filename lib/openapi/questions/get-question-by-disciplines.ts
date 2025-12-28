import z from '@/lib/zod';
import { ZodOpenApiOperationObject } from 'zod-openapi';
import { ExamYearPath } from '@/lib/zod/schemas/exams';
import {
    GetQuestionsResponseSchema,
    GetQuestionByDisciplinesQuerySchema,
    QuestionDisciplinePath,
} from '@/lib/zod/schemas/questions';

import { openApiErrorResponses } from '@/lib/openapi/responses';

export const getQuestionByDisciplines: ZodOpenApiOperationObject = {
    operationId: 'getQuestionByDisciplines',
    summary: 'Listar questões por disciplinas',
    description: 'Listar questões de uma prova por disciplinas',
    requestParams: {
        path: z.object({
            year: ExamYearPath,
            discipline: QuestionDisciplinePath
        }),
        query: GetQuestionByDisciplinesQuerySchema,
    },
    responses: {
        '200': {
            description: 'Lista de questões de uma disciplina',
            content: {
                'application/json': {
                    schema: GetQuestionsResponseSchema,
                },
            },
        },
        ...openApiErrorResponses
    },
    tags: ['Questões'],

};