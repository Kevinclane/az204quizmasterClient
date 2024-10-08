import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStateService } from '../../services/states/quizstate.service';
import { ApiService } from '../../services/api.service';
import { CookieService } from '../../services/cookie.service';
import { QuizQuestionResponse } from '../../models/quiz-question-response.model';
import { CommonModule } from '@angular/common';
import { AnswerSubmissionRequest } from '../../models/answer-submission-request.model';
import { MultipleChoiceSingleDisplayComponent } from "./questionDisplays/multiple-choice-single-display.component";
import { MultipleChoiceMultipleDisplayComponent } from "./questionDisplays/multiple-choice-multiple-display.component";
import { HeaderStateService } from '../../services/states/headerstate.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  template: `
    <div *ngIf="!loading; else spinner" class="container">
      <div class="question-container" *ngIf="activeQuestion">
        <app-multiple-choice-single-display
          *ngIf="activeQuestion.questionType === 0"
          [activeQuestion]="activeQuestion"
          (emitIsDisabled)="setIsDisabled($event)"
          #multipleChoiceSingleDisplay
        ></app-multiple-choice-single-display>
        <app-multiple-choice-multiple-display
          *ngIf="activeQuestion.questionType === 1"
          [activeQuestion]="activeQuestion"
          #multipleChoiceMultipleDisplay
          (emitIsDisabled)="setIsDisabled($event)"
        >
        </app-multiple-choice-multiple-display>
        <div class="button-container">
          <button 
          class="button-primary" 
          (click)="buttonFunction()"
          [disabled]="isDisabled"
          [class.disabled]="isDisabled"
          >{{buttonText}}</button>
        </div>
      </div>
    </div>
    <ng-template #spinner>
      <div class="spinner-container">
        <mat-spinner
          diameter="50"
        ></mat-spinner>
      </div>
    </ng-template>
  `,
  selector: 'app-quizzes',
  standalone: true,
  styleUrl: './quizzes.component.scss',
  imports: [CommonModule, MultipleChoiceSingleDisplayComponent, MultipleChoiceMultipleDisplayComponent, MatProgressSpinnerModule]
})
export class QuizzesComponent {
  quizId!: number;
  activeQuestion?: QuizQuestionResponse;
  questionCounter: string = 'Question x/x';
  buttonText: string = 'Next';
  buttonFunction: Function = this.submitAndGetNextQuestion;
  isDisabled: boolean = true;
  loading: boolean = true;

  @ViewChild('multipleChoiceSingleDisplay') multipleChoiceSingleDisplay!: MultipleChoiceSingleDisplayComponent;
  @ViewChild('multipleChoiceMultipleDisplay') multipleChoiceMultipleDisplay!: MultipleChoiceMultipleDisplayComponent;

  constructor(
    private router: Router,
    private _quizStateService: QuizStateService,
    private _apiService: ApiService,
    private _cookieService: CookieService,
    private _headerStateService: HeaderStateService
  ) { }

  async ngOnInit() {
    this.syncQuizCookie();
  }

  private syncQuizCookie() {
    let quizId = this._cookieService.getCookie('quizId');
    if (!quizId) {
      this._apiService.post('/quiz/create', this._quizStateService.getAsRequest())
        .subscribe((response) => {
          if (response) {
            this.quizId = response as number;
            this._cookieService.setCookie('quizId', this.quizId.toString(), 1);
            this.submitAndGetNextQuestion();
          } else {
            console.error('Failed to create quiz');
          }
        });
    } else {
      this.quizId = parseInt(quizId);
      this.submitAndGetNextQuestion();
    }
  }

  private generateAnswerSubmissionRequest(): AnswerSubmissionRequest {
    let answers: number[] = [];

    switch (this.activeQuestion?.questionType) {
      case 0:
        answers = this.multipleChoiceSingleDisplay.getAnswers();
        break;
      case 1:
        answers = this.multipleChoiceMultipleDisplay.getAnswers();
        break;
    }

    return {
      quizId: this.quizId,
      aqAId: this.activeQuestion?.aqAid,
      optionIds: answers
    };
  }

  submitAndGetNextQuestion() {
    let request = this.generateAnswerSubmissionRequest();

    this._apiService.post(`/quiz/submitOrNext`, request)
      .subscribe((response) => {
        if (response) {
          this.activeQuestion = response as QuizQuestionResponse;
          this._headerStateService.setTitle(`Question ${this.activeQuestion.finishedQuestionCount}/${this.activeQuestion.totalQuestionCount}`);
          if (this.activeQuestion.finishedQuestionCount === this.activeQuestion.totalQuestionCount) {
            this.buttonText = 'Finish';
            this.buttonFunction = this.finish;
          }
          this.loading = false;
          this.setIsDisabled(true);
        } else {
          console.error('Failed to get question');
        }
      });
  }

  finish() {
    let request = this.generateAnswerSubmissionRequest();

    this._apiService.post(`/quiz/submitOrNext`, request)
      .subscribe(() => {
        this.router.navigate(['/results', this.quizId]);
      });
  }

  setIsDisabled(event: boolean) {
    this.isDisabled = event;
  }

}
