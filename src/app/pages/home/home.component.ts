import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsInvoiceVisible } from '../../store/add-invoice-visibility/add-invoice-visibility.selectors';
import { hideAddInvoice } from '../../store/add-invoice-visibility/add-invoice-visibility.actions';
import { AddInvoiceState } from '../../store/add-invoice-visibility/add-invoice-visibility.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showAddInvoice$!: Observable<boolean>;

  constructor(private store: Store<{ AddInvoiceReducer: AddInvoiceState }>) {}

  ngOnInit() {
    this.showAddInvoice$ = this.store.select(selectIsInvoiceVisible);
  }

  closeAddInvoice() {
    this.store.dispatch(hideAddInvoice());
  }

  // stopPropagation(event: MouseEvent) {
  //   event.stopPropagation();
  // }
}
