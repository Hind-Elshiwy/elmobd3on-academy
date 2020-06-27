import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AuthenticationRoutingModule} from "./authentication.routing";
import {LoginComponent} from "./component/login/login.component";

import { AdminServisesComponent } from '../admin/admin-servises/admin-servises.component';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { AdminGuestsComponent } from '../admin/admin-guests/admin-guests.component';
import { MatPaginatorModule, MatTableModule, MatInputModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
    ],
    declarations: [
        LoginComponent,
        AdminServisesComponent,
        AdminOrdersComponent,
        AdminGuestsComponent
    ],
    providers: [],
    exports: []
})
export class AuthenticationModule { }
