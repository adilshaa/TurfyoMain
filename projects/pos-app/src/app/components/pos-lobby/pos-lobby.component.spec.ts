import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosLobbyComponent } from './pos-lobby.component';

describe('PosLobbyComponent', () => {
  let component: PosLobbyComponent;
  let fixture: ComponentFixture<PosLobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosLobbyComponent]
    });
    fixture = TestBed.createComponent(PosLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
