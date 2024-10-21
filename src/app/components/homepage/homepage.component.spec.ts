import { HomepageComponent } from './homepage.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockService } from "ng-mocks";
import { QuizStateService } from '../../services/states/quizstate.service';
import { FormArray, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HomepageComponent', () => {
  let fixture: ComponentFixture<HomepageComponent>;
  // const mockQuizStateService = MockService(QuizStateService);

  beforeEach(() => {
    // TestBed.overrideComponent(HomepageComponent, {
    //   add: {
    //     providers: [
    //       { provide: QuizStateService, useValue: mockQuizStateService }
    //     ]
    //   },
    //   remove: { providers: [QuizStateService] }
    // });

    fixture = TestBed.createComponent(HomepageComponent);
    fixture.autoDetectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  describe('customize quiz form', () => {
    it('should have 5 checkboxes', () => {
      const checkboxes = fixture.debugElement.nativeElement.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBe(5);
    });

    it('should start with all checkboxes checked', () => {
      const checkboxes = fixture.debugElement.nativeElement.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox: { checked: any; }) => {
        expect(checkbox.checked).toBe(true);
      });
    });

    it('should add/remove selected options to QuizStateService appropriately', () => {
      const selectedOptions = fixture.componentInstance.formGroup.get('choices') as FormArray;
      expect(selectedOptions.length).toBe(5);

      const computeCheckbox = fixture.debugElement.query(By.css('#compute')).nativeElement;
      const storageCheckbox = fixture.debugElement.query(By.css('#storage')).nativeElement;
      const securityCheckbox = fixture.debugElement.query(By.css('#security')).nativeElement;
      const monitorCheckbox = fixture.debugElement.query(By.css('#monitor')).nativeElement;
      const thirdPartyCheckbox = fixture.debugElement.query(By.css('#thirdParty')).nativeElement;

      computeCheckbox.click();
      expect(selectedOptions.length).toBe(4);

      storageCheckbox.click();
      expect(selectedOptions.length).toBe(3);

      securityCheckbox.click();
      expect(selectedOptions.length).toBe(2);

      monitorCheckbox.click();
      expect(selectedOptions.length).toBe(1);

      thirdPartyCheckbox.click();
      expect(selectedOptions.length).toBe(0);

      computeCheckbox.click();
      expect(selectedOptions.at(0).value).toBe('compute');

      storageCheckbox.click();
      expect(selectedOptions.at(1).value).toBe('storage');

      securityCheckbox.click();
      expect(selectedOptions.at(2).value).toBe('security');

      monitorCheckbox.click();
      expect(selectedOptions.at(3).value).toBe('monitor');

      thirdPartyCheckbox.click();
      expect(selectedOptions.at(4).value).toBe('thirdParty');

    });

    it('should disable start button when no option is selected', () => {
      const computeCheckbox = fixture.debugElement.query(By.css('#compute')).nativeElement;
      const storageCheckbox = fixture.debugElement.query(By.css('#storage')).nativeElement;
      const securityCheckbox = fixture.debugElement.query(By.css('#security')).nativeElement;
      const monitorCheckbox = fixture.debugElement.query(By.css('#monitor')).nativeElement;
      const thirdPartyCheckbox = fixture.debugElement.query(By.css('#thirdParty')).nativeElement;

      computeCheckbox.click();
      storageCheckbox.click();
      securityCheckbox.click();
      monitorCheckbox.click();
      thirdPartyCheckbox.click();

      const selectedOptions = fixture.componentInstance.formGroup.get('choices') as FormArray;
      expect(selectedOptions.length).toBe(0);

      const startButton = fixture.debugElement.query(By.css('button'));
      expect(startButton.nativeElement.disabled).toBe(true);
    });

    it('should enable start button when at least one option is selected', () => {
      const computeCheckbox = fixture.debugElement.query(By.css('#compute')).nativeElement;
      const storageCheckbox = fixture.debugElement.query(By.css('#storage')).nativeElement;
      const securityCheckbox = fixture.debugElement.query(By.css('#security')).nativeElement;
      const monitorCheckbox = fixture.debugElement.query(By.css('#monitor')).nativeElement;
      const thirdPartyCheckbox = fixture.debugElement.query(By.css('#thirdParty')).nativeElement;

      computeCheckbox.click();
      storageCheckbox.click();
      securityCheckbox.click();
      monitorCheckbox.click();
      thirdPartyCheckbox.click();

      const selectedOptions = fixture.componentInstance.formGroup.get('choices') as FormArray;
      expect(selectedOptions.length).toBe(0);

      computeCheckbox.click();

      const startButton = fixture.debugElement.query(By.css('button'));
      expect(startButton.nativeElement.disabled).toBe(false);
    });

  });

});