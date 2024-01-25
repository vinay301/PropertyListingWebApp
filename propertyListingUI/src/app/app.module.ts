import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { NavBarComponent } from './myComponents/nav-bar/nav-bar.component';
import { PropertyListComponent } from './myComponents/property/property-list/property-list.component';
import { PropertyCardComponent } from './myComponents/property/property-card/property-card.component';
import { PropertyService } from './services/property.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddPropertyComponent } from './myComponents/property/add-property/add-property.component';
import { PropertyDetailsComponent } from './myComponents/property/property-details/property-details.component';
import { PagenotfoundComponent } from './myComponents/pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './myComponents/users/user-login/user-login.component';
import { UserRegisterComponent } from './myComponents/users/user-register/user-register.component';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PropertyListComponent,
    PropertyCardComponent,
    AddPropertyComponent,
    PropertyDetailsComponent,
    PagenotfoundComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [
    PropertyService,
    UserService,
    AlertifyService,
    AuthService,
 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
