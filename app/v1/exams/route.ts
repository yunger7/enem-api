import { readFile } from 'node:fs/promises';

export async function GET() {
    const exams = await readFile(`${process.cwd()}/public/exams.json`, 'utf-8');
    const examsJson = JSON.parse(exams);

    return Response.json(examsJson);
}
