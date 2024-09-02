import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InvoiceState } from '../../store/invoice/invoice.reducer';
import * as InvoiceActions from '../../store/invoice/invoice.actions';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.css'],
})
export class DeleteInvoiceComponent {
  @Input() showModal: boolean = false;
  @Input() invoiceId!: string;

  constructor(
    private router: Router,
    private store: Store<{ invoice: InvoiceState }>
  ) {}

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/invoices']);
  }

  deleteInvoice() {
    if (this.invoiceId) {
      this.store.dispatch(InvoiceActions.deleteInvoice({ id: this.invoiceId }));
      this.closeModal();
    }
  }
}
