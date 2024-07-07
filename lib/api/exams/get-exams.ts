import { readFile } from 'node:fs/promises';
import { ExamSchema } from '@/lib/zod/schemas/exams';

export async function getExams() {
    const examsRaw = await readFile(
        `${process.cwd()}/public/exams.json`,
        'utf-8',
    );

    const exams = JSON.parse(examsRaw) as Array<typeof ExamSchema>;

    return exams.map(exam => ExamSchema.parse(exam));
}
