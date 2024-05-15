import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  template: `
    <div class="header">
      <div class="material-icons">home</div>
      <div class="title">Welcome to the Quiz Master</div>
      <div class="material-icons">account_circle</div>
    </div>
    <div class="container">
        <div class="description">
          This application is designed to help you prepare for the AZ-204 exam.
          You can take quizzes on various topics and see how you score.
        </div>
        <div class="split-container">
          <div class="exam-breakdown">
            <h2>Skills measured as of January 22, 2024</h2> 
              <ul>
                <li>Develop Azure compute solutions (25-30%)</li>
                <li>Develop for Azure storage (15-20%)</li>
                <li>Implement Azure security (20-25%)</li>
                <li>Monitor, troubleshoot, and optimize Azure solutions (15-20%)</li>
                <li>Connect to and consume Azure services and third-party services (15-20%)</li>
              </ul>
          </div>
          <div class="quiz-selection">
            <h2>Select sections to customize your quiz</h2>
            <div>
              <input type="checkbox">
              Develop Azure compute solutions
            </div>
            <div>Develop for Azure storage</div>
            <div>Implement Azure security</div>
            <div>Monitor, troubleshoot, and optimize Azure solutions</div>
            <div>Connect to and consume Azure services and third-party services</div>
          </div>
        </div>
        <div class="button-container">
          <a routerLink="/quizzes">Start a Quiz</a>
        </div>
    </div>
  `,
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
