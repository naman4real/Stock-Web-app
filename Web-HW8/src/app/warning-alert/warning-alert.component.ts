import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.css']
})
export class WarningAlertComponent implements OnInit {

  constructor(private router:Router) { }
  name;
  ngOnInit(): void {
    if(this.router.url.includes('portfolio')){
      this.name='portfolio'
    }
    else{
      this.name='watchlist'
    }
  }

}
