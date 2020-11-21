import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ShareInfoService } from '../share-info.service';
@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {
  @ViewChild('buy_content') content: ElementRef;
  @Input() modalData: any;
  
  updatedPriceSubscription:Subscription
  q:number = 0;
  closeResult;
  buyCard=[]
  price=0;
  updatedPrice;
  isFraction;
  constructor(private modalService: NgbModal, private service: ShareInfoService, private router:Router) {   
    this.updatedPriceSubscription=this.service.getPriceChangeEvent().subscribe(()=>this.updateData())
  }


  open(){
    this.openModal(this.content);
  }
  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.price=this.modalData[0].price;
  }

  updateData(){
    if(this.router.url.includes('details')){
      this.price=this.service.data;
    }
  }
  

  buy(){
    
    if(!this.bought()){
      var list=JSON.parse(localStorage.getItem("bought")) || [];
      var totalCost = this.modalData[0].price * this.q;
      this.buyCard.push({
        id: list.length,
        symbol:this.modalData[0].symbol,
        quantity:this.q,
        name:this.modalData[0].name,
        price:this.modalData[0].price,
        totalCost:totalCost,
        avgCostPerShare:totalCost/this.q
      });
      list.push(this.buyCard);
      localStorage.setItem("bought",JSON.stringify(list));
    }
    // console.log(JSON.parse(localStorage.getItem("bought")));
    this.service.sendPortfolioCardEvent();
    this.service.sendActionEvent();
    this.q=0;
    
  }


  bought(){
    var list=JSON.parse(localStorage.getItem("bought")) || [];
    for(var item=0;item<list.length;item++){
      if(list[item][0]['symbol'] == this.modalData[0].symbol){
        list[item][0]['quantity']+=this.q;
        list[item][0]['price'] = this.modalData[0].price;
        list[item][0]['totalCost']+=this.q * this.modalData[0].price;
        list[item][0]['avgCostPerShare'] = list[item][0]['totalCost']/ list[item][0]['quantity']
        localStorage.setItem("bought",JSON.stringify(list))
        return true;
      }
    }
    return false;
  }

  getClass(){
    if(this.q>0 && Number.isInteger(this.q)){
      return "btn btn-success";
    }

    return "btn btn-success disabled "
  }

}
