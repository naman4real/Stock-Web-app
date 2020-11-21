import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-danger-alert',
  templateUrl: './danger-alert.component.html',
  styleUrls: ['./danger-alert.component.css']
})
export class DangerAlertComponent implements OnInit {
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
