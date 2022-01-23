import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RcTcComponent} from './rc-tc.component';

describe('RcTcComponent', () => {
    let component: RcTcComponent;
    let fixture: ComponentFixture<RcTcComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RcTcComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RcTcComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });
});
