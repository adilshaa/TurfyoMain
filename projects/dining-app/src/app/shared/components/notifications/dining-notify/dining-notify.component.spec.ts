import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningNotifyComponent } from './dining-notify.component';

describe('DiningNotifyComponent', () => {
  let component: DiningNotifyComponent;
  let fixture: ComponentFixture<DiningNotifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiningNotifyComponent]
    });
    fixture = TestBed.createComponent(DiningNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
