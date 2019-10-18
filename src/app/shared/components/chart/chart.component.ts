import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartDetails: Chart = {
    name: '',
    chartLabels: [],
    chartData: [],
    chartType: 'doughnut',
    chartColors: [{ backgroundColor: ['#5069E4', '#9199b6'] }],
    options: {
      cutoutPercentage: 65,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem: any, chartData: any) => {
            const data = chartData.datasets[0].data;
            const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
            const sum = data.reduce(reducer);
            const label = chartData.datasets[0].data[tooltipItem.index];
            const toNum = parseInt(label, 10);
            const percent = ((toNum / sum) * 100).toFixed(0);
            return percent + ' %';
          }
        },
        backgroundColor: '#0C1429',
        titleFontSize: 16,
        bodyFontColor: '#ffffff',
        bodyFontSize: 14,
        displayColors: false
      }
    }
  };

  operations = {
    checkin: 'checkin',
    checkout: 'checkout'
  };

  // Inputs
  @Input() chart: Chart;

  @ViewChild(BaseChartDirective, null) public chartDirective: BaseChartDirective;
  hasData = true;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.setChart();
  }

  setChart() {
    for (const item of Object.keys(this.chart)) {
      for (const prop in this.chartDetails) {
        if (item === prop) {
          this.chartDetails[prop] = this.chart[item];
        }
      }
    }
    if (this.chartDetails.chartData[0] === 0 && this.chartDetails.chartData[1] === 0) {
      this.hasData = false;
    }
    for (const operationType of Object.keys(this.operations)) {
      this.chartDetails.chartLabels.push(this.translate.instant('dashboard.chart.' + operationType));
    }
  }
}

interface Chart {
  name: string;
  chartLabels: string[];
  chartData: number[];
  chartColors: {
    backgroundColor: string[];
  }[];
  chartType: string;
  options: {};
}
