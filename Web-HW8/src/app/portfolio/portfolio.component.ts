import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { couldStartTrivia } from 'typescript';
import { ShareInfoService } from '../share-info.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  cardEventSubscription:Subscription;
  sellEventSubscription:Subscription;
  showSpinner:boolean=true;
  goToChild:boolean=false;
  constructor(private service: ShareInfoService, private cdr: ChangeDetectorRef, private http: HttpClient) { 
    this.cardEventSubscription=service.getPortfolioCardEvent().subscribe(()=>this.ngOnInit());
    this.sellEventSubscription=service.getSellEvent().subscribe(()=>this.ngOnInit());

  }
  storage = JSON.parse(localStorage.getItem("bought"));
  totalCards=0
  ngOnInit(): void {
    if(!this.isEmpty()){
      var total = JSON.parse(localStorage.getItem("bought")) || [];
      var newTotal=[]
      var stockList=''
      var stocks=[]
      for(var item in total){
        //if(total[item][0].quantity>0){
          stockList+=total[item][0].symbol+','
          stocks.push(total[item][0].symbol);
        //}
      }
      stocks.sort();    
      stockList=stockList.substring(0,stockList.length-1)
      console.log(stockList);
      this.http.get(`http://nodejshw8app.us-east-1.elasticbeanstalk.com/detail/topright/${stockList}`).toPromise().then( data => {
        for(var stock in stocks){
          for(var item in data){
            if(data[item].ticker == stocks[stock]){
              for(var i in total){
                if(total[i][0].symbol==stocks[stock]){
                  console.log(data[item].last, stocks[stock], total[i][0].symbol)
                  total[i][0].price = data[item].last
                  newTotal.push(total[i]);
                }
              }
            }
          }
        }
        localStorage.setItem("bought",JSON.stringify(newTotal));
        this.service.sendUpdatePortfolioCardEvent();
        this.goToChild=true
        
      });
    }

  }
  isEmpty(){
    if(JSON.parse(localStorage.getItem("bought"))){
      var list=JSON.parse(localStorage.getItem("bought")) || [];
      for(var item in list){
        if(list[item][0].quantity!=0){
          return false;
        }
      }
      return true
    }
    return true;
  }

  getChildOutput(status:number){
    var total = JSON.parse(localStorage.getItem("bought")) || [];
    this.totalCards+=status
    if(this.totalCards == total.length){
      this.showSpinner=false;
      this.cdr.detectChanges();
      this.service.sendSpinnerEvent(); 
      var total = JSON.parse(localStorage.getItem("bought")) || [];
      var newTotal=[]  //remove stock with quantity 0
      for(var item in total){
        if(total[item][0].quantity!=0){
          newTotal.push(total[item])
        }
      }
      localStorage.setItem("bought", JSON.stringify(newTotal));

      
    }
  }

  showCards(){
    if(this.showSpinner){
      return false
    }
    return true;
  }
}
