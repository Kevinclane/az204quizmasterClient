import { Component, Input } from "@angular/core";
import { ActiveQAResult } from "../../models/active-qa-results.model";
import { CommonModule } from "@angular/common";


@Component({
    template: `
        <div class="container">
             <div *ngIf="expanded; else collapsed" class="option-container">
                <div *ngFor="let option of expandedOptions" [ngClass]="option.displayColor">
                    {{option.leftDisplay}}
                </div>
            </div>
            <ng-template #collapsed>
                <div *ngIf="!expanded" class="option-container">
                    <div *ngFor="let option of collapsedOptions" [ngClass]="option.displayColor">
                        {{option.leftDisplay}}
                    </div>
                </div>
            </ng-template>
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
    @Input() activeQA: ActiveQAResult;
    expanded: boolean = false;
    expandedOptions: {
        id: number,
        leftDisplay: string,
        rightDisplay: string,
        isCorrect?: boolean,
        displayColor: string
    }[] = [];

    collapsedOptions: {
        id: number,
        leftDisplay: string,
        rightDisplay: string,
        isCorrect?: boolean,
        displayColor: string
    }[] = [];

    constructor() {
        this.activeQA = {
            id: 0,
            qaId: 0,
            quizId: 0,
            qa: {
                quizId: 0,
                qaId: 0,
                aqAid: 0,
                totalQuestionCount: 0,
                finishedQuestionCount: 0,
                question: "",
                image: "",
                questionType: 0,
                category: 0,
                options: [],
                links: []
            },
            submittedAnswers: []
        }
    }

    toggleExpand() {
        this.expanded = !this.expanded;
    }

    ngOnInit() {
        this.setCollapsedOptions();
    }

    setCollapsedOptions() {
        for (let i = 0; i < this.activeQA.qa.options.length; i++) {
            const option = {
                id: this.activeQA.qa.options[i].id,
                leftDisplay: this.activeQA.qa.options[i].leftDisplay,
                rightDisplay: this.activeQA.qa.options[i].rightDisplay,
                isCorrect: this.activeQA.qa.options[i].isCorrect,
                displayColor: 'none'
            }

            let userSelectedOption = this.activeQA.submittedAnswers.includes(option.id);
            if (option.isCorrect) {
                option.displayColor = 'green';
            } else if (!option.isCorrect && userSelectedOption) {
                option.displayColor = 'red';
            }

            if (userSelectedOption) {
                this.collapsedOptions.push(option);
            }

            this.expandedOptions.push(option);
        }
    }

}
