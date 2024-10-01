import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStateService } from '../../services/states/quizstate.service';
import { ApiService } from '../../services/api.service';
import { CookieService } from '../../services/cookie.service';
import { QuizQuestionResponse } from '../../models/quiz-question-response.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { AnswerSubmissionRequest } from '../../models/answer-submission-request.model';
import { MultipleChoiceSingleDisplayComponent } from "./questionDisplays/multiple-choice-single-display.component";
import { MultipleChoiceMultipleDisplayComponent } from "./questionDisplays/multiple-choice-multiple-display.component";

@Component({
  template: `
    <app-header [title]="questionCounter"></app-header>
    <div class="container">
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
  `,
  selector: 'app-quizzes',
  standalone: true,
  styleUrl: './quizzes.component.scss',
  imports: [CommonModule, HeaderComponent, MultipleChoiceSingleDisplayComponent, MultipleChoiceMultipleDisplayComponent]
})
export class QuizzesComponent {
  quizId!: number;
  activeQuestion?: QuizQuestionResponse;
  questionCounter: string = 'Question x/x';
  buttonText: string = 'Next';
  buttonFunction: Function = this.submitAndGetNextQuestion;
  isDisabled: boolean = true;

  @ViewChild('multipleChoiceSingleDisplay') multipleChoiceSingleDisplay!: MultipleChoiceSingleDisplayComponent;
  @ViewChild('multipleChoiceMultipleDisplay') multipleChoiceMultipleDisplay!: MultipleChoiceMultipleDisplayComponent;


  constructor(
    private router: Router,
    private _quizStateService: QuizStateService,
    private _apiService: ApiService,
    private _cookieService: CookieService
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
          this.questionCounter = `Question ${this.activeQuestion.finishedQuestionCount}/${this.activeQuestion.totalQuestionCount}`;
          if (this.activeQuestion.finishedQuestionCount === this.activeQuestion.totalQuestionCount) {
            this.buttonText = 'Finish';
            this.buttonFunction = this.finish;
          }
          this.setIsDisabled(true);
          console.log(this.activeQuestion);

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
