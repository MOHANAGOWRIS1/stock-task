import { Component } from '@angular/core';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule } from '@angular/common';
echarts.use([BarChart, GridComponent, CanvasRenderer, LineChart, TooltipComponent, LegendComponent]);

import { EChartsCoreOption } from 'echarts/core';
import { StockService } from '../../service/stock-service';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-track-stock',
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './track-stock.html',
  styleUrl: './track-stock.css',
    providers: [provideEchartsCore({ echarts })],
})
export class TrackStock {

chartOption: any;
  private ws = webSocket('ws://localhost:4008'); // backend websocket

  // Store history for HDFC Flexi Cap
  stockHistory: number[] = [];
  timeStamps: string[] = [];

  ngOnInit(): void {
    this.chartOption = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['HDFC Flexi Cap'] },
      xAxis: { type: 'category', data: [] },
      yAxis: { type: 'value' },
      series: [
        { name: 'HDFC Flexi Cap', type: 'line', data: [] },
      ]
    };

    // Subscribe to WebSocket
    this.ws.subscribe((message: any) => {
      // message = { fund: "HDFC Flexi Cap", nav: 2001.42, time: "2025-09-25T11:55:05.000Z" }

      const now = new Date().toLocaleTimeString();
      this.timeStamps.push(now);
      if (this.timeStamps.length > 10) this.timeStamps.shift(); // keep last 10

      this.stockHistory.push(parseFloat(message.nav));
      if (this.stockHistory.length > 10) this.stockHistory.shift();

      // Update chart
      this.chartOption = {
        ...this.chartOption,
        xAxis: { ...this.chartOption.xAxis, data: [...this.timeStamps] },
        series: [
          { name: 'HDFC Flexi Cap', type: 'line', data: [...this.stockHistory] },
        ]
      };
    });
  }
}

