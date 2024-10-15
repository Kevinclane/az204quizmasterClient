import { HeaderComponent } from "./header.component";
import { Router } from "@angular/router";
import { HeaderStateService } from "../services/states/headerstate.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockService } from "ng-mocks";
import { MatDialog } from "@angular/material/dialog";
import { of, Subject } from "rxjs";
import { By } from "@angular/platform-browser";

describe('HeaderComponent', () => {
    const mockRouter = MockService(Router);
    const mockHeaderStateService = MockService(HeaderStateService);
    const mockMatDialog = MockService(MatDialog);

    const routerSpy = jest.spyOn(mockRouter, 'navigate');
    const getTitleSpy = jest.spyOn(mockHeaderStateService, 'getTitle');
    const matDialogSpy = jest.spyOn(mockMatDialog, 'open');

    let titleSubject: Subject<string> = new Subject<string>();
    getTitleSpy.mockReturnValue(titleSubject);

    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(() => {
        TestBed.overrideComponent(HeaderComponent, {
            add: {
                providers: [
                    { provide: Router, useValue: mockRouter },
                    { provide: HeaderStateService, useValue: mockHeaderStateService },
                    { provide: MatDialog, useValue: mockMatDialog }
                ]
            },
            remove: { providers: [Router, HeaderStateService, MatDialog] }
        });
        fixture = TestBed.createComponent(HeaderComponent);
        fixture.autoDetectChanges();

        titleSubject.next('');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should display the title from HeaderStateService', () => {
        titleSubject.next('Test Title');
        fixture.detectChanges();
        const title = fixture.debugElement.query(By.css('.title'));
        expect(title.nativeElement.textContent).toBe('Test Title');
    });

    it('should open the upload modal when the upload icon is clicked', () => {
        const uploadIcon = fixture.debugElement.query(By.css('#upload-file'));
        uploadIcon.triggerEventHandler('click', null);
        expect(matDialogSpy).toHaveBeenCalled();
    });

    it('should navigate to the home page when the home icon is clicked', () => {
        const homeIcon = fixture.debugElement.query(By.css('#home'));
        homeIcon.triggerEventHandler('click', null);
        expect(routerSpy).toHaveBeenCalledWith(['/']);
    });

});