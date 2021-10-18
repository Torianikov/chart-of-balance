import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart-of-balance',
  templateUrl: './chart-of-balance.component.html',
  styleUrls: ['./chart-of-balance.component.scss']
})
export class ChartOfBalanceComponent implements OnInit {
  @Input() tradesGroup: FormGroup;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public lineChartData: ChartDataSets[] = [
    { data: this.rangePrice, label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation?: any; }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
    console.log(this.tradesGroup);
    this.tradesGroup.valueChanges.subscribe(() => {
      console.log('12');
      this.lineChartData = [
        { data: this.rangePrice, label: 'Series A' },
      ];
      this.lineChartLabels = this.getDateArray(this.tradesGroup.controls.entryDate.value, this.tradesGroup.controls.exitDate.value);
    });
  }
  co() {
    console.log(this.rangePrice);
    console.log(this.getDateArray(this.tradesGroup.controls.entryDate.value, this.tradesGroup.controls.exitDate.value));
    this.chart.ngOnChanges({});

  }

  getDateArray(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }

  get rangePrice() {
    const exitPrice = this.tradesGroup?.get('exitPrice')?.value || 0;
    const entryPrice = this.tradesGroup?.get('entryPrice')?.value || 0;
    return Array.from({ length: exitPrice - +entryPrice + 1 }, (_, i) => +entryPrice + i);
  }
}