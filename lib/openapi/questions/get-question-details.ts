import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import { QuestionDetailSchema } from '@/lib/zod/schemas/questions';

export const getQuestionDetails: ZodOpenApiOperationObject = {
    operationId: 'getQuestionDetails',
    summary: 'Get question details',
    description: 'Get details of a given question by index',
    responses: {
        '200': {
            description: 'Question details',
            content: {
                'application/json': {
                    schema: QuestionDetailSchema,
                },
            },
        },
        ...openApiErrorResponses,
    },
    tags: ['Exams'],
};
