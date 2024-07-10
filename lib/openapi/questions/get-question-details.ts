import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import { QuestionDetailSchema } from '@/lib/zod/schemas/questions';

export const getQuestionDetails: ZodOpenApiOperationObject = {
    operationId: 'getQuestionDetails',
    summary: 'Listar questão',
    description: 'Listar detalhes de uma questão pelo seu número',
    responses: {
        '200': {
            description: 'Detalhes da questão',
            content: {
                'application/json': {
                    schema: QuestionDetailSchema,
                },
            },
        },
        ...openApiErrorResponses,
    },
    tags: ['Questões'],
};
