import { HeaderStateService } from "./headerstate.service";

describe('HeaderstateService', () => {
    it('should set and get', done => {
        const headerStateService = new HeaderStateService();
        const title = 'Test Title';

        headerStateService.getTitle().subscribe((value) => {
            expect(value).toEqual(title);
            done();
        });
        headerStateService.setTitle(title);
    });
});