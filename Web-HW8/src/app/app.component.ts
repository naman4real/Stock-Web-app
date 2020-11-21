
import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router  } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Web-HW8';
  ticker: String;
  constructor(public router: Router){
  }

  ngOnInit():void{
  }

  search(event:any){
    this.router.navigate(['/']);
  }
  watchlist(event:any){
    this.router.navigate(['/watchlist']);
  }
  portfolio(event:any){
    this.router.navigate(['/portfolio']);
  }

  isDetailsRoute(){
    if(this.router.url.includes('details')){
      return true;
    return false;
    }
  }

  searchClass(){
    if(this.router.url=="/")
      return "custom-button-focus w-100 text-right";
    return "custom-button text-right w-100";
  }
  watchlistClass(){
    if(this.router.url=="/watchlist")
      return "custom-button-focus w-100 text-right";
    return "custom-button text-right w-100";

  }
  portfolioClass(){
    if(this.router.url=="/portfolio")
      return "custom-button-focus w-100 text-right";
    return "custom-button text-right w-100";
  }

  func(){
    console.log("hello func")
    return "#navbarSupportedContent"
  }
}