import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareInfoService {

  private subject = new Subject<any>();
  private subject1 = new Subject<any>();
  private subject2 = new Subject<any>();
  private subject3 = new Subject<any>();
  private subject4 = new Subject<any>();
  private subject5 = new Subject<any>();
  private subject6 = new Subject<any>();
  private subject7 = new Subject<any>();
  private subject8 = new Subject<any>();
  private subject9 = new Subject<any>();

  data;
  sendPortfolioCardEvent(){
    this.subject.next();
  }
  getPortfolioCardEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }


  sendWatchlistCardEvent(){
    this.subject1.next();
  }
  getWatchlistCardEvent(): Observable<any>{ 
    return this.subject1.asObservable();
  }


  sendSpinnerEvent(){
    this.subject2.next();
  }

  getSpinnerEvent(): Observable<any>{ 
    return this.subject2.asObservable();
  }

  sendActionEvent(){ 
    this.subject3.next();
  }
  getActionEvent(): Observable<any>{ 
    return this.subject3.asObservable();
  }
  sendBuyEvent(){ 
    this.subject4.next();
  }
  getBuyEvent(): Observable<any>{ 
    return this.subject4.asObservable();
  }

  sendPriceChangeEvent(){
    this.subject5.next();
  }
  getPriceChangeEvent(){
    return this.subject5.asObservable();
  }

  sendUpdatePortfolioCardEvent(){
    this.subject6.next();
  }

  getUpdatePortfolioCardEvent(){
    return this.subject6.asObservable();
  }

  sendUpdateWatchlistCardEvent(){
    this.subject7.next();
  }

  getUpdateWatchlistCardEvent(){
    return this.subject7.asObservable();
  }

  sendOrderWatchlistCardEvent(){
    this.subject8.next();
  }

  getOrderWatchlistCardEvent(){
    return this.subject8.asObservable();
  }

  sendSellEvent(){
    this.subject9.next();
  }

  getSellEvent(){
    return this.subject9.asObservable();
  }

  constructor() { }
}
