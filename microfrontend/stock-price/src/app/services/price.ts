import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface StockPrice {
  symbol: string;
  price: number;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class PriceService {
  private ws!: WebSocket;
  private stockSubject = new BehaviorSubject<StockPrice>({
    symbol: ' AAPL',
    price: 150,
    updatedAt: new Date().toISOString(),
  });
  private history: StockPrice[] = [];

  connect(): Observable<StockPrice> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.ws = new WebSocket('ws://localhost:4300');

      this.ws.onmessage = (event) => {
        const data: StockPrice = JSON.parse(event.data);
        this.history.push(data);
        if (this.history.length > 20) this.history.shift();
        this.stockSubject.next(data);
      };
    }
    return this.stockSubject.asObservable();
  }

  getHistory(): StockPrice[] {
    return this.history;
  }
}
