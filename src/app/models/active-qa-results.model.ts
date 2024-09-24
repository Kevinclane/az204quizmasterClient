import { QuizQuestionResponse } from "./quiz-question-response.model";

export interface ActiveQAResult {
    id: number,
    qaId: number,
    quizId: number,
    qa: QuizQuestionResponse,
    submittedAnswers: number[]
}