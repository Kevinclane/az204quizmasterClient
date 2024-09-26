import { Component, Input } from "@angular/core";
import { ActiveQAResult } from "../../models/active-qa-results.model";
import { CommonModule } from "@angular/common";


@Component({
    template: `
        <div class="container">
             <div *ngIf="expanded">
                <div *ngFor="let question of questions" class="question-container">
                    <div [ngClass]="question.displayColor">
                        {{question.leftDisplay}}
                    </div>
                </div>
            </div>
            <div class="material-icons button-toggle"  (click)="toggleExpand()">
                {{expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}
            </div>
        </div>
    `,
    selector: 'app-quiz-results-expanded',
    standalone: true,
    styleUrl: './quiz-results-expanded.component.scss',
    imports: [CommonModule]
})

export class QuizResultsExpandedComponent {
    @Input() activeQA!: ActiveQAResult;
    expanded: boolean = false;
    questions: {
        id: number,
        leftDisplay: string,
        rightDisplay: string,
        isCorrect?: boolean,
        displayColor: string
    }[] = [];

    toggleExpand() {
        this.expanded = !this.expanded;
    }

    ngOnInit() {
        for (let i = 0; i < this.activeQA.qa.options.length; i++) {
            let option = this.activeQA.qa.options[i];

            const question = {
                id: this.activeQA.qa.options[i].id,
                leftDisplay: this.activeQA.qa.options[i].leftDisplay,
                rightDisplay: this.activeQA.qa.options[i].rightDisplay,
                isCorrect: this.activeQA.qa.options[i].isCorrect,
                displayColor: 'none'
            }

            let userSelectedOption = this.activeQA.submittedAnswers.includes(option.id);
            if (question.isCorrect) {
                question.displayColor = 'green';
            } else if (!question.isCorrect && userSelectedOption) {
                question.displayColor = 'red';
            }

            this.questions.push(question);
        }
    }
}
