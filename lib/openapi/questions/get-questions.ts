import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import { GetQuestionsResponseSchema } from '@/lib/zod/schemas/questions';

export const getQuestions: ZodOpenApiOperationObject = {
    operationId: 'getQuestions',
    summary: 'Listar questões',
    description: 'Listar questões de uma prova em específico',
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
