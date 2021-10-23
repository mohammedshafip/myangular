import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Myclass } from '../myclass';
@Component({
  selector: 'app-myclass',
  templateUrl: './myclass.component.html',
  styleUrls: ['./myclass.component.css']
})
export class MyclassComponent implements OnInit {

    class_ID:number;
    cls_code: string;
    cls_name: string;
    cls_description: string;
    clsnamestd:string;

  myclasses = [];  
  myclassstd=[];
  constructor(private dataService: DataService) { }
  onSubmit(myclasse: Myclass) {   
    if(myclasse.class_ID==0){
      this.dataService.sendPostRequest(myclasse,'http://localhost:8000/myclass/store');
    } else{
      this.dataService.sendPostRequest(myclasse,'http://localhost:8000/myclass/update');
    }    
    alert('Data saved sucessfully');
    this.toggleDisplay();
    this.ngOnInit();
    this.cleardata();

    }
  cleardata()
  {
    this.class_ID=0;
    this.cls_code='';
    this.cls_name='';
    this.cls_description='';
  }  
  editpost(myclasse: Myclass){
      this.class_ID=myclasse.class_ID;
      this.cls_code=myclasse.cls_code;
      this.cls_name=myclasse.cls_name;
      this.cls_description=myclasse.cls_description;
      this.isShow = false;
    }  
  deletepost(myclasse: Myclass){
    if (confirm('Are you sure you want to save this thing into the database?')) {
      // Save it!
      console.log('Thing was saved to the database.');
      this.dataService.sendPostRequest(myclasse,'http://localhost:8000/myclass/destroy');
      alert('Data deleted sucessfully');
      this.ngOnInit();
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
    
    }  

    getclassstd(myclasse: Myclass){
      this.dataService.sendGetRequest('http://localhost:8000/myclass/getclassstd/'+myclasse.class_ID).subscribe((data: any[])=>{
        console.log(data);
        this.myclassstd = data;
        this.isShowStd=false;  
        this.clsnamestd=myclasse.cls_name;      
      }) 
    }  
  ngOnInit(): void {
    this.dataService.sendGetRequest('http://localhost:8000/myclass').subscribe((data: any[])=>{
      console.log(data);
      this.myclasses = data;
    }) 
  }
  isShowStd=true;
  toggleDisplaystd() {
    this.isShowStd = !this.isShowStd;
  }

  isShow = true; 
  toggleDisplay() {
    this.isShow = !this.isShow;
    this.class_ID=0;
    this.cleardata();
  }

}
