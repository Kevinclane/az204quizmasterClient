import { Component } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderComponent } from "../../header/header.component";
import { QuizResults } from "../../models/quiz-results.model";
import { CommonModule } from "@angular/common";
import { QuizQuestionResponse } from "../../models/quiz-question-response.model";
import { ActiveQAResult } from "../../models/active-qa-results.model";
import { QuizOption } from "../../models/quiz-option.model";
import { QuizResultsExpandedComponent } from "./quiz-results-expanded.compontent";
import { HeaderStateService } from "../../services/states/headerstate.service";

@Component({
    template: `
        <!-- <app-header [title]="percent"></app-header> -->
        <div class="container">
            <div 
                *ngFor="let activeQA of results?.activeQAs"
                class="question-container" 
                >
                    <div>
                        <div class="question" [innerHTML]="activeQA.qa.question">
                        </div>
                        <div class="symbol">
                            {{checkIsCorrect(activeQA) ? '✅' : '❌'}}
                        </div>
                    </div>
                    <app-quiz-results-expanded [activeQA]="activeQA" />
            </div>
        </div>
    `,
    selector: 'app-quiz-results',
    standalone: true,
    styleUrl: './quiz-results.component.scss',
    imports: [HeaderComponent, CommonModule, QuizResultsExpandedComponent]
})

export class QuizResultsComponent {
    results?: QuizResults;
    percent: string = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _apiService: ApiService,
        private _headerStateService: HeaderStateService
    ) { }

    ngOnInit() {
        this._apiService.get('/quiz/results/' + this.route.snapshot.paramMap.get('quizId'))
            .subscribe((response) => {
                this.results = this.convertResponse(response);
                this.calculatePercent();
                this._headerStateService.setTitle(this.percent);
            });
    }

    //This method is a tempory work-around. 
    //The nested objects' fields are not being converted from Pascal case to camel case by the HttpClient
    convertResponse(apiResponse: any): QuizResults {
        let results: QuizResults = {
            id: apiResponse.Id,
            activeQAs: []
        }

        for (let i = 0; i < apiResponse.ActiveQAs.length; i++) {
            let options: QuizOption[] = [];

            for (let j = 0; j < apiResponse.ActiveQAs[i].QA.Options.length; j++) {
                let option = {
                    id: apiResponse.ActiveQAs[i].QA.Options[j].Id,
                    leftDisplay: apiResponse.ActiveQAs[i].QA.Options[j].LeftDisplay,
                    rightDisplay: apiResponse.ActiveQAs[i].QA.Options[j].RightDisplay,
                    isCorrect: apiResponse.ActiveQAs[i].QA.Options[j].IsCorrect
                }
                options.push(option);
            }

            let qa: QuizQuestionResponse = {
                quizId: apiResponse.ActiveQAs[i].QA.QuizId,
                qaId: apiResponse.ActiveQAs[i].QA.QaId,
                aqAid: apiResponse.ActiveQAs[i].AqAid,
                totalQuestionCount: 0,
                finishedQuestionCount: 0,

                question: apiResponse.ActiveQAs[i].QA.Question,
                options: options,
                category: apiResponse.ActiveQAs[i].QA.Category,
                links: apiResponse.ActiveQAs[i].QA.Links,
                image: apiResponse.ActiveQAs[i].QA.Image,
                questionType: apiResponse.ActiveQAs[i].QA.QuestionType
            }

            let activeQA: ActiveQAResult = {
                id: apiResponse.ActiveQAs[i].Id,
                qaId: apiResponse.ActiveQAs[i].QaId,
                quizId: apiResponse.ActiveQAs[i].QuizId,
                submittedAnswers: apiResponse.ActiveQAs[i].SubmittedAnswers,
                qa: qa
            }
            results.activeQAs.push(activeQA);
        }
        return results;
    }

    checkIsCorrect(activeQA: ActiveQAResult): boolean {
        let correctAnswers = activeQA.qa.options.filter(option => option.isCorrect);
        for (let i = 0; i < activeQA.submittedAnswers.length; i++) {
            if (!correctAnswers.find(option => option.id === activeQA.submittedAnswers[i])) {
                return false;
            }
        }

        return true;
    }

    calculatePercent() {
        let correctCount = 0;
        if (!this.results) {
            return;
        }
        for (let i = 0; i < this.results.activeQAs.length; i++) {
            if (this.checkIsCorrect(this.results.activeQAs[i])) {
                correctCount++;
            }
        }
        this.percent = Math.ceil((correctCount / this.results.activeQAs.length) * 100).toString() + '%';
    }

}