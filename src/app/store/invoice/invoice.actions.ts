import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';

export const loadInvoicesFromLocalStorage = createAction(
  '[Invoice] Load Invoices from LocalStorage'
);
export const loadInvoices = createAction('[Invoice] Load Invoices');
export const loadInvoicesSuccess = createAction(
  '[Invoice] Load Invoices Success',
  props<{ invoices: Invoice[] }>()
);
export const loadInvoicesFailure = createAction(
  '[Invoice] Load Invoices Failure',
  props<{ error: string }>()
);

export const updateInvoice = createAction(
  '[Invoice] Update Invoice',
  props<{ invoice: Invoice }>()
);
export const updateInvoiceSuccess = createAction(
  '[Invoice] Update Invoice Success',
  props<{ invoice: Invoice }>()
);
export const updateInvoiceFailure = createAction(
  '[Invoice] Update Invoice Failure',
  props<{ error: string }>()
);
export const addInvoice = createAction(
  '[Invoice] Add Invoice',
  props<{ invoice: Invoice }>()
);

export const addInvoiceSuccess = createAction(
  '[Invoice] Add Invoice Success',
  props<{ invoice: Invoice }>()
);

export const addInvoiceFailure = createAction(
  '[Invoice] Add Invoice Failure',
  props<{ error: string }>()
);
export const deleteInvoice = createAction(
  '[Invoice] Delete Invoice',
  props<{ id: string }>() // Ensure 'id' is defined here
);
export const markInvoiceAsPaid = createAction(
  '[Invoice] Mark Invoice as Paid',
  props<{ invoiceId: string }>()
);