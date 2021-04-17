import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourpanelComponent } from './tourpanel.component';

describe('TourpanelComponent', () => {
  let component: TourpanelComponent;
  let fixture: ComponentFixture<TourpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
