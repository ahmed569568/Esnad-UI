import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFormContentComponent } from './core-form-content.component';

describe('CoreFormContentComponent', () => {
	let component: CoreFormContentComponent;
	let fixture: ComponentFixture<CoreFormContentComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CoreFormContentComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CoreFormContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
