import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatTableModule} from '@angular/material/table'
import { MatCardModule} from '@angular/material/card'
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule} from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';

//#region Material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

//#endregion

import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { SidenavComponent } from './Components/sidenav/sidenav.component'
import { HeaderComponent } from './Components/header/header.component';
import { ProductViewComponent } from './Components/product-view/product-view.component';
import { NewSaleComponent } from './Components/clientComponents/new-sale/new-sale.component';
import { SaleCompletedComponent } from './Components/clientComponents/sale-completed/sale-completed.component';
import { adminLoginComponent } from './Components/adminComponents/login/admin-login.component';
import { ClientsComponent } from './Components/adminComponents/clients/clients.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogClientsComponent } from './Components/clientComponents/new-sale/dialogClients/dialogClients.component';
import { DialogProductsComponent } from './Components/clientComponents/new-sale/dialogProducts/dialogProducts.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogSaleConfirmation } from './Components/clientComponents/new-sale/dialogSaleConfirmation/dialogSaleConfirmation.component';
import { SalesViewComponent } from './Components/sales-view/sales-view.component';
import { DialogSaleComponent } from './Components/sales-view/dialogSale/dialogSale.component';
import { DialogProductComponent } from './Components/product-view/dialog-product/dialog-product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogClientAddEditComponent } from './Components/adminComponents/clients/dialog-client/dialog-client.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    adminLoginComponent,
    ProductViewComponent,
    SidenavComponent,
    HeaderComponent,
    ProductViewComponent,
    NewSaleComponent,
    SaleCompletedComponent,
    ClientsComponent,
    DialogClientsComponent,
    DialogProductsComponent,
    DialogSaleConfirmation,
    SalesViewComponent,
    DialogSaleComponent,
    DialogProductComponent,
    DialogClientAddEditComponent
  ],
  imports: [
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSnackBarModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,
    multi: true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }