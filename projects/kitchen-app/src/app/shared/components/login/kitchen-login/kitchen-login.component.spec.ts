import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenLoginComponent } from './kitchen-login.component';

describe('KitchenLoginComponent', () => {
  let component: KitchenLoginComponent;
  let fixture: ComponentFixture<KitchenLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenLoginComponent]
    });
    fixture = TestBed.createComponent(KitchenLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
