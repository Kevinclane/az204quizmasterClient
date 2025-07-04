import { Injectable } from "@angular/core";
import { QuizRequest } from "../../models/quiz-request.model";

@Injectable({
    providedIn: 'root'
})

export class QuizStateService {

    private _quizId: number = 0;
    private _compute: boolean = true;
    private _storage: boolean = true;
    private _security: boolean = true;
    private _monitor: boolean = true;
    private _thirdParty: boolean = true;
    private _questionCount: number = 0;

    constructor() { }

    public getQuizId() {
        return this._quizId;
    }

    public setQuizId(value: number) {
        this._quizId = value;
    }

    public setValues(quizRequest: QuizRequest) {
        this._compute = quizRequest.compute;
        this._storage = quizRequest.storage;
        this._security = quizRequest.security;
        this._monitor = quizRequest.monitor;
        this._thirdParty = quizRequest.thirdParty;
        this._questionCount = quizRequest.questionCount
    }

    public getAsRequest(): QuizRequest {
        return {
            compute: this._compute,
            storage: this._storage,
            security: this._security,
            monitor: this._monitor,
            thirdParty: this._thirdParty,
            questionCount: this._questionCount
        }
    }

    public getFormOptions(): {
        display: string,
        value: string
    }[] {
        return [
            {
                display: 'Develop Azure compute solutions',
                value: 'compute'
            },
            {
                display: 'Develop for Azure storage',
                value: 'storage'
            },
            {
                display: 'Implement Azure security',
                value: 'security'
            },
            {
                display: 'Monitor, troubleshoot, and optimize Azure solutions',
                value: 'monitor'
            },
            {
                display: 'Connect to and consume Azure services and third-party services',
                value: 'thirdParty'
            }
        ]
    }
}