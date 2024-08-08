import { NextRequest } from 'next/server';
import { getExams } from '@/lib/api/exams/get-exams';
import { handleAndReturnErrorResponse } from '@/lib/api/errors';
import { logger } from '@/lib/api/logger';

export async function GET(request: NextRequest) {
    try {
        await logger(request);

        const exams = await getExams();
        return Response.json(exams);
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}
