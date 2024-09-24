import { QuizOption } from "./quiz-option.model";

export interface QuizQuestionResponse {
    quizId: number,
    qaId: number,
    aqAid: number,
    totalQuestionCount: number,
    finishedQuestionCount: number,
    question: string,
    questionType: number,
    category: number,
    options: QuizOption[],
    links: string[],
    image: string
}

