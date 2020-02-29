import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { OurServicesComponent } from './our-services/our-services.component';
import { MatInputModule,MatIconModule, MatAutocompleteModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatButtonModule } from '@angular/material';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { LoginComponent } from './authentication/component/login/login.component';
import { AdminServisesComponent } from './admin/admin-servises/admin-servises.component';
import { AdminGuestsComponent } from './admin-guests/admin-guests.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OurServicesComponent,
    PageNotFoundComponent,
    AdminGuestsComponent,
    AdminOrdersComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxTypedJsModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule, 
    MatAutocompleteModule,
    MatButtonModule,
    MatFileUploadModule,
    MatTableModule,
    MatPaginatorModule,
    UploaderModule,
    CheckBoxModule,
    DialogModule,
    DropDownListModule,
    CommonModule,
    MaterialFileInputModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [],
  exports:[
    MatInputModule,
    MatAutocompleteModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
