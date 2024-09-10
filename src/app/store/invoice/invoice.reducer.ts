import { createReducer, on } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';
import * as InvoiceActions from './invoice.actions';

export interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string;
}

export const initialInvoiceState: InvoiceState = {
  invoices: [],
  loading: false,
  error: '',
};

// Helper function to update localStorage
const updateLocalStorage = (invoices: Invoice[]) => {
  localStorage.setItem('invoices', JSON.stringify(invoices));
};

// Load invoices from localStorage if available
export const invoiceReducer = createReducer(
  initialInvoiceState,

  // Load Invoices from localStorage
  on(InvoiceActions.loadInvoicesFromLocalStorage, (state) => {
    const localInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    return {
      ...state,
      invoices: localInvoices,
      loading: false,
    };
  }),

  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) => {
    updateLocalStorage(invoices); // Store invoices in localStorage
    return {
      ...state,
      invoices,
      loading: false,
    };
  }),

  on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(InvoiceActions.updateInvoiceSuccess, (state, { invoice }) => {
    const updatedInvoices = state.invoices.map((inv) =>
      inv.id === invoice.id ? { ...invoice } : inv
    );
    updateLocalStorage(updatedInvoices); // Store updated invoices in localStorage
    return {
      ...state,
      invoices: updatedInvoices,
    };
  }),
  on(InvoiceActions.addInvoice, (state, { invoice }) => {
    const updatedInvoices = [...state.invoices, invoice];
    updateLocalStorage(updatedInvoices); // Sync new invoice with localStorage
    return { ...state, invoices: updatedInvoices };
  }),

  on(InvoiceActions.addInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
  })),

  on(InvoiceActions.addInvoiceFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(InvoiceActions.deleteInvoice, (state, { id }) => {
    const updatedInvoices = state.invoices.filter(
      (invoice) => invoice.id !== id
    );
    updateLocalStorage(updatedInvoices); // Update localStorage after deletion
    return {
      ...state,
      invoices: updatedInvoices,
    };
  }),

  on(InvoiceActions.markInvoiceAsPaid, (state, { invoiceId }) => {
    const updatedInvoices = state.invoices.map((invoice) =>
      invoice.id === invoiceId ? { ...invoice, status: 'paid' } : invoice
    );
    updateLocalStorage(updatedInvoices); // Sync with localStorage
    return { ...state, invoices: updatedInvoices };
  })
);
