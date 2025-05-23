import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FarmerNavbarComponent } from './farmerComponents/farmer-navbar/farmer-navbar.component';
import { FarmerMyRequestsComponent } from './farmerComponents/farmer-my-requests/farmer-my-requests.component';
import { FarmerViewAgrochemicalComponent } from './farmerComponents/farmer-view-agrochemical/farmer-view-agrochemical.component';
import { ViewCropComponent } from './farmerComponents/view-crop/view-crop.component';
import { CropFormComponent } from './farmerComponents/crop-form/crop-form.component';
import { SellerNavbarComponent } from './sellerComponents/seller-navbar/seller-navbar.component';
import { SellerViewRequestsComponent } from './sellerComponents/seller-view-requests/seller-view-requests.component';
import { ViewAgrochemicalComponent } from './sellerComponents/view-agrochemical/view-agrochemical.component';
import { AgrochemicalFormComponent } from './sellerComponents/agrochemical-form/agrochemical-form.component';

import { ToastrModule } from 'ngx-toastr'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './search.pipe';
import { RequestSearchPipe } from './request-search.pipe';
import { CropSearchPipe } from './crop-search.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    SignupComponent,
    HomePageComponent,
    FarmerNavbarComponent,
    FarmerMyRequestsComponent,
    FarmerViewAgrochemicalComponent,
    ViewCropComponent,
    CropFormComponent,    
    SellerNavbarComponent,
    SellerViewRequestsComponent,
    ViewAgrochemicalComponent,
    AgrochemicalFormComponent,
    LoginComponent,
    SearchPipe,
    RequestSearchPipe,
    CropSearchPipe,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
