import { Component, EventEmitter, Input, Output } from "@angular/core";
import { QuizQuestionResponse } from "../../../models/quiz-question-response.model";
import { CommonModule } from "@angular/common";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    template: `
        <div class="question" [innerHTML]="activeQuestion.question"></div>
        <img *ngIf="activeQuestion.image" src={{activeQuestion.image}} alt="error loading image">
        <div class="options">
            <div class="option" *ngFor="let option of activeQuestion?.options">
                <input 
                type="checkbox" 
                id="{{option.id}}" 
                name="option" 
                value="{{option.id}}" 
                (change)="onCheckChange($event)"
                >
                <label for="{{option.id}}">{{option.leftDisplay}}</label>
            </div>
        </div>
    `,
    selector: 'app-multiple-choice-multiple-display',
    standalone: true,
    styleUrl: './multiple-choice-multiple-display.component.scss',
    imports: [CommonModule, ReactiveFormsModule]
})

export class MultipleChoiceMultipleDisplayComponent {
    @Input() activeQuestion!: QuizQuestionResponse;
    @Output() emitIsDisabled = new EventEmitter<boolean>();

    formGroup = new FormGroup({
        choices: new FormArray([])
    });

    onCheckChange(event: any) {
        const formArray = this.formGroup.get('choices') as FormArray;
        if (event.target.checked) {
            formArray.push(new FormControl(event.target.value));
        } else {
            let i: number = 0;
            formArray.controls.forEach((item: any) => {
                if (item.value == event.target.value) {
                    formArray.removeAt(i);
                    return;
                }
                i++;
            });
        }
        if (formArray.length == 0) {
            console.log('emiiting true');
            this.emitIsDisabled.emit(true);
        } else {
            console.log('emiiting false');
            this.emitIsDisabled.emit(false);
        }
    }

    getAnswers() {
        const formArray = this.formGroup.get('choices') as FormArray;
        return formArray.value;
    }
}