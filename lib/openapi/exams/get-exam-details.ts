import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import { ExamDetailSchema } from '@/lib/zod/schemas/exams';

export const getExamDetails: ZodOpenApiOperationObject = {
    operationId: 'getExamDetails',
    summary: 'Get exam details',
    description: 'Get details of a given exam by year',
    responses: {
        '200': {
            description: 'Exam details',
            content: {
                'application/json': {
                    schema: ExamDetailSchema
                }
            }
        },
        ...openApiErrorResponses,
    },
    tags: ['Exams'],
};
