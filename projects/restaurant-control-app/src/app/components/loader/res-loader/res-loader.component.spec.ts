import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResLoaderComponent } from './res-loader.component';

describe('ResLoaderComponent', () => {
  let component: ResLoaderComponent;
  let fixture: ComponentFixture<ResLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResLoaderComponent]
    });
    fixture = TestBed.createComponent(ResLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
