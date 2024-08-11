import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { ExamSchema } from '@/lib/zod/schemas/exams';

export async function getExams() {
    const filePath = path.join(process.cwd(), 'public/exams.json');

    const examsRaw = await readFile(filePath, 'utf-8');
    const exams = JSON.parse(examsRaw) as Array<typeof ExamSchema>;

    return exams.map(exam => ExamSchema.parse(exam));
}
