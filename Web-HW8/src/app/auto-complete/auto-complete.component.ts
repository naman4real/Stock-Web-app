import {Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  constructor (private http: HttpClient, public router: Router){}  

  myControl = new FormControl();
  options: string[] = [];
  inputValue=''
  searchedValues: string[] =[];
  showOptions=true;
  fieldEmpty=true;



  ngOnInit() {
    this.myControl.valueChanges
    .pipe(
      startWith(''),
      debounceTime(500)
    )
    .subscribe(value =>
      this._filter(value));
  }

  private _filter(value: string): string[] {
    if(value){
      this.fieldEmpty=false;
      this.showOptions=false
      this.options=[];
      this.inputValue=value;
      this.searchedValues.push(value)
      this.http.get(`http://nodejshw8app.us-east-1.elasticbeanstalk.com/${value}`).toPromise().then( data => { 
        for(var item in data){
            this.options.push(data[item]['ticker'] + " | " + data[item]['name']);
        }
        this.showOptions=true;
      });
    
    
      const filterValue = value.toLowerCase();
      this.options=this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
      return this.options;
    }
    else{
      this.showOptions=false;
      this.fieldEmpty=true;
    }

  }

  onClick(event:Event){
    if(this.inputValue){
      var stock=this.displayFn(this.inputValue)
      this.router.navigate(['/details',stock]);
    }

  }
  displayFn(option:String){
    if(option){
      return option.split(' |')[0]
    }
  }




}