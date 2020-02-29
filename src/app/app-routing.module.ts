import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './authentication/component/login/login.component';
import { AdminServisesComponent } from './admin/admin-servises/admin-servises.component';
import { AdminGuestsComponent } from './admin/admin-guests/admin-guests.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
// import { AuthGuard } from './_guards';

export  const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch: 'full' },
  { path:'home',component:HomeComponent},
  { path:'details',component:OurServicesComponent},
  // { path:'admin/guests',component:AdminGuestsComponent},
  // { path:'admin/orders',component:AdminOrdersComponent},
  { path: 'admin', loadChildren: './authentication/authentication.module#AuthenticationModule' },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
