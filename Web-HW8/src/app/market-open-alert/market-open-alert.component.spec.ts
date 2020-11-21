import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketOpenAlertComponent } from './market-open-alert.component';

describe('MarketOpenAlertComponent', () => {
  let component: MarketOpenAlertComponent;
  let fixture: ComponentFixture<MarketOpenAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketOpenAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketOpenAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
