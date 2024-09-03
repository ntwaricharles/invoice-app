import { selectInvoiceById } from '../../store/invoice/invoice.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../models/invoice.model';
import { Store } from '@ngrx/store';
import { InvoiceState } from '../../store/invoice/invoice.reducer';
import { Observable } from 'rxjs';
import * as InvoiceActions from '../../store/invoice/invoice.actions';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  showModal: boolean = false;
  invoice$!: Observable<Invoice | undefined>;
  selectedInvoiceId!: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ invoice: InvoiceState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.selectedInvoiceId = idParam;
        this.invoice$ = this.store.select(selectInvoiceById(idParam));
      }
    });
  }

  deleteInvoice() {
    this.showModal = true;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  markAsPaid(invoice: Invoice) {
    if (invoice.status !== 'paid') {
      const updatedInvoice = { ...invoice, status: 'paid' };
      this.store.dispatch(
        InvoiceActions.updateInvoice({ invoice: updatedInvoice })
      );
    }
  }

  editInvoice() {
    this.router.navigate(['/edit-invoice', this.selectedInvoiceId]);
  }
}
