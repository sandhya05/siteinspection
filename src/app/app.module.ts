import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { StatusPipe } from './status.pipe';

import { HttpClientModule } from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPAComponent } from './spa/spa.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import * as jsPDF from 'jspdf';

// import { InputsModule } from '@progress/kendo-angular-inputs';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {ActivatedRoute} from '@angular/router';


const appRoutes : Routes =  [
  {path:"login", component : LoginComponent},
  {path:"",pathMatch: 'prefix', redirectTo:"login"},
  {path:"spa", pathMatch: 'prefix',component : SPAComponent},
  {path:"**", redirectTo:"login"}
 ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusPipe,
    SPAComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    SignaturePadModule,
    ScrollToModule.forRoot(),
    // InputsModule,
    // BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent}
      ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
