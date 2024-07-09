import z from '@/lib/zod';
import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import { ExamSchema } from '@/lib/zod/schemas/exams';

export const getExams: ZodOpenApiOperationObject = {
    operationId: 'getExams',
    summary: 'List all exams',
    description: 'Get a list of all exams',
    responses: {
        '200': {
            description: 'List of exams',
            content: {
                'application/json': {
                    schema: z.array(ExamSchema)
                }
            }
        },
        ...openApiErrorResponses,
    },
    tags: ['Exams'],
};
