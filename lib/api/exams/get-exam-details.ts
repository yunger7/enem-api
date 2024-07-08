import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { ExamDetailSchema } from '@/lib/zod/schemas/exams';

export async function getExamDetails(year: string | number) {
    if (!existsSync(`${process.cwd()}/public/${year}/details.json`)) {
        return null;
    }

    const examRaw = await readFile(
        `${process.cwd()}/public/${year}/details.json`,
        'utf-8',
    );

    const exam = JSON.parse(examRaw) as typeof ExamDetailSchema;

    return ExamDetailSchema.parse(exam);
}
