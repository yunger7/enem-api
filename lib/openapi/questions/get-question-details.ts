import z from '@/lib/zod';
import { ZodOpenApiOperationObject } from 'zod-openapi';
import { ExamYearPath } from '@/lib/zod/schemas/exams';
import {
    QuestionIndexPath,
    QuestionDetailSchema,
    GetQuestionDetailsQuerySchema,
} from '@/lib/zod/schemas/questions';
import { openApiErrorResponses } from '@/lib/openapi/responses';

export const getQuestionDetails: ZodOpenApiOperationObject = {
    operationId: 'getQuestionDetails',
    summary: 'Listar questão',
    description: 'Listar detalhes de uma questão pelo seu número',
    requestParams: {
        path: z.object({
            year: ExamYearPath,
            index: QuestionIndexPath,
        }),
        query: GetQuestionDetailsQuerySchema,
    },
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
