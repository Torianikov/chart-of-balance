import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-adding-editing-trades',
  templateUrl: './adding-editing-trades.component.html',
  styleUrls: ['./adding-editing-trades.component.scss']
})
export class AddingEditingTradesComponent implements OnInit {

  tradesGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.tradesGroup = this.formBuilder.group({
      entryPrice: [null, [this.validatePrice(), Validators.pattern(/[0-9]/)]],
      exitPrice: [null, [this.validatePrice(), Validators.pattern(/[0-9]/)]],
      entryDate: null,
      exitDate: null,
    });
  }
  validatePrice(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean; } | null => {
      if (control.value < 0) {
        return { invalidNumber: true };
      }
      return null;
    };
  }
  get profit(): number {
    if (!this.tradesGroup.invalid) {
      return this.tradesGroup.get('exitPrice')?.value - this.tradesGroup.get('entryPrice')?.value;
    }
    return 0;
  }

}
