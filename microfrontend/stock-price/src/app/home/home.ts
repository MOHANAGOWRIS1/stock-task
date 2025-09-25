import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PriceService, StockPrice } from '../services/price';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls:['./home.css'],
})
export class HomeComponent implements OnInit {
  currentStock: StockPrice = {
    symbol: ' AAPL',
    price: 150,
    updatedAt: new Date().toISOString(),
  };

  constructor(private priceService: PriceService) {}

  ngOnInit() {
    this.priceService.connect().subscribe((data) => {
      this.currentStock = data;
    });
  }
}
