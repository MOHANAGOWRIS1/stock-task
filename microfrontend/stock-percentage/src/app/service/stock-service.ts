import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url = "ws://localhost:4008/stocks";

  constructor(private http:HttpClient){}

  getAll(){
    return this.http.get(this.url);
  }
}
