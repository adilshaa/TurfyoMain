import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodViewComponent } from './food-view.component';

describe('FoodViewComponent', () => {
  let component: FoodViewComponent;
  let fixture: ComponentFixture<FoodViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodViewComponent]
    });
    fixture = TestBed.createComponent(FoodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
