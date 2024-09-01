import { Component } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css'],
})
export class AddInvoiceComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {
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
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0.01, [Validators.required, Validators.min(0.01)]],
      total: [{ value: 0, disabled: true }],
    });
  }

  addItem(): void {
    const item = this.createItemFormGroup();
    this.items.push(item);
    this.updateTotal(item);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  updateTotal(item: FormGroup): void {
    const quantityControl = item.get('quantity');
    const priceControl = item.get('price');
    const totalControl = item.get('total');

    quantityControl?.valueChanges.subscribe(() => {
      const total = this.calculateTotal(
        quantityControl.value,
        priceControl?.value
      );
      totalControl?.setValue(total);
    });

    priceControl?.valueChanges.subscribe(() => {
      const total = this.calculateTotal(
        quantityControl?.value,
        priceControl.value
      );
      totalControl?.setValue(total);
    });
  }

  calculateTotal(quantity: number, price: number): number {
    return quantity * price;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Process the form data
    } else {
      console.log('Form is invalid');
    }
  }

  onReset() {
    this.form.reset();
  }

  hideModal() {
    window.location.reload();
  }
}
