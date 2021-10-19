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
  @Input() chartForm: FormGroup;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = [];
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

  ngOnInit(): void {
    this.chartForm.valueChanges.subscribe(() => {
        this.lineChartData = [
                { data: this.chartForm.get('arrayBalance').value, label: 'Series A' },
        ];
        this.lineChartLabels = this.chartForm.get('arrayExitDate').value
    })
  }
}
