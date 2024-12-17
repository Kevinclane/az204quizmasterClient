import { MultipleChoiceMultipleDisplayComponent } from './multiple-choice-multiple-display.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormArray, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('MultipleChoiceMultipleDisplayComponent', () => {
  let fixture: ComponentFixture<MultipleChoiceMultipleDisplayComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceMultipleDisplayComponent);
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should load with no choices selected', () => {
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

    const formArray = fixture.componentInstance.formGroup.get('choices') as FormArray;
    expect(formArray.length).toBe(0);
  });

  it('should emit true when formArray is empty', () => {
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
          id: 1, leftDisplay: 'test',
          rightDisplay: ''
        },
        {
          id: 2, leftDisplay: 'test',
          rightDisplay: ''
        },
        {
          id: 3, leftDisplay: 'test',
          rightDisplay: ''
        }
      ],
      links: []
    };
    fixture.detectChanges();

    const emitSpy = jest.spyOn(fixture.componentInstance.emitIsDisabled, 'emit');

    const formArray = fixture.componentInstance.formGroup.get('choices') as FormArray;
    formArray.push(new FormControl(1));

    fixture.componentInstance.onCheckChange({ target: { checked: false, value: 1 } });
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should emit false when formArray is not empty', () => {
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

    const checkbox = fixture.debugElement.query(By.css('input[id="2"]')).nativeElement;
    checkbox.click();

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