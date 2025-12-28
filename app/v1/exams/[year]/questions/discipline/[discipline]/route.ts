import { NextRequest } from 'next/server'
import { RateLimiter } from '@/lib/api/rate-limit';
import { logger } from '@/lib/api/logger';
import { getExamDetails } from '@/lib/api/exams/get-exam-details';
import { EnemApiError, handleAndReturnErrorResponse } from '@/lib/api/errors';
import {
    GetQuestionsQuerySchema,
} from '@/lib/zod/schemas/questions';
import { getSearchParamsAsObject } from '@/lib/utils';
import { getQuestionByDisciplines } from '@/lib/api/questions/get-question-by-disciplines';

const rateLimiter = new RateLimiter();

type Params = {
    year: string;
    discipline: string;
};
export async function GET(
    request: NextRequest,
    { params }: { params: Params }, 
){
    try {
        const { rateLimitHeaders } = rateLimiter.check(request);
        
        await logger(request);
        
        const searchParams = request.nextUrl.searchParams;
        
        let { limit, offset } = GetQuestionsQuerySchema.parse(
            getSearchParamsAsObject(searchParams),
        );

        const exam = await getExamDetails(params.year);

        if (!exam) {
            throw new EnemApiError({
                code: 'not_found',
                message: `No exam found for year ${params.year}`,
            });
        }

        const questionByDisciplines = await getQuestionByDisciplines({
            year: params.year,
            discipline: params.discipline
        });

        if (!questionByDisciplines) {
            throw new EnemApiError({
                code: 'not_found',
                message: `No questions found for discipline ${params.discipline}`,
            });
        }

        return Response.json({
            metadata: {
                limit: Number(limit),
                offset: Number(offset),
                total: exam.questions.length,
                hasMore:
                    Number(offset) + Number(limit) < exam.questions.length,
            },
            questionByDisciplines,
        },{ headers: rateLimitHeaders })
    } catch (error) {
        return handleAndReturnErrorResponse(error);
        
    }
}