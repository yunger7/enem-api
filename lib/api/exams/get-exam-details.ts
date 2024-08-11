import path from 'node:path';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { ExamDetailSchema } from '@/lib/zod/schemas/exams';

export async function getExamDetails(year: string | number) {
    const filePath = path.join(
        process.cwd(),
        'public',
        `${year}`,
        'details.json',
    );

    if (!existsSync(filePath)) {
        return null;
    }

    const examRaw = await readFile(filePath, 'utf-8');

    const exam = JSON.parse(examRaw) as typeof ExamDetailSchema;

    return ExamDetailSchema.parse(exam);
}
