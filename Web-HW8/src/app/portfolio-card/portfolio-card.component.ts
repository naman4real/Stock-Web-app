import { Component, OnInit,Input,EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { ShareInfoService } from '../share-info.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css']
})
export class PortfolioCardComponent implements OnInit {
  cardEventSubscription:Subscription;
  spinnerEventSubscription:Subscription;
  updateCard:Subscription
  @Input() portfolioCard:any;
  @Output() done = new EventEmitter<number>();
  quantity:number;
  change:number;
  avgCostPerShare:number;
  price:number;
  totalCost:number;
  marketValue:number;
  currentPrice:number;
  delete=false;
  show:boolean=false;
  constructor(private service:ShareInfoService, private cdr: ChangeDetectorRef, private http: HttpClient) {
    this.cardEventSubscription=service.getUpdatePortfolioCardEvent().subscribe(()=>this.ngOnInit());
    this.spinnerEventSubscription=service.getSpinnerEvent().subscribe(()=>this.updateStatus());
   }

  ngOnInit(): void {
      var item=JSON.parse(localStorage.getItem("bought")) || [];
      for(var i in item){
        if(item[i][0].symbol == this.portfolioCard[0].symbol){
          this.quantity=item[i][0].quantity;
          this.totalCost=parseFloat(item[i][0].totalCost.toFixed(3));
          this.avgCostPerShare=parseFloat(item[i][0].avgCostPerShare.toFixed(3));
          this.price=item[i][0].price
          this.change=parseFloat((this.avgCostPerShare-this.price).toFixed(3));         
          this.marketValue=parseFloat((this.price*this.quantity).toFixed(3));
          this.done.emit(1);
          break;
        }
      }
  }
  
  getClass(){
    if(this.change<0){
      return "fas fa-caret-down fa-lg";
    }
    else if(this.change>0){
      return "fas fa-caret-up fa-lg";
    }
    return "";
  }

  deleteCard(id:number){
    
    var list=JSON.parse(localStorage.getItem("bought")) || [];
    list.splice(id,1);
    for(var i=id;i<list.length;i++){
      
      list[i][0].id--;
    }
    localStorage.setItem("bought",JSON.stringify(list));
    this.delete=true;

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
    if(this.change<0){
      return "red";
    }
    else if(this.change>0){
      return "#659a33";
    }
   else{
     return "black";
    }
  }


}


