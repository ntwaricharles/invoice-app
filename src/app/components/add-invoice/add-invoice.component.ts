import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { InvoiceState } from '../../store/invoice/invoice.reducer';
import { Observable } from 'rxjs';
import { selectInvoiceById } from '../../store/invoice/invoice.selectors';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css'],
})
export class AddInvoiceComponent implements OnInit {
  form: FormGroup;
  invoiceId!: string;
  invoice$!: Observable<Invoice | undefined>;
  @Input() showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private store: Store<{ invoice: InvoiceState }> 
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

  ngOnInit(): void {
    // Get the invoiceId from the route
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.invoiceId = idParam;
        this.invoice$ = this.store.select(selectInvoiceById(this.invoiceId));
        this.populateFormForEditing();
      }
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

  // Populate the form for editing
  populateFormForEditing(): void {
    this.invoice$.subscribe((invoice) => {
      if (invoice) {
        this.form.patchValue({
          streetAddress: invoice.senderAddress.street,
          city: invoice.senderAddress.city,
          postCode: invoice.senderAddress.postCode,
          country: invoice.senderAddress.country,
          clientName: invoice.clientName,
          email: invoice.clientEmail,
          clientStreetAddress: invoice.clientAddress.street,
          clientCity: invoice.clientAddress.city,
          clientPostCode: invoice.clientAddress.postCode,
          clientCountry: invoice.clientAddress.country,
          invoiceDate: invoice.createdAt,
          payment: invoice.paymentTerms,
          projectDescription: invoice.description,
        });
        
        this.items.clear();
        invoice.items.forEach((item) => {
          const itemGroup = this.createItemFormGroup();
          itemGroup.patchValue({
            itemName: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          });
          this.items.push(itemGroup);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onReset() {
    this.form.reset();
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/invoices']);
  }
}
