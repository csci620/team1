import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WanderlustComponent } from './wanderlust.component';

describe('WanderlustComponent', () => {
  let component: WanderlustComponent;
  let fixture: ComponentFixture<WanderlustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WanderlustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WanderlustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
