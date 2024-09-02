import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// import { InvoiceDetailComponent } from './components/invoice-details/invoice-detail.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },
  { path: 'edit-invoice/:id', component: AddInvoiceComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
