import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent implements OnInit {
  @Input() symbol: any;
  show=true;
  timer;
  close=false;
  constructor() { }

  ngOnInit(): void {
    this.timer=setTimeout(this.hide.bind(this),5000)
  }

  hide(){
    this.show= false;
  }
  closeAlert(){
    this.close=true;
  }

}
