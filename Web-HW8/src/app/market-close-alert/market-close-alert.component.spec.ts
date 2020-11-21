import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCloseAlertComponent } from './market-close-alert.component';

describe('MarketCloseAlertComponent', () => {
  let component: MarketCloseAlertComponent;
  let fixture: ComponentFixture<MarketCloseAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketCloseAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketCloseAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
