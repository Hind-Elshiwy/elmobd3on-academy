import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AuthenticationRoutingModule} from "./authentication.routing";
import {LoginComponent} from "./component/login/login.component";

import { AdminServisesComponent } from '../admin/admin-servises/admin-servises.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/_helpers/error.interceptor';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { AdminGuestsComponent } from '../admin/admin-guests/admin-guests.component';
import { MatPaginatorModule, MatTableModule, MatInputModule } from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';


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
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    exports: []
})
export class AuthenticationModule { }
