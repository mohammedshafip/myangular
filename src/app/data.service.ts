import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "";
  constructor(private httpClient: HttpClient) { }
  public sendGetRequest(myurl){
    return this.httpClient.get(myurl);
  }
  public sendPostRequest(data,myurl){
    console.warn(data);
    
    return this.httpClient.post(myurl,data).subscribe(
      (res)=>res,
      (err) => console.log(err)
    );
  }
}
