import { Component, EventEmitter, Input, Output } from "@angular/core";
import { QuizQuestionResponse } from "../../../models/quiz-question-response.model";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    template: `
        <div class="question" [innerHTML]="activeQuestion.question"></div>
        <img *ngIf="activeQuestion.image" src={{activeQuestion.image}} alt="error loading image">
        <div class="options">
            <div class="option" *ngFor="let option of activeQuestion?.options">
                <input 
                type="radio"
                id="{{option.id}}"
                name="option"
                value="{{option.id}}"
                [formControl]="selectedOption"
                (change)="emitIsDisabled.emit(false)"
                >
                <label for="{{option.id}}">{{option.leftDisplay}}</label>
            </div>
        </div>
    `,
    selector: 'app-multiple-choice-single-display',
    standalone: true,
    styleUrl: './multiple-choice-single-display.component.scss',
    imports: [CommonModule, ReactiveFormsModule]
})

export class MultipleChoiceSingleDisplayComponent {
    @Input() activeQuestion!: QuizQuestionResponse;
    @Output() emitIsDisabled = new EventEmitter<boolean>();
    selectedOption = new FormControl<number>(0);

    getAnswers() {
        return this.selectedOption.value ? [this.selectedOption.value] : [];
    }

}