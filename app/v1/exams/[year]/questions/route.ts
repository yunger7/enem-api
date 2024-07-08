import z from '@/lib/zod';
import { QuestionDetailSchema } from '@/lib/zod/schemas/questions';
import { EnemApiError, handleAndReturnErrorResponse } from '@/lib/api/errors';
import { getExamDetails } from '@/lib/api/exams/get-exam-details';
import { getQuestionDetails } from '@/lib/api/questions/get-question-details';
import type { NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { year: string } },
) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const limit = searchParams.get('limit') || '10';
        const offset = searchParams.get('offset') || '0';

        let language = searchParams.get('language');

        if (Number(limit) > 50) {
            throw new EnemApiError({
                code: 'bad_request',
                message: 'Limit cannot be greater than 50',
            });
        }

        const exam = await getExamDetails(params.year);

        if (!exam) {
            throw new EnemApiError({
                code: 'not_found',
                message: `No exam found for year ${params.year}`,
            });
        }

        if (language && !exam.languages.find(lang => lang.value === language)) {
            throw new EnemApiError({
                code: 'bad_request',
                message: `Language ${language} not found in exam`,
            });
        }

        if (!language && exam.languages.length > 0) {
            language = exam.languages[0].value;
        }

        const questionsToFetch = exam.questions
            .filter(question => question.language === language || !question.language)
            .filter(question => question.index >= Number(offset))
            .filter(question => question.index <= Number(offset) + Number(limit))

        const questions: Array<z.infer<typeof QuestionDetailSchema>> = [];

        for (const question of questionsToFetch) {
            const questionDetails = await getQuestionDetails({
                year: params.year,
                index: question.index,
                language,
            });

            if (!questionDetails) {
                throw new EnemApiError({
                    code: 'internal_server_error',
                    message: `Failed to fetch question ${question.index}`,
                });
            }

            questions.push(questionDetails);
        }

        return Response.json({
            metadata: {
                limit: Number(limit),
                offset: Number(offset),
                total: exam.questions.length,
                hasMore: Number(offset) + Number(limit) < exam.questions.length,
            },
            questions,
        })
    } catch (error) {
        return handleAndReturnErrorResponse(error);
    }
}

