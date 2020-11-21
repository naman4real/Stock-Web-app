import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareInfoService } from '../share-info.service';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html',
  styleUrls: ['./watchlist-card.component.css']
})
export class WatchlistCardComponent implements OnInit {
  spinnerEventSubscription:Subscription;
  cardEventSubscription:Subscription;
  close=false
  price;
  change;
  changePercent;
  show:boolean=false;
  @Input() watchlistCard:any;
  @Output() done = new EventEmitter<number>();
  constructor( private router:Router,private service:ShareInfoService, private cdr: ChangeDetectorRef,private http: HttpClient) {
    this.spinnerEventSubscription=service.getSpinnerEvent().subscribe(()=>this.updateStatus());
    this.cardEventSubscription=service.getUpdateWatchlistCardEvent().subscribe(()=>this.ngOnInit());
   }


  ngOnInit(): void {
    var total = JSON.parse(localStorage.getItem("items")) || [];
    for(var item in total){
      if(total[item][0].symbol == this.watchlistCard[0].symbol){
        this.price= total[item][0].price;
        this.change=total[item][0].change;
        this.changePercent=total[item][0].changePercent;
        break;
      }
    }

    this.done.emit(1);
  }

  closeCard(){
    this.close=true;
    var list=JSON.parse(localStorage.getItem("items")) || [];
    for(var item=0;item<list.length;item++){
      if(list[item][0]['symbol'] == this.watchlistCard[0].symbol){
        list.splice(item,1);
        break;
      }
    }
    localStorage.setItem("items",JSON.stringify(list));
    this.service.sendWatchlistCardEvent();
  }

  showDetails(){
    this.router.navigate(['/details',this.watchlistCard[0].symbol]);
  }

  updateStatus(){
    this.show=true;
    this.cdr.detectChanges();
  }

  showCard(){
    return this.show;
  }

  getColor(){
    // console.log(this.change)
    if(parseFloat(this.change)<0){
      return "red";
    }
    else if(parseFloat(this.change)>0){
      return "#659a33";
    }
   else{
     return "black";
    }
  }
  getClass(){
    if(parseFloat(this.change)<0){
      return "fas fa-caret-down fa-lg";
    }
    else if(parseFloat(this.change)>0){
      return "fas fa-caret-up fa-lg";
    }
    return "";
  }
}
