import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAllSalesComponent } from "./list-all-sales/list-all-sales.component";
import { ListAllClosedSalesComponent } from "./list-all-closed-sales/list-all-closed-sales.component";
import { NewSaleComponent } from "./new-sale/new-sale.component";
import { ReportTwoComponent } from "./report-two/report-two.component";
import { ReportThreeComponent } from "./report-three/report-three.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms"; // Import FormsModule here
import { RouterModule } from "@angular/router";
import { ItemsService } from "./service/list-all-sales.service";
import { NewSaleService } from "./service/new-sale.service";
import { HttpClientModule/*, provideHttpClient, withFetch*/ } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ListAllClosedSalesComponent,
    ListAllSalesComponent,
    NewSaleComponent,
    ReportTwoComponent,
    ReportThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add FormsModule here
    //ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'firstPage', component: NewSaleComponent },
      { path: 'secondPage', component: ListAllSalesComponent },
    ]),
  ],
  providers: [
    //provideHttpClient(withFetch()),
    ItemsService,
    NewSaleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
