import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizStateService } from '../../services/states/quizstate.service';
import { HeaderComponent } from "../../header/header.component";

@Component({
  template: `
    <app-header title="Welcome to the Quiz Master"></app-header>
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
            <div class="justify-start">
              <label class="switch">
                <input type="checkbox" (change)="changeQuizSelection($event, 'compute')" [checked]="compute">
                <span class="slider round"></span>
              </label>
              Develop Azure compute solutions
            </div>
            <div class="justify-start">
              <label class="switch">
                <input type="checkbox" (change)="changeQuizSelection($event, 'storage')" [checked]="storage">
                <span class="slider round"></span>
              </label>
              Develop for Azure storage
            </div>
            <div class="justify-start">
              <label class="switch">
                <input type="checkbox" (change)="changeQuizSelection($event, 'security')" [checked]="security">
                <span class="slider round"></span>
              </label>
              Implement Azure security
            </div>
            <div class="justify-start">
              <label class="switch">
                <input type="checkbox" (change)="changeQuizSelection($event, 'monitor')" [checked]="monitor">
                <span class="slider round"></span>
              </label>Monitor, troubleshoot, and optimize Azure solutions
            </div>
            <div class="justify-start">
              <label class="switch">
                <input type="checkbox" (change)="changeQuizSelection($event, 'thirdParty')" [checked]="thirdParty">
                <span class="slider round"></span>
              </label>Connect to and consume Azure services and third-party services
            </div>
            <div class="button-container">
              <a routerLink="/quizzes">Start a Quiz</a>
            </div>
          </div>
        </div>
    </div>
  `,
  selector: 'app-homepage',
  standalone: true,
  styleUrl: './homepage.component.scss',
  imports: [RouterLink, HeaderComponent]
})
export class HomepageComponent {

  compute: boolean;
  storage: boolean;
  security: boolean;
  monitor: boolean;
  thirdParty: boolean;

  constructor(
    private _quizStateService: QuizStateService
  ) {
    this.compute = this._quizStateService.getCompute();
    this.storage = this._quizStateService.getStorage();
    this.security = this._quizStateService.getSecurity();
    this.monitor = this._quizStateService.getMonitor();
    this.thirdParty = this._quizStateService.getThirdParty();
  }

  changeQuizSelection(event: any, quizType: string) {
    switch (quizType) {
      case 'compute':
        this._quizStateService.setCompute(event.target.checked);
        this.compute = this._quizStateService.getCompute();
        console.log('Compute selection updated:', this.compute);
        break;
      case 'storage':
        this._quizStateService.setStorage(event.target.checked);
        this.storage = this._quizStateService.getStorage();
        console.log('Storage selection updated:', this.storage);
        break;
      case 'security':
        this._quizStateService.setSecurity(event.target.checked);
        this.security = this._quizStateService.getSecurity();
        console.log('Security selection updated:', this.security);
        break;
      case 'monitor':
        this._quizStateService.setMonitor(event.target.checked);
        this.monitor = this._quizStateService.getMonitor();
        console.log('Monitor selection updated:', this.monitor);
        break;
      case 'thirdParty':
        this._quizStateService.setThirdParty(event.target.checked);
        this.thirdParty = this._quizStateService.getThirdParty();
        console.log('Third Party selection updated:', this.thirdParty);
        break;
    }
  }
}
