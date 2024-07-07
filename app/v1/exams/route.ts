import { getExams } from '@/lib/api/exams/get-exams';
import { handleAndReturnErrorResponse } from '@/lib/api/errors';

export async function GET() {
    try {
        const exams = await getExams();
        return Response.json(exams);
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}
