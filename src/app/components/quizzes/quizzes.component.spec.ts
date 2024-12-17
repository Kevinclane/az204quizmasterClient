import { QuizzesComponent } from './quizzes.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockService } from "ng-mocks";
import { ApiService } from '../../services/api.service';
import { HeaderStateService } from '../../services/states/headerstate.service';
import { Router } from '@angular/router';
import { QuizStateService } from '../../services/states/quizstate.service';
import { CookieService } from '../../services/cookie.service';
import { of } from 'rxjs';
import { MultipleChoiceSingleDisplayComponent } from './questionDisplays/multiple-choice-single-display.component';
import { MultipleChoiceMultipleDisplayComponent } from './questionDisplays/multiple-choice-multiple-display.component';

describe('QuizzesComponent', () => {
  let fixture: ComponentFixture<QuizzesComponent>;
  const mockApiService = MockService(ApiService);
  const mockRouter = MockService(Router);
  const mockHeaderStateService = MockService(HeaderStateService);
  const mockQuizStateService = MockService(QuizStateService);
  const mockCookieService = MockService(CookieService);
  const apiGetSpy = jest.spyOn(mockApiService, 'get');
  const apiPostSpy = jest.spyOn(mockApiService, 'post');
  const getCookieSpy = jest.spyOn(mockCookieService, 'getCookie');
  const setCookieSpy = jest.spyOn(mockCookieService, 'setCookie');
  const quizStateServiceSpy = jest.spyOn(mockQuizStateService, 'getAsRequest');

  const mockMultipleChoiceSingleDisplayComponent = MockService(MultipleChoiceSingleDisplayComponent);
  const mockMultipleChoiceMultipleDisplayComponent = MockService(MultipleChoiceMultipleDisplayComponent);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        QuizzesComponent,
        MultipleChoiceSingleDisplayComponent,
        MultipleChoiceMultipleDisplayComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideComponent(QuizzesComponent, {
      add: {
        providers: [
          { provide: ApiService, useValue: mockApiService },
          { provide: Router, useValue: mockRouter },
          { provide: HeaderStateService, useValue: mockHeaderStateService },
          { provide: QuizStateService, useValue: mockQuizStateService },
          { provide: CookieService, useValue: mockCookieService },
          { provide: MultipleChoiceSingleDisplayComponent, useValue: mockMultipleChoiceSingleDisplayComponent },
          { provide: MultipleChoiceMultipleDisplayComponent, useValue: mockMultipleChoiceMultipleDisplayComponent },
        ],
      }
    });

    apiGetSpy.mockClear();
    apiPostSpy.mockClear();
    getCookieSpy.mockClear();
    setCookieSpy.mockClear();
    quizStateServiceSpy.mockClear();

    fixture = TestBed.createComponent(QuizzesComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should create quiz and save quizId if quizId is not set', () => {
    const quizRequest = {
      compute: true,
      storage: true,
      security: true,
      monitor: false,
      thirdParty: true
    }

    getCookieSpy.mockReturnValue("");
    quizStateServiceSpy.mockReturnValue(quizRequest);
    apiPostSpy.mockReturnValue(of('1'));

    fixture.componentInstance.ngOnInit();

    expect(apiPostSpy).toHaveBeenCalledTimes(2);
    expect(setCookieSpy).toHaveBeenCalledWith('quizId', '1', 1);

  });

  it('should get next question if quizId is set', () => {
    getCookieSpy.mockReturnValue("1");

    const activeQuestion = {
      quizId: 1,
      qaId: 1,
      aqAid: 1,
      totalQuestionCount: 2,
      finishedQuestionCount: 0,
      question: 'test question',
      image: '',
      questionType: 0,
      category: 2,
      options: [
        {
          id: 1,
          leftDisplay: 'left1',
          rightDisplay: 'right1',
          isCorrect: true
        }, {
          id: 2,
          leftDisplay: 'left2',
          rightDisplay: 'right2',
          isCorrect: false
        }
      ],
      links: []
    }

    apiPostSpy.mockReturnValue(of(activeQuestion));

    fixture.componentInstance.ngOnInit();

    expect(apiPostSpy).toHaveBeenCalledTimes(1);
  });

  //should show spinner if loading

  it('should display multiple choice single display if questionType is 0', () => {
    getCookieSpy.mockReturnValue("1");

    const activeQuestion = {
      quizId: 1,
      qaId: 1,
      aqAid: 1,
      totalQuestionCount: 2,
      finishedQuestionCount: 0,
      question: 'test question',
      image: '',
      questionType: 0,
      category: 2,
      options: [
        {
          id: 1,
          leftDisplay: 'left1',
          rightDisplay: 'right1',
          isCorrect: true
        }, {
          id: 2,
          leftDisplay: 'left2',
          rightDisplay: 'right2',
          isCorrect: false
        }
      ],
      links: []
    }

    apiPostSpy.mockReturnValue(of(activeQuestion));

    fixture.componentInstance.multipleChoiceSingleDisplay = mockMultipleChoiceSingleDisplayComponent;
    mockMultipleChoiceSingleDisplayComponent.getAnswers = jest.fn().mockReturnValue([1]);

    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeQuestion).toEqual(activeQuestion);
    expect(fixture.componentInstance.multipleChoiceSingleDisplay).toBeTruthy();
    expect(fixture.componentInstance.multipleChoiceMultipleDisplay).toBeFalsy();
  });

  it('should display multiple choice multiple display if questionType is 1', () => {
    getCookieSpy.mockReturnValue("1");

    const activeQuestion = {
      quizId: 1,
      qaId: 1,
      aqAid: 1,
      totalQuestionCount: 2,
      finishedQuestionCount: 0,
      question: 'test question',
      image: '',
      questionType: 1,
      category: 2,
      options: [
        {
          id: 1,
          leftDisplay: 'left1',
          rightDisplay: 'right1',
          isCorrect: true
        }, {
          id: 2,
          leftDisplay: 'left2',
          rightDisplay: 'right2',
          isCorrect: false
        }
      ],
      links: []
    }

    apiPostSpy.mockReturnValue(of(activeQuestion));

    fixture.componentInstance.multipleChoiceMultipleDisplay = mockMultipleChoiceMultipleDisplayComponent;
    mockMultipleChoiceMultipleDisplayComponent.getAnswers = jest.fn().mockReturnValue([1, 2]);

    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeQuestion).toEqual(activeQuestion);
    expect(fixture.componentInstance.multipleChoiceSingleDisplay).toBeFalsy();
    expect(fixture.componentInstance.multipleChoiceMultipleDisplay).toBeTruthy();
  });

  describe('button', () => {
    it('should say next if not last question', () => {
      getCookieSpy.mockReturnValue("1");

      const activeQuestion = {
        quizId: 1,
        qaId: 1,
        aqAid: 1,
        totalQuestionCount: 2,
        finishedQuestionCount: 0,
        question: 'test question',
        image: '',
        questionType: 0,
        category: 2,
        options: [
          {
            id: 1,
            leftDisplay: 'left1',
            rightDisplay: 'right1',
            isCorrect: true
          }, {
            id: 2,
            leftDisplay: 'left2',
            rightDisplay: 'right2',
            isCorrect: false
          }
        ],
        links: []
      }

      apiPostSpy.mockReturnValue(of(activeQuestion));

      fixture.componentInstance.multipleChoiceSingleDisplay = mockMultipleChoiceSingleDisplayComponent;
      mockMultipleChoiceSingleDisplayComponent.getAnswers = jest.fn().mockReturnValue([1]);

      fixture.componentInstance.ngOnInit();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toContain('Next');
    });

    it('should say finish if last question', () => {
      getCookieSpy.mockReturnValue("1");

      const activeQuestion = {
        quizId: 1,
        qaId: 1,
        aqAid: 1,
        totalQuestionCount: 2,
        finishedQuestionCount: 1,
        question: 'test question',
        image: '',
        questionType: 0,
        category: 2,
        options: [
          {
            id: 1,
            leftDisplay: 'left1',
            rightDisplay: 'right1',
            isCorrect: true
          }, {
            id: 2,
            leftDisplay: 'left2',
            rightDisplay: 'right2',
            isCorrect: false
          }
        ],
        links: []
      }

      apiPostSpy.mockReturnValue(of(activeQuestion));

      fixture.componentInstance.multipleChoiceSingleDisplay = mockMultipleChoiceSingleDisplayComponent;
      mockMultipleChoiceSingleDisplayComponent.getAnswers = jest.fn().mockReturnValue([1]);

      fixture.componentInstance.ngOnInit();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toContain('Finish');
    });
  });

  it('should show spinner if loading', () => {
    getCookieSpy.mockReturnValue("1");

    const activeQuestion = {
      quizId: 1,
      qaId: 1,
      aqAid: 1,
      totalQuestionCount: 2,
      finishedQuestionCount: 0,
      question: 'test question',
      image: '',
      questionType: 0,
      category: 2,
      options: [
        {
          id: 1,
          leftDisplay: 'left1',
          rightDisplay: 'right1',
          isCorrect: true
        }, {
          id: 2,
          leftDisplay: 'left2',
          rightDisplay: 'right2',
          isCorrect: false
        }
      ],
      links: []
    }

    apiPostSpy.mockReturnValue(of(activeQuestion));

    fixture.componentInstance.multipleChoiceSingleDisplay = mockMultipleChoiceSingleDisplayComponent;
    mockMultipleChoiceSingleDisplayComponent.getAnswers = jest.fn().mockReturnValue([1]);

    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    fixture.componentInstance.loading = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner-container');
    expect(spinner).toBeTruthy();
  });

});