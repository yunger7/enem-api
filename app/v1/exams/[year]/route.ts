import { NextRequest, NextResponse } from 'next/server';
import { getExams } from '@/lib/api/exams/get-exams';
import { getExamDetails } from '@/lib/api/exams/get-exam-details';
import { GetExamDetailsQuerySchema } from '@/lib/zod/schemas/exams';
import { getSearchParamsAsObject } from '@/lib/utils';
import { EnemApiError, handleAndReturnErrorResponse } from '@/lib/api/errors';
import { RateLimiter } from '@/lib/api/rate-limit';
import { logger } from '@/lib/api/logger';

export const dynamic = 'force-dynamic';

const rateLimiter = new RateLimiter();

const getExamsYears = async () => {
    const exams = await getExams();
    return exams.map(exam => exam.year);
};

export async function GET(
    request: NextRequest,
    { params }: { params: { year: string } },
) {
    try {
        const { rateLimitHeaders } = rateLimiter.check(request);

        await logger(request);

        const { application } = GetExamDetailsQuerySchema.parse(
            getSearchParamsAsObject(request.nextUrl.searchParams),
        );

        const examYears = await getExamsYears();

        if (!examYears.includes(Number(params.year))) {
            throw new EnemApiError({
                code: 'not_found',
                message: `No exam found for year ${params.year}`,
            });
        }

        const exam = await getExamDetails({
            year: params.year,
            application,
        });

        if (!exam) {
            throw new EnemApiError({
                code: 'not_found',
                message: `No exam found for year ${params.year}` +
                    (application === 'reaplicacao'
                        ? ' (reaplicação not available for this year)'
                        : ''),
            });
        }

        return NextResponse.json(exam, { headers: rateLimitHeaders });
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}