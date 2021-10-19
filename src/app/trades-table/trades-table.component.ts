import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AddingEditingTradesComponent } from '../adding-editing-trades/adding-editing-trades.component';
import { MatTable } from '@angular/material/table';
import { Trade } from '../model/trade';

@Component({
  selector: 'app-trades-table',
  templateUrl: './trades-table.component.html',
  styleUrls: ['./trades-table.component.scss'],
})
export class TradesTableComponent implements OnInit {
  tradesGroup: FormGroup;

  @ViewChild(MatTable) table: MatTable<Trade>;

  displayedColumns: string[] = [
    'entryPrice',
    'exitPrice',
    'entryDate',
    'exitDate',
    'profit',
    'balance',
    'edit'
  ];
  userTrades: Trade[] = [];
  chartForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog) {}

  ngOnInit(): void {
      this.chartForm = this.formBuilder.group({
          arrayBalance: [],
          arrayExitDate: []
      })
  }

  openAddingEditingDialog(trade?: Trade): void {
    const dialogRef = this.dialog.open(AddingEditingTradesComponent, {
      width: '600px',
      data: {userTrades: this.userTrades, trade, overallBalance: trade ? 0 : this.overallBalance, id: this.lastId}

    });
    dialogRef.afterClosed().subscribe(() => {
        this.chartForm.get('arrayBalance').patchValue(this.arrayBalance)
        this.chartForm.get('arrayExitDate').patchValue(this.arrayExitDate)
        this.table?.renderRows()
    })
  }

  get overallBalance(): number {
      return this.userTrades.reduce(((prev, curr) => prev + curr.balance), 0)
  }
  get lastId(): number {
      return this.userTrades[this.userTrades.length-1]?.id || 0
  }

  get arrayBalance(): string[] {
    const arrayBalance = []
    this.userTrades.forEach(trade => arrayBalance.push(trade?.balance));
    return arrayBalance
  }

  get arrayExitDate(): string[] {
    const arrayExitDate = []
    this.userTrades.forEach(trade => arrayExitDate.push(trade?.exitDate));
    return arrayExitDate
  }
}
