import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AddInvoiceState } from './invoice-form-display.reducer';

// Use 'addInvoice' to match the key in StoreModule.forRoot
export const selectInvoiceState =
  createFeatureSelector<AddInvoiceState>('addInvoice');

export const selectIsInvoiceVisible = createSelector(
  selectInvoiceState,
  (state: AddInvoiceState) => state?.isVisible ?? false
);
