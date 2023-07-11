import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstaffsComponent } from './addstaffs.component';

describe('AddstaffsComponent', () => {
  let component: AddstaffsComponent;
  let fixture: ComponentFixture<AddstaffsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddstaffsComponent]
    });
    fixture = TestBed.createComponent(AddstaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
