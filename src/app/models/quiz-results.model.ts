import { ActiveQAResult } from "./active-qa-results.model";

export interface QuizResults {
    id: number,
    activeQAs: ActiveQAResult[]
}