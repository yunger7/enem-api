import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import { GetQuestionsResponseSchema } from '@/lib/zod/schemas/questions';

export const getQuestions: ZodOpenApiOperationObject = {
    operationId: 'getQuestions',
    summary: 'List questions',
    description: 'Get a list of questions from a given exam',
    responses: {
        '200': {
            description: 'List of questions',
            content: {
                'application/json': {
                    schema: GetQuestionsResponseSchema,
                }
            }
        },
        ...openApiErrorResponses,
    },
    tags: ['Questions'],
};
