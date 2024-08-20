import { Component, ViewChild } from '@angular/core';
import { QuizStateService } from '../../services/states/quizstate.service';
import { ApiService } from '../../services/api.service';
import { CookieService } from '../../services/cookie.service';
import { QuizQuestionResponse } from '../../models/quiz-question-response.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { AnswerSubmissionRequest } from '../../models/answer-submission-request.model';
import { MultipleChoiceSingleDisplayComponent } from "../multiple-choice-single-display/multiple-choice-single-display.component";

@Component({
  template: `
    <app-header title="X/X"></app-header>
    <div class="container">
      <div class="question-container" *ngIf="activeQuestion">
        <app-multiple-choice-single-display
          *ngIf="activeQuestion.questionType === 0"
          [activeQuestion]="activeQuestion"
          #multipleChoiceSingleDisplay
        ></app-multiple-choice-single-display>
        <div class="button-container">
          <button class="button-primary" (click)="submitAndGetNextQuestion()">Next</button>
        <div>
      </div>
    </div>
  `,
  selector: 'app-quizzes',
  standalone: true,
  styleUrl: './quizzes.component.scss',
  imports: [CommonModule, HeaderComponent, MultipleChoiceSingleDisplayComponent]
})
export class QuizzesComponent {
  quizId!: number;
  activeQuestion?: QuizQuestionResponse;
  @ViewChild('multipleChoiceSingleDisplay') multipleChoiceSingleDisplay!: MultipleChoiceSingleDisplayComponent;

  constructor(
    private _quizStateService: QuizStateService,
    private _apiService: ApiService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.syncQuizCookie();
    this.submitAndGetNextQuestion();
  }

  private syncQuizCookie() {
    let quizId = this._cookieService.getCookie('quizId');
    if (!quizId) {
      this._apiService.post('/quiz/create', this._quizStateService.getAsRequest())
        .subscribe((response) => {
          if (response) {
            this.quizId = response as number;
            this._cookieService.setCookie('quizId', this.quizId.toString(), 1);
          } else {
            console.error('Failed to create quiz');
          }
        });
    } else {
      this.quizId = parseInt(quizId);
    }
  }

  submitAndGetNextQuestion() {
    let answers: number[] = [];

    switch (this.activeQuestion?.questionType) {
      case 0:
        answers = this.multipleChoiceSingleDisplay.getAnswers();
        break;
      case 1:
        break;
    }

    let request: AnswerSubmissionRequest = {
      quizId: this.quizId,
      aqAId: this.activeQuestion?.aqAid,
      optionIds: answers
    };

    this._apiService.post(`/quiz/submitOrNext`, request)
      .subscribe((response) => {
        if (response) {
          this.activeQuestion = response as QuizQuestionResponse;
          console.log('Question:', this.activeQuestion)
        } else {
          console.error('Failed to get question');
        }
      });
  }

}
