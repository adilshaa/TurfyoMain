import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningDeskComponent } from './dining-desk.component';

describe('DiningDeskComponent', () => {
  let component: DiningDeskComponent;
  let fixture: ComponentFixture<DiningDeskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiningDeskComponent]
    });
    fixture = TestBed.createComponent(DiningDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
