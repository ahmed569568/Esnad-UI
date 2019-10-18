import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreListComponent } from './core-list.component';

describe('CoreListComponent', () => {
  let component: CoreListComponent;
  let fixture: ComponentFixture<CoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoreListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
