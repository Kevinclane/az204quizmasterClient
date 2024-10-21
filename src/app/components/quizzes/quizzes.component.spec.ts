import { QuizzesComponent } from './quizzes.component';
      import { ComponentFixture, TestBed } from "@angular/core/testing";
      import { MockService } from "ng-mocks";

      describe('QuizzesComponent', () => {
        let fixture: ComponentFixture<QuizzesComponent>;

        beforeEach(() => {
          fixture = TestBed.createComponent(QuizzesComponent);
          fixture.autoDetectChanges();

        });
      });