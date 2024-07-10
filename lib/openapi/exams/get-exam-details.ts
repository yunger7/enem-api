import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import { ExamDetailSchema } from '@/lib/zod/schemas/exams';

export const getExamDetails: ZodOpenApiOperationObject = {
    operationId: 'getExamDetails',
    summary: 'Listar prova',
    description: 'Lstar detalhes de uma prova por seu ano',
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
