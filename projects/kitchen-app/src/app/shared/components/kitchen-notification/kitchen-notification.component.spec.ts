import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenNotificationComponent } from './kitchen-notification.component';

describe('KitchenNotificationComponent', () => {
  let component: KitchenNotificationComponent;
  let fixture: ComponentFixture<KitchenNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenNotificationComponent]
    });
    fixture = TestBed.createComponent(KitchenNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
