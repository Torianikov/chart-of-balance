import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Trade } from '../model/trade';

@Component({
    selector: 'app-adding-editing-trades',
    templateUrl: './adding-editing-trades.component.html',
    styleUrls: ['./adding-editing-trades.component.scss'],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class AddingEditingTradesComponent implements OnInit {
    tradesGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddingEditingTradesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {userTrades: Trade[], trade: Trade, overallBalance: number, id: number}
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.tradesGroup = this.formBuilder.group({
            id: this.data.trade ? this.data.trade.id : ++this.data.id,
            entryPrice: [
                null,
                [this.validatePrice(),Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)],
            ],
            exitPrice: [
                null,
                [this.validatePrice(),Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)],
            ],
            entryDate:[ null, Validators.required],
            exitDate: [null, Validators.required],
            profit: null,
            balance: null,
        });
        if (this.data.trade) {
            this.prefillForm()
        }
    }

    prefillForm(): void {
        const {entryPrice, exitPrice, entryDate, exitDate, balance} = this.data.trade;
        const {entryPrice: formEntryPrice, exitPrice: formExitPrice, entryDate: formEntryDate, exitDate: formExitDate} = this.tradesGroup.controls;
        formEntryPrice.setValue(entryPrice);
        formExitPrice.setValue(exitPrice);
        formEntryDate.setValue(new Date(entryDate));
        formExitDate.setValue(new Date(exitDate));
    }

    validatePrice(): ValidatorFn {
        return (control: AbstractControl ): { [key: string]: boolean } | null => {
            if (control.value < 0) {
                return { invalidNumber: true };
            }
            return null;
        };
    }

    submit(): void {
        if(!this.tradesGroup.invalid){
            this.tradesGroup.get('profit').setValue(this.profit);
            this.tradesGroup.get('balance').patchValue(this.profit + this.data.overallBalance);
            this.tradesGroup.get('exitDate').setValue(this.tradesGroup.get('exitDate').value.toDateString());
            this.tradesGroup.get('entryDate').setValue(this.tradesGroup.get('entryDate').value.toDateString());
            if(this.data.trade){
                this.data.userTrades[this.data.trade.id-1] = this.tradesGroup.getRawValue()
            } else {
                this.data.userTrades.push(this.tradesGroup.getRawValue());
            }
            this.dialogRef.close();
        }
    }

    get profit(): number {
        return this.tradesGroup.get('exitPrice')?.value - this.tradesGroup.get('entryPrice')?.value;
    }

    get textButton(): string {
        return this.data.trade ? "Edit Trade" : "Add Trade"
    }
}
