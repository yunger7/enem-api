import z from '@/lib/zod';
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { QuestionDetailSchema } from '@/lib/zod/schemas/questions';


type GetQuestionDetailsPayload = {
    year: string | number;
    discipline: string;
};

type Discipline = {
    label: string;
    value: string;
};

type Language = {
    label: string;
    value: string;
};

type Question = {
    title: string;
    index: number;
    discipline: string;
    language: string | null;
};

type QuestionDetailS = {
    title: string;
    year: number;
    disciplines: Discipline[];
    languages: Language[];
    questions: Question[];
};

export async function getQuestionByDisciplines(payload: GetQuestionDetailsPayload) {
    let filePath = `${process.cwd()}/public/${payload.year}/details.json`;

    if (!existsSync(filePath)) {
        return null;
    }

    const yearRaw = await readFile(filePath, 'utf-8');
    
    const year = JSON.parse(yearRaw) as QuestionDetailS;
    
    let questionsFilteredByDiscipline: Array< z.infer<typeof QuestionDetailSchema>> = [];
    
    for (let i = 0; i < year.questions.length; i++) {
        
        const question: Question  = year.questions[i];
        
        if (question.discipline === payload.discipline) {

            let filePathQuestion = `${process.cwd()}/public/${payload.year}/questions/${question.index}/details.json`;
            
            if (question.language) {   
                filePathQuestion = `${process.cwd()}/public/${payload.year}/questions/${question.index}-${question.language}/details.json`;        
            }            

            const questionRaw = await readFile(filePathQuestion, 'utf-8');
            
            const questionSelected = JSON.parse(questionRaw) as typeof QuestionDetailSchema;
            const questionSelectedParsed = QuestionDetailSchema.parse(questionSelected);
            questionsFilteredByDiscipline.push(questionSelectedParsed);
        }
    }
    return questionsFilteredByDiscipline.length > 0 ? questionsFilteredByDiscipline : null;
}
