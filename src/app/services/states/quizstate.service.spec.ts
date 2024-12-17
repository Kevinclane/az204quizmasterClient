import { QuizStateService } from "./quizstate.service";

describe('QuizstateService', () => {
    let service: QuizStateService;
    beforeEach(() => {
        service = new QuizStateService();
    });

    it('should get and set quizId', () => {
        service.setQuizId(1);
        expect(service.getQuizId()).toBe(1);
    });

    it('should set values', () => {
        service.setValues({
            compute: true,
            storage: false,
            security: true,
            monitor: false,
            thirdParty: true
        });
        expect(service.getAsRequest()).toEqual({
            compute: true,
            storage: false,
            security: true,
            monitor: false,
            thirdParty: true
        });
    });

    it('should get form options', () => {
        expect(service.getFormOptions()).toEqual([
            {
                display: 'Develop Azure compute solutions',
                value: 'compute'
            },
            {
                display: 'Develop for Azure storage',
                value: 'storage'
            },
            {
                display: 'Implement Azure security',
                value: 'security'
            },
            {
                display: 'Monitor, troubleshoot, and optimize Azure solutions',
                value: 'monitor'
            },
            {
                display: 'Connect to and consume Azure services and third-party services',
                value: 'thirdParty'
            }
        ]);
    });
});