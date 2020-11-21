import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidTickerAlertComponent } from './invalid-ticker-alert.component';

describe('InvalidTickerAlertComponent', () => {
  let component: InvalidTickerAlertComponent;
  let fixture: ComponentFixture<InvalidTickerAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidTickerAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidTickerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
