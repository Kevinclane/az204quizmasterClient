
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { QuizResultsExpandedComponent } from "./quiz-results-expanded.compontent";
import { By } from "@angular/platform-browser";

describe('QuizResultsExpandedComponent', () => {
    let fixture: ComponentFixture<QuizResultsExpandedComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(QuizResultsExpandedComponent);
        fixture.autoDetectChanges();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should toggle expanded', () => {
        fixture.debugElement.query(By.css('.button-toggle')).nativeElement.click();
        expect(fixture.componentInstance.expanded).toBe(true);
        fixture.debugElement.query(By.css('.button-toggle')).nativeElement.click();
        expect(fixture.componentInstance.expanded).toBe(false);
    });

    it('should display collapsed options by default', () => {
        fixture.componentInstance.activeQA = {
            id: 1,
            qaId: 1,
            quizId: 1,
            qa: {
                quizId: 1,
                qaId: 1,
                aqAid: 1,
                totalQuestionCount: 4,
                finishedQuestionCount: 4,
                question: "What is the capital of yo mama's house",
                image: "",
                questionType: 1,
                category: 1,
                options: [
                    {
                        id: 1,
                        leftDisplay: "Kitchen",
                        rightDisplay: "",
                        isCorrect: false
                    },
                    {
                        id: 2,
                        leftDisplay: "Living Room",
                        rightDisplay: "",
                        isCorrect: false
                    },
                    {
                        id: 3,
                        leftDisplay: "Bathroom",
                        rightDisplay: "",
                        isCorrect: true
                    },
                    {
                        id: 4,
                        leftDisplay: "Bedroom",
                        rightDisplay: "",
                        isCorrect: false
                    }
                ],
                links: []
            },
            submittedAnswers: [
                2
            ]
        }
        fixture.componentInstance.setCollapsedOptions();

        fixture.detectChanges();

        expect(fixture.componentInstance.expanded).toBe(false);
        expect(fixture.nativeElement.querySelector('.option-container').children.length).toBe(1);
    });

    it('should display all options when expanded', () => {
        fixture.componentInstance.activeQA = {
            id: 1,
            qaId: 1,
            quizId: 1,
            qa: {
                quizId: 1,
                qaId: 1,
                aqAid: 1,
                totalQuestionCount: 4,
                finishedQuestionCount: 4,
                question: "What is the capital of yo mama's house",
                image: "",
                questionType: 1,
                category: 1,
                options: [
                    {
                        id: 1,
                        leftDisplay: "Kitchen",
                        rightDisplay: "",
                        isCorrect: false
                    },
                    {
                        id: 2,
                        leftDisplay: "Living Room",
                        rightDisplay: "",
                        isCorrect: false
                    },
                    {
                        id: 3,
                        leftDisplay: "Bathroom",
                        rightDisplay: "",
                        isCorrect: true
                    },
                    {
                        id: 4,
                        leftDisplay: "Bedroom",
                        rightDisplay: "",
                        isCorrect: false
                    }
                ],
                links: []
            },
            submittedAnswers: [
                2
            ]
        }
        fixture.componentInstance.setCollapsedOptions();
        fixture.debugElement.query(By.css('.button-toggle')).nativeElement.click();

        fixture.detectChanges();

        expect(fixture.componentInstance.expanded).toBe(true);
        expect(fixture.nativeElement.querySelector('.option-container').children.length).toBe(4);
    });

});