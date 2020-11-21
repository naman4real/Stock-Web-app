import { Component, OnInit, Input } from '@angular/core';
import { ShareInfoService } from '../share-info.service';

@Component({
  selector: 'app-buy-alert',
  templateUrl: './buy-alert.component.html',
  styleUrls: ['./buy-alert.component.css']
})
export class BuyAlertComponent implements OnInit {

  @Input() symbol: any;
  show=true;
  timer;
  close=false;
  constructor(private service:ShareInfoService) { }

  ngOnInit(): void {
    this.timer=setTimeout(this.hide.bind(this),5000)
  }

  hide(){
    if(!this.close){
      this.show= false;

    }
  }
  closeAlert(){
    console.log("close")
    this.close=true;
    this.service.sendBuyEvent();
  }

}
