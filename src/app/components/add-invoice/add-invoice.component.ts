import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css'],
})
export class AddInvoiceComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private location: Location) {
    this.form = this.fb.group({
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      clientStreetAddress: ['', [Validators.required]],
      clientCity: ['', [Validators.required]],
      clientPostCode: ['', [Validators.required]],
      clientCountry: ['', [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      projectDescription: ['', [Validators.required]],
      items: this.fb.array([this.createItemFormGroup()]),

    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      itemName: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  addItem(): void {
    this.items.push(this.createItemFormGroup());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Invalid form');
      return;
    }
    console.log(this.form.value);
  }

  onReset() {
    this.form.reset();
  }

  hideModal() {
    window.location.reload();
  }
}
