import { ZodOpenApiPathsObject } from 'zod-openapi';
import { getQuestions } from './get-questions';
import { getQuestionDetails } from './get-question-details';
import { getQuestionByDisciplines } from './get-question-by-disciplines';

export const questionsPaths: ZodOpenApiPathsObject = {
    '/exams/{year}/questions': {
        get: getQuestions,
    },
    '/exams/{year}/questions/{index}': {
        get: getQuestionDetails,
    },
    '/exams/{year}/questions/discipline/{discipline}': {
        get: getQuestionByDisciplines,
    },
};
