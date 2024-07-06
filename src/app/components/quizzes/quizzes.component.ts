import { Component } from '@angular/core';
import { QuizStateService } from '../../services/states/quizstate.service';
import { ApiService } from '../../services/api.service';
import { CookieService } from '../../services/cookie.service';
import { QuizQuestionResponse } from '../../models/quiz-question-response.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";

@Component({
  template: `
    <app-header title="X/X"></app-header>
    <div class="container">
      <div class="question-container">
        <div class="question" [innerHTML]="activeQuestion?.question"></div>
        <div class="options">
          <div class="option" *ngFor="let option of activeQuestion?.options">
            <input type="radio" id="{{option.id}}" name="option" value="{{option.leftDisplay}}">
            <label for="{{option.id}}">{{option.leftDisplay}}</label>
          </div>
        </div>
      </div>
    </div>
  `,
  selector: 'app-quizzes',
  standalone: true,
  styleUrl: './quizzes.component.scss',
  imports: [CommonModule, HeaderComponent]
})
export class QuizzesComponent {
  quizId?: number;
  activeQuestion?: QuizQuestionResponse;

  constructor(
    private _quizStateService: QuizStateService,
    private _apiService: ApiService,
    private _cookieService: CookieService
  ) { }

  ngOnInit() {
    this.syncQuizCookie();
    this.getNextQuestion();
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

  private getNextQuestion() {
    this._apiService.get(`/quiz/nextQuestion/${this.quizId}`)
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
