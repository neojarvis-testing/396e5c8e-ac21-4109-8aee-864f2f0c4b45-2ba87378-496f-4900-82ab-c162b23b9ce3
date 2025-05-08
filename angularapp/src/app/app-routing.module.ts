import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CropFormComponent } from './farmerComponents/crop-form/crop-form.component';
import { ViewCropComponent } from './farmerComponents/view-crop/view-crop.component';
import { FarmerMyRequestsComponent } from './farmerComponents/farmer-my-requests/farmer-my-requests.component';
import { FarmerViewAgrochemicalComponent } from './farmerComponents/farmer-view-agrochemical/farmer-view-agrochemical.component';
import { AgrochemicalFormComponent } from './sellerComponents/agrochemical-form/agrochemical-form.component';
import { SellerViewRequestsComponent } from './sellerComponents/seller-view-requests/seller-view-requests.component';
import { ViewAgrochemicalComponent } from './sellerComponents/view-agrochemical/view-agrochemical.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'farmer/home-page', component: HomePageComponent },
  { path: 'farmer/crop-form', component: CropFormComponent },
  { path: 'farmer/crop-form/:id', component: CropFormComponent },
  { path: 'farmer/view-crop', component: ViewCropComponent },
  { path: 'farmer/my-requests', component: FarmerMyRequestsComponent },
  { path: 'farmer/view-agrochemical', component: FarmerViewAgrochemicalComponent },
  
  { path: 'seller/home-page', component: HomePageComponent },
  { path: 'seller/agrochemical-form', component: AgrochemicalFormComponent },
  { path: 'seller/agrochemical-form/:id', component: AgrochemicalFormComponent },
  { path: 'seller/view-requests', component: SellerViewRequestsComponent },
  { path: 'seller/view-agrochemical', component: ViewAgrochemicalComponent },
  { path: '**', redirectTo: 'error-page' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
