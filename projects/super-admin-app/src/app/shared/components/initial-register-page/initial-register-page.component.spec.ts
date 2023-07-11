import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialRegisterPageComponent } from './initial-register-page.component';

describe('InitialRegisterPageComponent', () => {
  let component: InitialRegisterPageComponent;
  let fixture: ComponentFixture<InitialRegisterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitialRegisterPageComponent]
    });
    fixture = TestBed.createComponent(InitialRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
