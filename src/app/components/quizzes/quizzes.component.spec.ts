import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { QuizzesComponent } from './quizzes.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { QuizStateService } from '../../services/states/quizstate.service';
import { ApiService } from '../../services/api.service';
import { CookieService } from '../../services/cookie.service';
import { HeaderStateService } from '../../services/states/headerstate.service';
import { QuizQuestionResponse } from '../../models/quiz-question-response.model';

describe('QuizzesComponent', () => {
  let component: QuizzesComponent;
  let fixture: ComponentFixture<QuizzesComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockQuizStateService = jasmine.createSpyObj('QuizStateService', ['getAsRequest']);
  let mockApiService = jasmine.createSpyObj('ApiService', ['post']);
  let mockCookieService = jasmine.createSpyObj('CookieService', ['getCookie', 'setCookie']);
  let mockHeaderStateService = jasmine.createSpyObj('HeaderStateService', ['setTitle']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: QuizStateService, useValue: mockQuizStateService },
        { provide: ApiService, useValue: mockApiService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: HeaderStateService, useValue: mockHeaderStateService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display multiple-choice-single-display if activeQuestion.questionType is 0', () => {
    let activeQuestion: QuizQuestionResponse = {
      quizId: 1,
      qaId: 2,
      aqAid: 3,
      totalQuestionCount: 4,
      finishedQuestionCount: 2,
      question: 'Lorem Question',
      image: '',
      questionType: 0,
      category: 0,
      options: [
        {
          id: 1,
          leftDisplay: 'left',
          rightDisplay: '',
          isCorrect: false
        },
        {
          id: 2,
          leftDisplay: 'lllllleft',
          rightDisplay: '',
          isCorrect: true
        }
      ],
      links: []
    };
    mockCookieService.getCookie.and.returnValue(123);
    mockApiService.post.and.returnValue(of(activeQuestion));
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-multiple-choice-single-display')).toBeTruthy();
  });

  describe('primary button', () => {
    it('should display "Next" if activeQuestion.finishedQuestionCount is less than activeQuestion.totalQuestionCount', () => {
      let activeQuestion: QuizQuestionResponse = {
        quizId: 1,
        qaId: 2,
        aqAid: 3,
        totalQuestionCount: 4,
        finishedQuestionCount: 2,
        question: 'Lorem Question',
        image: '',
        questionType: 0,
        category: 0,
        options: [
          {
            id: 1,
            leftDisplay: 'left',
            rightDisplay: '',
            isCorrect: false
          },
          {
            id: 2,
            leftDisplay: "We've had one yes, but what about second left?",
            rightDisplay: '',
            isCorrect: true
          }
        ],
        links: []
      };
      mockCookieService.getCookie.and.returnValue(123);
      mockApiService.post.and.returnValue(of(activeQuestion));
      component.ngOnInit();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').innerText).toBe('Next');
    });

    it('should call submitAndGetNextQuestion on click if activeQuestion.finishedQuestionCount is less than activeQuestion.totalQuestionCount', () => {
      let activeQuestion: QuizQuestionResponse = {
        quizId: 1,
        qaId: 2,
        aqAid: 3,
        totalQuestionCount: 4,
        finishedQuestionCount: 2,
        question: 'Lorem Question',
        image: '',
        questionType: 0,
        category: 0,
        options: [
          {
            id: 1,
            leftDisplay: 'left',
            rightDisplay: '',
            isCorrect: false
          },
          {
            id: 2,
            leftDisplay: "We've had one yes, but what about second left?",
            rightDisplay: '',
            isCorrect: true
          }
        ],
        links: []
      };
      mockCookieService.getCookie.and.returnValue(123);
      mockApiService.post.and.returnValue(of(activeQuestion));
      component.ngOnInit();
      component.setIsDisabled(false);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.button-primary')).nativeElement;
      button.click();
      expect(mockApiService.post).toHaveBeenCalledTimes(2);
    });
  });

  // it('should navigate to results on finish', () => {
  //   mockApiService.post.and.returnValue(of(null));
  //   component.ngOnInit();
  //   component.finish();
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/results', component.quizId]);
  // });

  // it('should disable button when setIsDisabled is called with true', () => {
  //   component.setIsDisabled(true);
  //   expect(component.isDisabled).toBe(true);
  // });

  // it('should enable button when setIsDisabled is called with false', () => {
  //   component.setIsDisabled(false);
  //   expect(component.isDisabled).toBe(false);
  // });
});

