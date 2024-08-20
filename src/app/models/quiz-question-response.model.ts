import { QuizOption } from "./quiz-option.model";

export interface QuizQuestionResponse {
    quizId: number,
    qaId: number,
    aqAid: number,
    question: string,
    questionType: number,
    category: number,
    options: QuizOption[],
    links: string[],
    image: string,
}

