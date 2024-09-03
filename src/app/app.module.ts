import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { invoiceReducer } from './store/invoice/invoice.reducer';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InvoiceCardComponent } from './components/invoice-card/invoice-card.component';
import { EmptyInvoiceComponent } from './components/empty-invoice/empty-invoice.component';
import { ButtonComponent } from './components/button/button.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AddInvoiceReducer } from './store/invoice-form-display/invoice-form-display.reducer';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceEffects } from './store/invoice/invoice.effects';
import { DeleteInvoiceComponent } from './components/delete-invoice/delete-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceDetailsComponent,
    SidebarComponent,
    InvoiceCardComponent,
    EmptyInvoiceComponent,
    ButtonComponent,
    AddInvoiceComponent,
    HomeComponent,
    InvoicesComponent,
    DeleteInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      addInvoice: AddInvoiceReducer,
      invoices: invoiceReducer,
    }),
    EffectsModule.forRoot([InvoiceEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
