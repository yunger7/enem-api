import { ZodOpenApiPathsObject } from 'zod-openapi';
import { getQuestions } from './get-questions';
import { getQuestionDetails } from './get-question-details';

export const questionsPaths: ZodOpenApiPathsObject = {
    '/exams/{year}/questions': {
        get: getQuestions,
    },
    '/exams/{year}/questions/{index}': {
        get: getQuestionDetails,
    },
};
