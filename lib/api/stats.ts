import { getExams } from '@/lib/api/exams/get-exams';
import { getExamDetails } from '@/lib/api/exams/get-exam-details';

export async function getStats() {
    const exams = await getExams();

    const examYears = exams.map(exam => exam.year);

    const minYear = Math.min(...examYears);
    const maxYear = Math.max(...examYears);

    let totalQuestions = 0;

    for (const exam of exams) {
        const examDetails = await getExamDetails(exam.year);

        totalQuestions += examDetails?.questions.length || 0;
    }

    return {
        minYear,
        maxYear,
        totalQuestions: Math.floor(totalQuestions / 100) * 100,
    };
}
