import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateButtonComponent } from './authenticate-button.component';

describe('AuthenticateButtonComponent', () => {
  let component: AuthenticateButtonComponent;
  let fixture: ComponentFixture<AuthenticateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
