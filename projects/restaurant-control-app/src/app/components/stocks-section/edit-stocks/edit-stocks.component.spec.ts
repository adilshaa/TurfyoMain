import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStocksComponent } from './edit-stocks.component';

describe('EditStocksComponent', () => {
  let component: EditStocksComponent;
  let fixture: ComponentFixture<EditStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStocksComponent]
    });
    fixture = TestBed.createComponent(EditStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
