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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './components/auth.guard';
import { Auth1Guard } from './auth1.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error-page', component: ErrorPageComponent },
  {path:'page-not-found',component:PageNotFoundComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password/:reset-token',component:ResetPasswordComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'farmer/home-page', component: HomePageComponent, canActivate:[AuthGuard] },
  { path: 'farmer/crop-form', component: CropFormComponent, canActivate:[AuthGuard] },
  { path: 'farmer/crop-form/:id', component: CropFormComponent, canActivate:[AuthGuard] },
  { path: 'farmer/view-crop', component: ViewCropComponent, canActivate:[AuthGuard] },
  { path: 'farmer/my-requests', component: FarmerMyRequestsComponent, canActivate:[AuthGuard] },
  { path: 'farmer/view-agrochemical', component: FarmerViewAgrochemicalComponent, canActivate:[AuthGuard] },
  
  { path: 'seller/home-page', component: HomePageComponent, canActivate:[Auth1Guard] },
  { path: 'seller/agrochemical-form', component: AgrochemicalFormComponent, canActivate:[Auth1Guard] },
  { path: 'seller/agrochemical-form/:id', component: AgrochemicalFormComponent, canActivate:[Auth1Guard] },
  { path: 'seller/view-requests', component: SellerViewRequestsComponent, canActivate:[Auth1Guard] },
  { path: 'seller/view-agrochemical', component: ViewAgrochemicalComponent, canActivate:[Auth1Guard] },

  { path: '**', redirectTo: 'page-not-found' },

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
