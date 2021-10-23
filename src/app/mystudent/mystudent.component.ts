import { Component, Injectable, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Mystudent } from '../mystudent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';
  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
@Component({
  selector: 'app-mystudent',
  templateUrl: './mystudent.component.html',
  styleUrls: ['./mystudent.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class MystudentComponent implements OnInit {
  std_ID:number;
  std_firstname: string;
  std_lastname: string;
  std_clasID:number;
  cls_name:string;
  std_dateofbirth: NgbDate;
  std_status:string;
  model: NgbDateStruct;  
  datalimit:number;
  constructor(private dataService: DataService, private dateAdapter: NgbDateAdapter<string>) { }
  mystudents = []; 
  myclass = []; 
  mydatalimit=[];  
  ngOnInit(): void {
    this.dataService.sendGetRequest('http://localhost:8000/mystudent').subscribe((data: any[])=>{     
      this.mystudents = data;
    }) 
    this.dataService.sendGetRequest('http://localhost:8000/myclass').subscribe((data: any[])=>{
      console.log(data);
      this.myclass = data;
    })    
  }  
  clearall(){
      this.std_ID=0;
      this.std_firstname="";
      this.std_lastname="";       
  }
  deletepost(mystudents: Mystudent){
    if (confirm('Are you sure you want to save this thing into the database?')) {
      // Save it!
      console.log('Thing was saved to the database.');
      this.dataService.sendPostRequest(mystudents,'http://localhost:8000/mystudent/destroy');
      alert('Data deleted sucessfully');
      this.ngOnInit();
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }    
  }
  editpost(mystudents: Mystudent){
    this.std_ID=mystudents.std_ID;
      this.std_firstname=mystudents.std_firstname;
      this.std_lastname=mystudents.std_lastname;      
      this.std_dateofbirth=mystudents.std_dateofbirth;      
      this.std_clasID=mystudents.std_clasID;
      this.isShow = false;      
  }
  onSubmit(mystudents: Mystudent) {
    if(mystudents.std_dateofbirth==undefined){
      alert('date of birth feild is required');
    }else{
    this.dataService.sendGetRequest('http://localhost:8000/mystudent/getdatacount/'+mystudents.std_clasID).subscribe((data: any[])=>{     
      this.mydatalimit = data;
      this.datalimit=parseInt(this.mydatalimit.toString());
      if(this.datalimit < 10){
      if(mystudents.std_ID==0){
        console.warn(mystudents);
        this.dataService.sendPostRequest(mystudents,'http://localhost:8000/mystudent/store');
      } else{
         this.dataService.sendPostRequest(mystudents,'http://localhost:8000/mystudent/update');
      }    
      alert('Data saved sucessfully');
    }else{
      alert('Student Exceeded for the class');
      
    }

    }) 

    
    this.toggleDisplay();
    this.ngOnInit();
    this.clearall();
  }
}
  isShow = true; 
  toggleDisplay() {
    this.isShow = !this.isShow;
    this.std_ID=0;
    this.clearall();
  }


}
