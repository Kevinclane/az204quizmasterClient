import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuizStateService } from '../../services/states/quizstate.service';
import { CookieService } from '../../services/cookie.service';
import { HeaderStateService } from '../../services/states/headerstate.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    <div class="container">
          <div class="exam-breakdown">
            <h2>Skills measured as of October 11, 2024</h2> 
            <ul>
              <li>Develop Azure compute solutions (25-30%)</li>
              <li>Develop for Azure storage (15-20%)</li>
              <li>Implement Azure security (15-20%)</li>
              <li>Monitor, troubleshoot, and optimize Azure solutions (10-15%)</li>
              <li>Connect to and consume Azure services and third-party services (20-25%)</li>
            </ul>
          </div>
          <div class="quiz-selection">
            <div>
              <h2>Customize your quiz</h2>
              <div class="justify-start" *ngFor="let option of formOptions">
                <label for="{{option.value}}" class="switch">
                  <input 
                    type="checkbox" 
                    id="{{option.value}}" 
                    name="option" 
                    value="{{option.value}}" 
                    checked="true"
                    (change)="changeQuizSelection($event)"
                    >
                    <span class="slider round"></span>
                </label>
                {{option.display}}
              </div>
              <div class="button-container">
                <button class="button-primary" [disabled]="disabled" (click)="startQuiz()">Start Quiz</button>
              </div>
            </div>
          </div>
          <div class="resources">
              <h2>Free Resources</h2>
              <ul>
                <li><a href="https://docs.microsoft.com/en-us/learn/certifications/exams/az-204" target="_blank">AZ-204 Exam</a></li>
                <li><a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-204" target="_blank">AZ-204 Study Guide</a></li>
                <li><a href="https://www.udemy.com/course/az-204-free-training/" target="_blank">Udemy Course</a></li>
                <li><a href="https://www.youtube.com/watch?v=jZx8PMQjobk&t=11177s" target="_blank">YouTube Video</a></li>
              </ul>
          </div>
    </div>
  `,
  selector: 'app-homepage',
  standalone: true,
  styleUrl: './homepage.component.scss',
  imports: [RouterLink, CommonModule]
})
export class HomepageComponent {

  disabled: boolean = false;

  formOptions: {
    display: string,
    value: string
  }[] = [];

  formGroup: FormGroup;

  constructor(
    private router: Router,
    private _quizStateService: QuizStateService,
    private _cookieService: CookieService,
    private _headerStateService: HeaderStateService
  ) {
    this.formOptions = this._quizStateService.getFormOptions();
    this.formGroup = new FormGroup({
      choices: new FormArray(this.formOptions.map((o) => new FormControl(o.value)))
    });
    this._headerStateService.setTitle('Quiz Master');
  }

  changeQuizSelection(event: any) {
    const formArray = this.formGroup.get('choices') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;
      formArray.controls.forEach((item: any) => {
        if (item.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    if (formArray.length == 0) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  startQuiz() {
    this._cookieService.deleteCookie('quizId');
    this.router.navigate(['/quizzes']);
  }

}
