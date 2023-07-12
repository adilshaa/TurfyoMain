import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResControlLoginComponent } from './res-control-login.component';

describe('ResControlLoginComponent', () => {
  let component: ResControlLoginComponent;
  let fixture: ComponentFixture<ResControlLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResControlLoginComponent]
    });
    fixture = TestBed.createComponent(ResControlLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
