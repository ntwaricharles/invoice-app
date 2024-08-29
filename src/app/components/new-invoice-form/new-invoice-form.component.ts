import { Component, EventEmitter, Output } from '@angular/core';
import { InvoiceItem, Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-new-invoice-form',
  templateUrl: './new-invoice-form.component.html',
})
export class NewInvoiceFormComponent {
  clientName: string = '';
  dueDate: string = '';
  total: number = 0;
  items: InvoiceItem[] = [
    { description: 'Item 1', quantity: 2, price: 50, total: 100 },
    { description: 'Item 2', quantity: 1, price: 150, total: 150 },
  ];

  @Output() invoiceAdded = new EventEmitter<Invoice>();

  addInvoice() {
    const newInvoice: Invoice = {
      id: 'INV-123',
      clientName: this.clientName,
      dueDate: this.dueDate,
      items: this.items.map((item) => ({
        ...item,
        total: item.quantity * item.price,
      })),
      status: 'pending',
      total: this.items.reduce((acc, item) => acc + item.total, 0),
    };

    this.invoiceAdded.emit(newInvoice);
  }

  onSubmit() {
    this.addInvoice();
  }

  calculateTotal() {
    this.total = this.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  }

  addItem() {
    this.items.push({ description: '', quantity: 1, price: 0, total: 0 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.calculateTotal();
  }

  close() {
    // Implement close logic
  }
}
