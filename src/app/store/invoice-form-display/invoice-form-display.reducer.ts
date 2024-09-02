import { createReducer, on } from '@ngrx/store';
import { showAddInvoice, hideAddInvoice } from './invoice-form-display.actions';

export interface AddInvoiceState {
  isVisible: boolean;
}

export const initialState: AddInvoiceState = {
  isVisible: false,
};

export const AddInvoiceReducer = createReducer(
  initialState,
  on(showAddInvoice, (state) => ({ ...state, isVisible: true })),
  on(hideAddInvoice, (state) => ({ ...state, isVisible: false }))
);
