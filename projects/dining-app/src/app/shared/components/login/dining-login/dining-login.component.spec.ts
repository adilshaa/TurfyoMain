import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningLoginComponent } from './dining-login.component';

describe('DiningLoginComponent', () => {
  let component: DiningLoginComponent;
  let fixture: ComponentFixture<DiningLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiningLoginComponent]
    });
    fixture = TestBed.createComponent(DiningLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
