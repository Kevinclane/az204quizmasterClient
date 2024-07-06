import { Injectable } from "@angular/core";
import { QuizRequest } from "../../models/quiz-request.model";

@Injectable({
    providedIn: 'root'
})

export class QuizStateService {

    private _quizId: string = '';
    private _compute: boolean = true;
    private _storage: boolean = true;
    private _security: boolean = true;
    private _monitor: boolean = true;
    private _thirdParty: boolean = true;

    constructor() { }

    public getQuizId() {
        return this._quizId;
    }

    public setQuizId(value: string) {
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
}