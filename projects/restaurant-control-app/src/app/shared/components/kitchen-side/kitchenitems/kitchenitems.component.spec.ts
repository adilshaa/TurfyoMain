import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenitemsComponent } from './kitchenitems.component';

describe('KitchenitemsComponent', () => {
  let component: KitchenitemsComponent;
  let fixture: ComponentFixture<KitchenitemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenitemsComponent]
    });
    fixture = TestBed.createComponent(KitchenitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
