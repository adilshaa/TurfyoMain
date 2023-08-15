import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenNotifyComponent } from './kitchen-notify.component';

describe('KitchenNotifyComponent', () => {
  let component: KitchenNotifyComponent;
  let fixture: ComponentFixture<KitchenNotifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenNotifyComponent]
    });
    fixture = TestBed.createComponent(KitchenNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
