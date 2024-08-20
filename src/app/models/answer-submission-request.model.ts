export interface AnswerSubmissionRequest {
    quizId: number;
    aqAId?: number;
    optionIds: number[];
}