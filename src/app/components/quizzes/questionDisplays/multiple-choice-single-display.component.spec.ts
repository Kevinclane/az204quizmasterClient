import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoiceSingleDisplayComponent } from './multiple-choice-single-display.component';

describe('MultipleChoiceSingleDisplayComponent', () => {
  let component: MultipleChoiceSingleDisplayComponent;
  let fixture: ComponentFixture<MultipleChoiceSingleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceSingleDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceSingleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});