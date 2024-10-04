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

    constructor() { }

    public getQuizId() {
        return this._quizId;
    }

    public setQuizId(value: number) {
        this._quizId = value;
    }

    public getCompute() {
        return this._compute;
    }

    public setCompute(value: boolean) {
        this._compute = value;
    }

    public getStorage() {
        return this._storage;
    }

    public setStorage(value: boolean) {
        this._storage = value;
    }

    public getSecurity() {
        return this._security;
    }

    public setSecurity(value: boolean) {
        this._security = value;
    }

    public getMonitor() {
        return this._monitor;
    }

    public setMonitor(value: boolean) {
        this._monitor = value;
    }

    public getThirdParty() {
        return this._thirdParty;
    }

    public setThirdParty(value: boolean) {
        this._thirdParty = value;
    }

    public getAsRequest(): QuizRequest {
        return {
            compute: this._compute,
            storage: this._storage,
            security: this._security,
            monitor: this._monitor,
            thirdParty: this._thirdParty
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