import { QuizOption } from "./quiz-option.model";

export interface QuizQuestionResponse {
    question: string,
    questionType: number,
    image: string,
    category: number,
    options: QuizOption[],
    links: string[]
}

