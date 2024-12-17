import { UploadModalComponent } from './upload-modal.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockService } from "ng-mocks";
import { ApiService } from '../../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

describe('UploadModalComponent', () => {
  let fixture: ComponentFixture<UploadModalComponent>;
  const mockApiService = MockService(ApiService);
  const mockMatDialogRef = MockService(MatDialogRef);

  beforeEach(() => {
    TestBed.overrideComponent(UploadModalComponent, {
      add: {
        providers: [
          { provide: ApiService, useValue: mockApiService },
          { provide: MatDialogRef, useValue: mockMatDialogRef }
        ]
      },
      remove: { providers: [ApiService, MatDialogRef] }
    });

    fixture = TestBed.createComponent(UploadModalComponent);
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should send apiBody to api', () => {
    const postSpy = jest.spyOn(mockApiService, 'post');

    fixture.componentInstance.apiBody = 'test';
    fixture.detectChanges();

    const uploadButton = fixture.debugElement.nativeElement.querySelector('button');
    uploadButton.click();

    fixture.detectChanges();

    expect(postSpy).toHaveBeenCalledWith('/JsonIntake', 'test');
  });

});