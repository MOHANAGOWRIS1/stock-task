import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
 import {NgxEchartsModule} from 'ngx-echarts';
 import { PriceService } from '../services/price';
 import { StockPrice } from '../services/price';
//  import { NgxEChartsModule } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, DataZoomComponent } from 'echarts/components';
// import necessary echarts components
import { BarChart, LineChart } from 'echarts/charts';
// import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, GridComponent, CanvasRenderer, LineChart,GridComponent, TooltipComponent,DataZoomComponent]);

import { EChartsCoreOption } from 'echarts/core';
import type { EChartsOption } from 'echarts';
@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [CommonModule,NgxEchartsModule],
  templateUrl: './price-chart.html',
  styleUrls: ['./price-chart.css'],
    
})
export class PriceChartComponent implements OnInit {
  chartOption: EChartsOption = {
    xAxis: { type: 'category', data: [] },
    yAxis: { type: 'value' },
    series: [{ data: [], type: 'line', smooth: true }],
    tooltip: { trigger: 'axis' },
  // };


    dataZoom: [
      {
        type: 'inside', // zoom with mouse wheel or pinch
        xAxisIndex: 0,
      },
      {
        type: 'slider', // shows a slider below the chart
        xAxisIndex: 0,
        start: 0, // initial view
        end: 100,
      },
    ],
  };

  stockData: number[] = [];
  timeData: string[] = [];
  symbol: string = ' AAPL';

  constructor(private priceService: PriceService) {}

  ngOnInit() {
    // Initialize chart with historical data
    const history = this.priceService.getHistory();
    history.forEach((data) => {
      this.timeData.push(new Date(data.updatedAt).toLocaleTimeString());
      this.stockData.push(data.price);
    });

    this.chartOption = {
      ...this.chartOption,
      xAxis: { data: this.timeData },
      series: [{ data: this.stockData, type: 'line', smooth: true }],
    };

    // Subscribe to live updates
    this.priceService.connect().subscribe((data: StockPrice) => {
      this.symbol = data.symbol;
      const time = new Date(data.updatedAt).toLocaleTimeString();
      this.timeData.push(time);
      this.stockData.push(data.price);

      if (this.timeData.length > 20) {
        this.timeData.shift();
        this.stockData.shift();
      }

      this.chartOption = {
        ...this.chartOption,
        xAxis: { data: this.timeData },
        series: [{ data: this.stockData, type: 'line', smooth: true }],
      };
    });
  }
}




// export class PriceChartComponent {
//  chartOption: EChartsOption = {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   },
//   yAxis: {
//     type: 'value',
//   },
//   series: [
//     {
//       data: [820, 932, 901, 934, 1290, 1330, 1320],
//       type: 'line',
//     },
//   ],
// };

// }

