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
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
