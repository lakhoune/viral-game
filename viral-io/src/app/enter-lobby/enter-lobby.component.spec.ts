import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterLobbyComponent } from './enter-lobby.component';

describe('EnterLobbyComponent', () => {
  let component: EnterLobbyComponent;
  let fixture: ComponentFixture<EnterLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
