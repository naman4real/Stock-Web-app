import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAlertComponent } from './buy-alert.component';

describe('BuyAlertComponent', () => {
  let component: BuyAlertComponent;
  let fixture: ComponentFixture<BuyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
