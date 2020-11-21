import { Component, OnInit,Input, ElementRef, ViewChild  } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ShareInfoService } from '../share-info.service';

@Component({
  selector: 'app-sell-modal',
  templateUrl: './sell-modal.component.html',
  styleUrls: ['./sell-modal.component.css']
})
export class SellModalComponent implements OnInit {
  @ViewChild('sell_content') content: ElementRef;
  @Input() modalData: any;
  @Input() quantity: number;
  q:number = 0;
  closeResult;
  sellCard=[]
  constructor(private modalService: NgbModal, private service: ShareInfoService) { }

  ngOnInit(): void {
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

  sell(){
    var list=JSON.parse(localStorage.getItem("bought")) || [];
    
    for(var item=0;item<list.length;item++){
      if(list[item][0]['symbol'] == this.modalData[0].symbol){
        list[item][0]['quantity']-=this.q;
        if(list[item][0].quantity==0){
          list[item][0]['totalCost']=0;
          list[item][0]['avgCostPerShare']=0;
          list[item][0]['change'] = 0;
          list[item][0]['marketValue'] = 0;
        }
        else{
          list[item][0]['totalCost']-=this.q * list[item][0]['avgCostPerShare'];
          list[item][0]['avgCostPerShare'] = list[item][0]['totalCost']/list[item][0]['quantity'];
          list[item][0]['change'] = list[item][0]['avgCostPerShare'] - list[item][0]['price'];
          list[item][0]['marketValue'] = list[item][0]['price'] * list[item][0]['quantity'];
        }
        localStorage.setItem("bought",JSON.stringify(list))
        break;
      }
    }
    this.service.sendSellEvent();
    this.q=0;
  }

  getClass(){
    if(this.q>0 && this.q<=this.quantity){
      return "btn btn-success";
    }
    return "btn btn-success disabled"
  }
}
