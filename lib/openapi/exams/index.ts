import { ZodOpenApiPathsObject } from 'zod-openapi';
import { getExams } from './get-exams';
import { getExamDetails } from './get-exam-details';

export const examsPaths: ZodOpenApiPathsObject = {
    '/exams': {
        get: getExams,
    },
    '/exams/{year}': {
        get: getExamDetails,
    },
};
