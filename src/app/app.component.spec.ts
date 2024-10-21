import { AppComponent } from './app.component';
      import { ComponentFixture, TestBed } from "@angular/core/testing";
      import { MockService } from "ng-mocks";

      describe('AppComponent', () => {
        let fixture: ComponentFixture<AppComponent>;

        beforeEach(() => {
          fixture = TestBed.createComponent(AppComponent);
          fixture.autoDetectChanges();

        });
      });