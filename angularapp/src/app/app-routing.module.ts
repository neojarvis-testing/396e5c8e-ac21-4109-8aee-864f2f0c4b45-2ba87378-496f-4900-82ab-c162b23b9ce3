import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SellerViewRequestsComponent } from './sellerComponents/seller-view-requests/seller-view-requests.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'seller/view-request',component:SellerViewRequestsComponent},\
  {path:'homepage',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
