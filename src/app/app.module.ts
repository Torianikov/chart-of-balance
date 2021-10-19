import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TradesTableComponent } from './trades-table/trades-table.component';
import { ChartOfBalanceComponent } from './chart-of-balance/chart-of-balance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { AddingEditingTradesComponent } from './adding-editing-trades/adding-editing-trades.component';
import {MaterialModule} from './material-module'

@NgModule({
  declarations: [
    AppComponent,
    TradesTableComponent,
    ChartOfBalanceComponent,
    AddingEditingTradesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
