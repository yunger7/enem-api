import z from '@/lib/zod';
import { ZodOpenApiOperationObject } from 'zod-openapi';
import { openApiErrorResponses } from '@/lib/openapi/responses';
import { ExamSchema } from '@/lib/zod/schemas/exams';

export const getExams: ZodOpenApiOperationObject = {
    operationId: 'getExams',
    summary: 'Listar provas',
    description: 'Listar todas as provas disponíveis',
    responses: {
        '200': {
            description: 'Lista de provas',
            content: {
                'application/json': {
                    schema: z.array(ExamSchema),
                },
            },
        },
        ...openApiErrorResponses,
    },
    tags: ['Provas'],
};
