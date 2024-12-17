import { QuizResultsComponent } from './quiz-results.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockService } from "ng-mocks";
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderStateService } from '../../services/states/headerstate.service';

describe('QuizResultsComponent', () => {
  let fixture: ComponentFixture<QuizResultsComponent>;
  const mockApiService = MockService(ApiService);
  const apiSpy = jest.spyOn(mockApiService, 'get');
  const mockRouter = MockService(Router);
  const mockHeaderStateService = MockService(HeaderStateService);

  beforeEach(() => {
    TestBed.overrideComponent(QuizResultsComponent, {
      add: {
        providers: [
          { provide: ApiService, useValue: mockApiService },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: {
                  get: jest.fn().mockReturnValue('1'),
                }
              }
            }
          },
          { provide: Router, useValue: mockRouter },
          { provide: HeaderStateService, useValue: mockHeaderStateService }
        ]
      }
    });

  });

  it('should create', () => {
    fixture = TestBed.createComponent(QuizResultsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display all questions', () => {
    apiSpy.mockReturnValue(of({
      Id: 1,
      ActiveQAs: [
        {
          Id: 1,
          QaId: 1,
          QuizId: 1,
          AqAId: 1,
          QA: {
            Id: 1,
            Question: 'What is 1 + 1?',
            Options: [
              { Id: 1, Option: '1', IsCorrect: false },
              { Id: 2, Option: '2', IsCorrect: true },
              { Id: 3, Option: '3', IsCorrect: false },
              { Id: 4, Option: '4', IsCorrect: false }
            ]
          },
          SubmittedAnswers: [2]
        }, {
          Id: 2,
          QaId: 2,
          QuizId: 1,
          AqAId: 2,
          QA: {
            Id: 2,
            Question: 'What is 2 + 2?',
            Options: [
              { Id: 5, Option: '1', IsCorrect: false },
              { Id: 6, Option: '2', IsCorrect: false },
              { Id: 7, Option: '3', IsCorrect: false },
              { Id: 8, Option: '4', IsCorrect: true }
            ]
          },
          SubmittedAnswers: [8]
        }, {
          Id: 3,
          QaId: 3,
          QuizId: 1,
          AqAId: 3,
          QA: {
            Id: 3,
            Question: 'What is 3 + 3?',
            Options: [
              { Id: 9, Option: '1', IsCorrect: false },
              { Id: 10, Option: '12', IsCorrect: false },
              { Id: 11, Option: '3', IsCorrect: false },
              { Id: 12, Option: '6', IsCorrect: true }
            ]
          },
          SubmittedAnswers: [10]
        }
      ]
    }));

    fixture = TestBed.createComponent(QuizResultsComponent);
    fixture.detectChanges();

    const questions = fixture.nativeElement.querySelectorAll('.question-container');
    expect(questions.length).toBe(3);
  });

  it('should display whether submitted answer(s) is correct', () => {
    apiSpy.mockReturnValue(of({
      Id: 1,
      ActiveQAs: [
        {
          Id: 1,
          QaId: 1,
          QuizId: 1,
          AqAId: 1,
          QA: {
            Id: 1,
            Question: 'What is 1 + 1?',
            Options: [
              { Id: 1, Option: '1', IsCorrect: false },
              { Id: 2, Option: '2', IsCorrect: true },
              { Id: 3, Option: '3', IsCorrect: false },
              { Id: 4, Option: '4', IsCorrect: false }
            ]
          },
          SubmittedAnswers: [2]
        }, {
          Id: 2,
          QaId: 2,
          QuizId: 1,
          AqAId: 2,
          QA: {
            Id: 2,
            Question: 'What is 2 + 2?',
            Options: [
              { Id: 5, Option: '1', IsCorrect: false },
              { Id: 6, Option: '2', IsCorrect: false },
              { Id: 7, Option: '3', IsCorrect: false },
              { Id: 8, Option: '4', IsCorrect: true }
            ]
          },
          SubmittedAnswers: [8]
        }, {
          Id: 3,
          QaId: 3,
          QuizId: 1,
          AqAId: 3,
          QA: {
            Id: 3,
            Question: 'What is 3 + 3?',
            Options: [
              { Id: 9, Option: '1', IsCorrect: false },
              { Id: 10, Option: '12', IsCorrect: false },
              { Id: 11, Option: '3', IsCorrect: false },
              { Id: 12, Option: '6', IsCorrect: true }
            ]
          },
          SubmittedAnswers: [10]
        }
      ]
    }));

    fixture = TestBed.createComponent(QuizResultsComponent);
    fixture.detectChanges();

    const questions = fixture.nativeElement.querySelectorAll('.symbol');
    expect(questions[0].textContent).toContain('✅');
    expect(questions[1].textContent).toContain('✅');
    expect(questions[2].textContent).toContain('❌');
  });

  it('should navigate home when button is clicked', () => {
    const routerSpy = jest.spyOn(mockRouter, 'navigate');

    apiSpy.mockReturnValue(of({
      Id: 1,
      ActiveQAs: [
        {
          Id: 1,
          QaId: 1,
          QuizId: 1,
          AqAId: 1,
          QA: {
            Id: 1,
            Question: 'What is 1 + 1?',
            Options: [
              { Id: 1, Option: '1', IsCorrect: false },
              { Id: 2, Option: '2', IsCorrect: true },
              { Id: 3, Option: '3', IsCorrect: false },
              { Id: 4, Option: '4', IsCorrect: false }
            ]
          },
          SubmittedAnswers: [2]
        }, {
          Id: 2,
          QaId: 2,
          QuizId: 1,
          AqAId: 2,
          QA: {
            Id: 2,
            Question: 'What is 2 + 2?',
            Options: [
              { Id: 5, Option: '1', IsCorrect: false },
              { Id: 6, Option: '2', IsCorrect: false },
              { Id: 7, Option: '3', IsCorrect: false },
              { Id: 8, Option: '4', IsCorrect: true }
            ]
          },
          SubmittedAnswers: [8]
        }, {
          Id: 3,
          QaId: 3,
          QuizId: 1,
          AqAId: 3,
          QA: {
            Id: 3,
            Question: 'What is 3 + 3?',
            Options: [
              { Id: 9, Option: '1', IsCorrect: false },
              { Id: 10, Option: '12', IsCorrect: false },
              { Id: 11, Option: '3', IsCorrect: false },
              { Id: 12, Option: '6', IsCorrect: true }
            ]
          },
          SubmittedAnswers: [10]
        }
      ]
    }));

    fixture = TestBed.createComponent(QuizResultsComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(routerSpy).toHaveBeenCalledWith(["/"]);
  });

  it('should send percent correct to header state', () => {
    const headerStateSpy = jest.spyOn(mockHeaderStateService, 'setTitle');

    apiSpy.mockReturnValue(of({
      Id: 1,
      ActiveQAs: [
        {
          Id: 1,
          QaId: 1,
          QuizId: 1,
          AqAId: 1,
          QA: {
            Id: 1,
            Question: 'What is 1 + 1?',
            Options: [
              { Id: 1, Option: '1', IsCorrect: false },
              { Id: 2, Option: '2', IsCorrect: true },
              { Id: 3, Option: '3', IsCorrect: false },
              { Id: 4, Option: '4', IsCorrect: false }
            ]
          },
          SubmittedAnswers: [2]
        }, {
          Id: 2,
          QaId: 2,
          QuizId: 1,
          AqAId: 2,
          QA: {
            Id: 2,
            Question: 'What is 2 + 2?',
            Options: [
              { Id: 5, Option: '1', IsCorrect: false },
              { Id: 6, Option: '2', IsCorrect: false },
              { Id: 7, Option: '3', IsCorrect: false },
              { Id: 8, Option: '4', IsCorrect: true }
            ]
          },
          SubmittedAnswers: [8]
        }, {
          Id: 3,
          QaId: 3,
          QuizId: 1,
          AqAId: 3,
          QA: {
            Id: 3,
            Question: 'What is 3 + 3?',
            Options: [
              { Id: 9, Option: '1', IsCorrect: false },
              { Id: 10, Option: '12', IsCorrect: false },
              { Id: 11, Option: '3', IsCorrect: false },
              { Id: 12, Option: '6', IsCorrect: true }
            ]
          },
          SubmittedAnswers: [10]
        }
      ]
    }));

    fixture = TestBed.createComponent(QuizResultsComponent);
    fixture.detectChanges();

    expect(headerStateSpy).toHaveBeenCalledWith('67%');
  });

});