import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoiceMultipleDisplayComponent } from './multiple-choice-multiple-display.component';

describe('MultipleChoiceMultipleDisplayComponent', () => {
  let component: MultipleChoiceMultipleDisplayComponent;
  let fixture: ComponentFixture<MultipleChoiceMultipleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceMultipleDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceMultipleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});