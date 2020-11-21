import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChildren,ChangeDetectorRef, QueryList} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareInfoService } from '../share-info.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements AfterViewInit, OnInit {
  @ViewChildren('card') card: QueryList<any>;
  cardEventSubscription:Subscription;
  orderEventSubscription:Subscription;
  storage=JSON.parse(localStorage.getItem("items"));
  showSpinner:boolean=true;
  totalCards=0

  goToChild:boolean=false;
  constructor(private service: ShareInfoService, private cdr: ChangeDetectorRef, private http:HttpClient) { 
    this.cardEventSubscription=service.getWatchlistCardEvent().subscribe(()=>this.ngOnInit());
    this.orderEventSubscription=service.getOrderWatchlistCardEvent().subscribe(()=>console.log("order"));

  }

  ngOnInit():void{
    console.log("hy");
    if(!this.isEmpty()){
      console.log("fetch")
      var total = JSON.parse(localStorage.getItem("items")) || [];
      var stockList=''
      for(var item in total){
        stockList+=total[item][0].symbol+',';
      }
      stockList=stockList.substring(0,stockList.length-1)
      this.http.get(`http://nodejshw8app.us-east-1.elasticbeanstalk.com/detail/topright/${stockList}`).toPromise().then( data => {

      for(var item in data){
        for(var i in total){
          if(total[i][0].symbol==data[item].ticker){
            total[i][0].price = data[item].last;
            total[item][0].change = (parseFloat(data[item].last)-parseFloat(data[item].prevClose)).toFixed(2);
            var last=parseFloat(data[item].last);
            var prev=parseFloat(data[item].prevClose);
            total[item][0].changePercent = ((last-prev)*100/prev).toFixed(2);
            console.log(data[item].last,data[item].prevClose);
          }
        }
      
      }

        localStorage.setItem("items",JSON.stringify(total));
        this.service.sendUpdateWatchlistCardEvent()
        this.goToChild=true
      });
    }
  }
  ngAfterViewInit():void{

  }



  isEmpty(){
    if(localStorage.getItem("items")){
      if(JSON.parse(localStorage.getItem("items")).length==0){
        return true;
      }
      return false;
    }
    return true;
  }

  getChildOutput(status:number){
    var total = JSON.parse(localStorage.getItem("items")) || [];
    this.totalCards+=status
    if(this.totalCards == total.length){
      this.showSpinner=false;
      this.cdr.detectChanges();
      this.service.sendSpinnerEvent(); 
      
    }
  }

  showCards(){
    console.log(this.showSpinner);
    if(this.showSpinner){
      return false
    }
    return true;
  }
  

}
