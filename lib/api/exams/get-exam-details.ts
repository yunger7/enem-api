import path from 'node:path';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { ExamDetailSchema } from '@/lib/zod/schemas/exams';

type GetExamDetailsPayload = {
    year: string | number;
    application?: 'regular' | 'reaplicacao';
};

export async function getExamDetails({
    year,
    application = 'regular',
}: GetExamDetailsPayload) {
    const folder =
        application === 'reaplicacao' ? `${year}-reaplicacao` : `${year}`;
    const filePath = path.join(process.cwd(), 'public', folder, 'details.json');

    if (!existsSync(filePath)) {
        return null;
    }

    const examRaw = await readFile(filePath, 'utf-8');

    const exam = JSON.parse(examRaw) as typeof ExamDetailSchema;

    return ExamDetailSchema.parse(exam);
}
