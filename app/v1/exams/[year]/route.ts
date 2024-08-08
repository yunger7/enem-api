import { NextRequest } from 'next/server';
import { getExams } from '@/lib/api/exams/get-exams';
import { getExamDetails } from '@/lib/api/exams/get-exam-details';
import { EnemApiError, handleAndReturnErrorResponse } from '@/lib/api/errors';
import { logger } from '@/lib/api/logger';

export const dynamic = 'force-dynamic';

const getExamsYears = async () => {
    const exams = await getExams();
    return exams.map(exam => exam.year);
};

export async function GET(
    request: NextRequest,
    { params }: { params: { year: string } },
) {
    try {
        await logger(request);

        const examYears = await getExamsYears();

        if (!examYears.includes(Number(params.year))) {
            throw new EnemApiError({
                code: 'not_found',
                message: `No exam found for year ${params.year}`,
            });
        }

        const exam = await getExamDetails(params.year);

        return Response.json(exam);
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}
