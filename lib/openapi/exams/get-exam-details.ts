import z from '@/lib/zod';
import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import {
    ExamDetailSchema,
    ExamYearPath,
    GetExamDetailsQuerySchema,
} from '@/lib/zod/schemas/exams';

export const getExamDetails: ZodOpenApiOperationObject = {
    operationId: 'getExamDetails',
    summary: 'Listar prova',
    description:
        'Listar detalhes de uma prova por seu ano. Use o parâmetro ' +
        'application=reaplicacao para obter a prova da reaplicação do mesmo ano.',
    requestParams: {
        path: z.object({
            year: ExamYearPath,
        }),
        query: GetExamDetailsQuerySchema,
    },
    responses: {
        '200': {
            description: 'Detalhes da prova',
            content: {
                'application/json': {
                    schema: ExamDetailSchema,
                },
            },
        },
        ...openApiErrorResponses,
    },
    tags: ['Provas'],
};
