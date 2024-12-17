import { MultipleChoiceSingleDisplayComponent } from './multiple-choice-single-display.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';

describe('MultipleChoiceSingleDisplayComponent', () => {
  let fixture: ComponentFixture<MultipleChoiceSingleDisplayComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceSingleDisplayComponent);
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should load with no choice selected', () => {
    fixture.componentInstance.activeQuestion = {
      quizId: 1,
      qaId: 2,
      aqAid: 3,
      totalQuestionCount: 4,
      finishedQuestionCount: 2,
      question: 'test123',
      image: '',
      questionType: 1,
      category: 2,
      options: [
        {
          id: 1,
          leftDisplay: 'test',
          rightDisplay: ''
        },
        {
          id: 2,
          leftDisplay: 'test',
          rightDisplay: ''
        },
        {
          id: 3,
          leftDisplay: 'test',
          rightDisplay: ''
        }
      ],
      links: []
    };
    fixture.detectChanges();

    const selectedOption = fixture.componentInstance.selectedOption;
    expect(selectedOption.value).toBe(0);
  });

  it('should emit false when choice is selected', () => {
    fixture.componentInstance.activeQuestion = {
      quizId: 1,
      qaId: 2,
      aqAid: 3,
      totalQuestionCount: 4,
      finishedQuestionCount: 2,
      question: 'test123',
      image: '',
      questionType: 1,
      category: 2,
      options: [
        {
          id: 1,
          leftDisplay: 'test',
          rightDisplay: ''
        },
        {
          id: 2,
          leftDisplay: 'test',
          rightDisplay: ''
        },
        {
          id: 3,
          leftDisplay: 'test',
          rightDisplay: ''
        }
      ],
      links: []
    };
    fixture.detectChanges();

    const emitSpy = jest.spyOn(fixture.componentInstance.emitIsDisabled, 'emit');

    const optionElements = fixture.debugElement.queryAll(By.css('.option'));
    expect(optionElements.length).toBe(3);
    const radio = fixture.debugElement.query(By.css('input[id="2"]')).nativeElement;
    radio.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should display image if activeQuestion has image', () => {
    fixture.componentInstance.activeQuestion = {
      quizId: 1,
      qaId: 2,
      aqAid: 3,
      totalQuestionCount: 4,
      finishedQuestionCount: 2,
      question: 'test123',
      image: 'test.png',
      questionType: 1,
      category: 2,
      options: [
        {
          id: 1,
          leftDisplay: 'test',
          rightDisplay: ''
        },
        {
          id: 2,
          leftDisplay: 'test',
          rightDisplay: ''
        },
        {
          id: 3,
          leftDisplay: 'test',
          rightDisplay: ''
        }
      ],
      links: []
    };
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('img'));
    expect(image).toBeTruthy();
  });

  it.each([1, 2, 3, 4, 5, 6])('should display each option', (inputCount) => {
    let options = [];
    for (let i = 0; i < inputCount; i++) {
      options.push({
        id: i,
        leftDisplay: 'test',
        rightDisplay: ''
      });
    }

    fixture.componentInstance.activeQuestion = {
      quizId: 1,
      qaId: 2,
      aqAid: 3,
      totalQuestionCount: 4,
      finishedQuestionCount: 2,
      question: 'test123',
      image: '',
      questionType: 1,
      category: 2,
      options: options,
      links: []
    };
    fixture.detectChanges();

    const optionElements = fixture.debugElement.queryAll(By.css('.option'));
    expect(optionElements.length).toBe(inputCount);
  });
});