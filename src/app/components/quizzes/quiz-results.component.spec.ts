import { QuizResultsComponent } from './quiz-results.component';
      import { ComponentFixture, TestBed } from "@angular/core/testing";
      import { MockService } from "ng-mocks";

      describe('QuizResultsComponent', () => {
        let fixture: ComponentFixture<QuizResultsComponent>;

        beforeEach(() => {
          fixture = TestBed.createComponent(QuizResultsComponent);
          fixture.autoDetectChanges();

        });
      });