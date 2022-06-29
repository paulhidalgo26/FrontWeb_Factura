import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './Components/adminComponents/clients/clients.component';
import { adminLoginComponent } from './Components/adminComponents/login/admin-login.component';
import { NewSaleComponent } from './Components/clientComponents/new-sale/new-sale.component';
import { SaleCompletedComponent } from './Components/clientComponents/sale-completed/sale-completed.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductViewComponent } from './Components/product-view/product-view.component';
import { SalesViewComponent } from './Components/sales-view/sales-view.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'product-view', component: ProductViewComponent},
  { path: 'sales-view', component: SalesViewComponent},
  { path: 'new-sale', component: NewSaleComponent, canActivate: [AuthGuard]},
  { path: 'adminLogin', component: adminLoginComponent},
  { path: 'sale-completed', component: SaleCompletedComponent, canActivate: [AuthGuard]},
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }