import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as Highcharts from "highcharts/highstock";
import { Options } from "highcharts/highstock";
import IndicatorsCore from "highcharts/indicators/indicators";
import vbp from 'highcharts/indicators/volume-by-price';
import { Subscription, timer } from 'rxjs';
import { ShareInfoService } from '../share-info.service';
IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {

  @ViewChild('alert') alertDiv: ElementRef;
  Highcharts: typeof Highcharts = Highcharts;
  date:String;
  chartOptions: Options;
  smallChartOptions: Options;
  cards=[];
  watchlistItems=[];
  closeResult = '';
  symbol='';
  name='';
  code='';
  lastPrice='';
  change='';
  changePercent='';
  time='';
  high='';
  low='';
  open='';
  prev='';
  vol='';
  mid='';
  askP='';
  askS='';
  bidP='';
  bidS='';
  startDate='';
  description='';
  color='';
  closeTime;

  actionSubscription:Subscription
  buyCardClose:Subscription;
  chnageBought:Subscription
  data1:boolean =false;
  data2:boolean=false;
  data3:boolean=false;
  data4:boolean=false;
  data5:boolean=false;

  bought:boolean=false;
  marketOpen:boolean;

  clicked=false;

  valid=0;

  modalData=[]



  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal, private service: ShareInfoService) { 
    this.actionSubscription=service.getActionEvent().subscribe(()=>this.checkBuy());
    this.buyCardClose=service.getBuyEvent().subscribe(()=>this.func());
  }
  checkBuy(){
    this.bought=true;
    setTimeout(this.func.bind(this),5000)
  }
  func(){
    this.bought=false;
  }

  ngOnInit(): void {
      this.http.get(`http://nodejshw8app.us-east-1.elasticbeanstalk.com/detail/topleft/${this.router.url.substring(9)}`).toPromise().then( data => {
        if(data['ticker']){
          this.symbol= data['ticker'];
          this.name=data['name'];
          this.code=data['exchangeCode'];
          this.startDate= 'Start Date: ' + data['startDate'];
          this.description=data['description'];

          this.data1=true;
          this.valid=1;
          var subs:Subscription;
          subs = timer(1,15*1000).subscribe(x=>
            this.http.get(`http://nodejshw8app.us-east-1.elasticbeanstalk.com/detail/topright/${this.router.url.substring(9)}`).toPromise().then( data => {

            this.lastPrice= parseFloat(data[0]['last']).toFixed(2);
            this.change=(parseFloat(data[0]['last'])-parseFloat(data[0]['prevClose'])).toFixed(2);
            this.changePercent=(parseFloat(this.change)/parseFloat(data[0]['prevClose'])*100).toFixed(2);
            if(parseFloat(this.change)<0){
              this.color="red";
            }
            else if(parseFloat(this.change)>0){
              this.color= "green";
            }
            else{
              this.color="black";
            }


            var currentDate, lastStockDate
            currentDate=new Date();
            lastStockDate=new Date(data[0]['timestamp']);
            var seconds = Math.abs((currentDate-lastStockDate)/1000)
            if(seconds <61){
              this.marketOpen=true
            }
            else{
              subs.unsubscribe();
              var closeDate= new Date(data[0]['timestamp']);
              this.closeTime=`${
                closeDate.getFullYear().toString().padStart(4, '0')}-${
                  (closeDate.getMonth()+1).toString().padStart(2, '0')}-${
                closeDate.getDate().toString().padStart(2, '0')} ${
                closeDate.getHours().toString().padStart(2, '0')}:${
                closeDate.getMinutes().toString().padStart(2, '0')}:${
                closeDate.getSeconds().toString().padStart(2, '0')}`
              this.marketOpen=false
            }
            
            var dt =new Date();
            this.time=`${
              dt.getFullYear().toString().padStart(4, '0')}-${
              (dt.getMonth()+1).toString().padStart(2, '0')}-${
              dt.getDate().toString().padStart(2, '0')} ${
              dt.getHours().toString().padStart(2, '0')}:${
              dt.getMinutes().toString().padStart(2, '0')}:${
              dt.getSeconds().toString().padStart(2, '0')}`

            this.high= 'High Price:'+ ' ' +  parseFloat(data[0]['high']).toFixed(2);
            this.low = 'Low Price:' + ' ' + parseFloat(data[0]['low']).toFixed(2);
            this.open = 'Open Price: ' + parseFloat(data[0]['open']).toFixed(2);
            this.prev = 'Prev. Close:' + parseFloat(data[0]['prevClose']).toFixed(2);
            this.vol = 'Volume: ' + data[0]['volume'];
            this.mid = 'Mid Price: ' + parseFloat(data[0]['mid']);
            this.askP = 'Ask Price: ' + parseFloat(data[0]['askPrice']);
            this.askS = 'Ask Size: ' + data[0]['askSize'];
            this.bidP = 'Bid Price: ' + parseFloat(data[0]['bidPrice']);
            this.bidS = 'Bid Size: ' + data[0]['bidSize'];
            
            this.modalData.push({
              symbol:this.symbol,
              price:parseFloat(this.lastPrice),
              name:this.name,
            })
            
            this.watchlistItems.push({
              symbol:this.symbol,
              name:this.name,
              price:this.lastPrice,
              change:this.change,
              changePercent:this.changePercent
            })
            var stockListItems=[];
            
            if(!localStorage.getItem("searched")){
              localStorage.setItem("searched",JSON.stringify([]))
            }
            var stockList = JSON.parse(localStorage.getItem("searched")) || [];
            var flag=0
            for(var item=0;item<stockList.length;item++){
              if(stockList[item][0]['symbol'] == this.symbol){
                flag=1
                stockList[item][0].price=this.lastPrice
                stockList[item][0].change=this.change
                stockList[item][0].changePercent=this.changePercent
                break;
              }
            }
            if(flag==0){
              stockListItems.push({
                symbol:this.symbol,
                name:this.name,
                price:this.lastPrice,
                change:this.change,
                changePercent:this.changePercent
              });
              stockList.push(this.watchlistItems);
              localStorage.setItem("searched",JSON.stringify(stockList));
            }
            //this.service.sendUpdatedPrice();
            console.log(" set last price", this.lastPrice);
            this.service.data=this.lastPrice;
            console.log("last price is",this.service.data)
            this.service.sendPriceChangeEvent();
            this.data2=true;


            // call for daily charts api

            this.http.get(`http://nodejshw8app.us-east-1.elasticbeanstalk.com/dailyChart/${this.router.url.substring(9)}`).toPromise().then( data => {
            var chartData=[];
            for(var item in data){
              var date=Date.UTC(data[item]['date'].slice(0,4),parseInt(data[item]['date'].slice(5,7))-1,
              data[item]['date'].slice(8,10), parseInt(data[item]['date'].slice(11,13)), 
              parseInt(data[item]['date'].slice(14,16)));  
              chartData.push([date,data[item]['close']]);
              var dt = new Date('2012-11-29 17:00:34 UTC');
              dt.toString();      
            }
          
            this.smallChartOptions = {
              time: {
                useUTC: false
              },
              title:{  
                text:this.router.url.substring(9).toUpperCase(),
                style:{
                  color: '#767981'
                }
              },
              colors:[this.color],

              rangeSelector:{
                enabled:false
              },
              series: [
                {
                  type: 'line',
                  data: chartData,
                  name:this.router.url.substring(9).toUpperCase()
                }
              ],

              
            };
            
            this.data3=true
          });

          })
          )

          this.http.get(`http://nodejshw8app.us-east-1.elasticbeanstalk.com/historicalChart/${this.router.url.substring(9)}`).toPromise().then( data => {

            var ohlc=[], volume=[];
            for(var item in data){ 
              var date=Date.UTC(data[item]['date'].slice(0,4),parseInt(data[item]['date'].slice(5,7))-1,data[item]['date'].slice(8,10));  
              ohlc.push([
                date,
                data[item]['open'],
                data[item]['high'],
                data[item]['low'],
                data[item]['close']
              ]);

              volume.push([
                date,
                data[item]['volume']
              ]);
            }

            this.chartOptions = {
                rangeSelector: {
                    selected: 2
                },

                title: {
                    text: this.symbol.toUpperCase()+' Historical'
                },

                subtitle: {
                    text: 'With SMA and Volume by Price technical indicators'
                },

                yAxis: [{
                    startOnTick: false,
                    endOnTick: false,
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'OHLC'
                    },
                    height: '60%',
                    lineWidth: 2,
                    resize: {
                        enabled: true
                    }
                }, {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'Volume'
                    },
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2
                }],

                tooltip: {
                    split: true
                },

                series: [{
                    type: 'candlestick',
                    name: this.symbol.toUpperCase(),
                    id: this.symbol,
                    zIndex: 2,
                    data: ohlc
                }, {
                    type: 'column',
                    name: 'Volume',
                    id: 'volume',
                    data: volume,
                    yAxis: 1
                }, {
                    type: 'vbp',
                    linkedTo: this.symbol,
                    params: {
                        volumeSeriesID: 'volume'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    zoneLines: {
                        enabled: false
                    }
                }, {
                    type: 'sma',
                    linkedTo: this.symbol,
                    zIndex: 1,
                    marker: {
                        enabled: false
                    }
                }],
            };
            this.data4=true;

          })
        

          this.http.get(`http://nodejshw8app.us-east-1.elasticbeanstalk.com/news/${this.router.url.substring(9)}`).toPromise().then( data =>{
            for(var item in data){
              var month=this.getMonth(data[item]['publishedAt'].slice(5,7))
              if(data[item]['urlToImage'] && data[item]['title']){
                  this.cards.push({
                  imageUrl:data[item]['urlToImage'],
                  title: data[item]['title'],
                  newsTitle : data[item]['title'],
                  newsSource : data[item]['source']['name'],
                  newsDescription : data[item]['description'],
                  newsUrl : data[item]['url'],
                  publishedAt :month+' '+data[item]['publishedAt'].slice(8,10)+','+' '+data[item]['publishedAt'].slice(0,4)
                });

              }
                  
            }
            this.data5=true;
          });
        }

        else{
          this.valid=2
        }
        

      }) 
  }

  getMonth(month:string){
    if(parseInt(month)==1)
      return "January"
    if(parseInt(month)==2)
      return "February"
    if(parseInt(month)==3)
      return "March"
    if(parseInt(month)==4)
      return "April"
    if(parseInt(month)==5)
      return "May"
    if(parseInt(month)==6)
      return "June"
    if(parseInt(month)==7)
      return "July"
    if(parseInt(month)==8)
      return "August"
     if(parseInt(month)==9)
      return "September"
    if(parseInt(month)==10)
      return "October"
    if(parseInt(month)==11)
      return "November"
    if(parseInt(month)==12)
      return "December"
  }

  hideLoader(){
    // console.log(this.data1 , this.data2 , this.data3 , this.data4 , this.data5 ,"search");
    if(this.valid==2){
      return true;
    }
    return (this.data1 && this.data2 && this.data3 && this.data4 && this.data5)
  }

  toggle(event:any){
    this.clicked=true
    var list=JSON.parse(localStorage.getItem("items")) || [];

    if(!this.watchListed()){
      list.push(this.watchlistItems);
      var stocks=[]
      for(var i in list){
        stocks.push(list[i][0].symbol)
      }
      stocks.sort();
      var newList=[]
      for(var stock in stocks){
        for(var it in list){
          if(list[it][0].symbol==stocks[stock]){
            newList.push(list[it]);
          }
        }
      }
      localStorage.setItem("items",JSON.stringify(newList))
      this.service.sendOrderWatchlistCardEvent();
      console.log("sent")
    }
    else{
      for(var item=0;item<list.length;item++){
        if(list[item][0]['symbol'] == this.symbol){
          list.splice(item,1);
          break;
        }
      }
      localStorage.setItem("items",JSON.stringify(list));
      
    }
  }
  watchListed(){
    var list=JSON.parse(localStorage.getItem("items")) || [];
    for(var item in list){
      if(list[item][0]['symbol'] == this.symbol){
        return true;
      }
    }
    return false;
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
  getColor(){
    // console.log(this.change)
    if(parseFloat(this.change)<0){
      return "red";
    }
    else if(parseFloat(this.change)>0){
      return "green";
    }
   else{
     return "black";
    }
  }

  
}

