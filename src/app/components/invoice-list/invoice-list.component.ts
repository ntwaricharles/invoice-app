import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invoice } from '../../models/invoice.model';
import { selectAllInvoices } from '../../store/invoice/invoice.selectors';
import {
  deleteInvoice,
  loadInvoices,
} from '../../store/invoice/invoice.actions';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  invoices$: Observable<Invoice[]>;
  filteredInvoices$: Observable<Invoice[]>;
  filterStatus = '';

  constructor(private store: Store <AppState>) {
    this.invoices$ = this.store.select(selectAllInvoices);
    this.filteredInvoices$ = this.invoices$;
  }

  ngOnInit(): void {
    this.store.dispatch(loadInvoices());
    this.applyFilters();
  }

  onFilterStatus(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.filterStatus = status;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredInvoices$ = this.invoices$.pipe(
      map((invoices) =>
        invoices.filter((invoice) =>
          this.filterStatus ? invoice.status === this.filterStatus : true
        )
      )
    );
  }

  deleteInvoice(id: string): void {
    this.store.dispatch(deleteInvoice({ id }));
  }

  onNewInvoice(): void {
    // Navigate to the new invoice form
    // Implement navigation logic here, for example using Angular Router
  }
}
