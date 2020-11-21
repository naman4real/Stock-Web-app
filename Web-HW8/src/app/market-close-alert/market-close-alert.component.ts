import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-market-close-alert',
  templateUrl: './market-close-alert.component.html',
  styleUrls: ['./market-close-alert.component.css']
})
export class MarketCloseAlertComponent implements OnInit {
 @Input() closeTime:any;
  constructor() { }

  ngOnInit(): void {
  }

}
