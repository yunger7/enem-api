import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { QuestionDetailSchema } from '@/lib/zod/schemas/questions';

type GetQuestionDetailsPayload = {
    year: string | number;
    index: string | number;
    language?: string | null;
};

export async function getQuestionDetails(payload: GetQuestionDetailsPayload) {
    let filePath = `${process.cwd()}/public/${payload.year}/questions/${payload.index}/details.json`;

    if (!existsSync(filePath)) {
        if (!payload.language) {
            return null;
        }

        filePath = `${process.cwd()}/public/${payload.year}/questions/${payload.index}-${payload.language}/details.json`;

        if (!existsSync(filePath)) {
            return null;
        }
    }

    const questionRaw = await readFile(filePath, 'utf-8');

    const question = JSON.parse(questionRaw) as typeof QuestionDetailSchema;

    return QuestionDetailSchema.parse(question);
}
