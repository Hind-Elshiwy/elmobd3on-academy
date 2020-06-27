import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import { AdminServisesComponent } from '../admin/admin-servises/admin-servises.component';
import { AuthGuard } from '../_guards/auth.guard';

export  const routes: Routes = [
    { path: '', component: AdminServisesComponent, canActivate: [AuthGuard]   }, 
    { path: 'login', component: LoginComponent },
];

@NgModule({
    exports: [ RouterModule ],
    imports: [RouterModule.forChild(routes),
    ]
})

export class AuthenticationRoutingModule { }