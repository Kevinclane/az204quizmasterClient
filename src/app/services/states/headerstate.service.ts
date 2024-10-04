import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class HeaderStateService {

    private _title: Subject<string> = new Subject<string>();

    constructor() { }

    public getTitle() {
        return this._title;
    }

    public setTitle(value: string) {
        this._title.next(value);
    }
}