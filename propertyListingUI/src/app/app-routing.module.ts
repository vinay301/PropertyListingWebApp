import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './myComponents/nav-bar/nav-bar.component';
import { AddPropertyComponent } from './myComponents/property/add-property/add-property.component';
import { PropertyDetailsComponent } from './myComponents/property/property-details/property-details.component';
import { PagenotfoundComponent } from './myComponents/pagenotfound/pagenotfound.component';
import { PropertyListComponent } from './myComponents/property/property-list/property-list.component';
import { UserLoginComponent } from './myComponents/users/user-login/user-login.component';
import { UserRegisterComponent } from './myComponents/users/user-register/user-register.component';
import { PropertyDetailResolverService } from './myComponents/property/property-details/property-detail-resolver.service';

const routes: Routes = [
  {
    path:'',
    component:NavBarComponent
  },
  {
    path:'rent-property',
    component:PropertyListComponent
  },
  {
    path:'add-property',
    component:AddPropertyComponent
  },
  {
    path:'property-details/:id',
    component:PropertyDetailsComponent,
    resolve: {prp : PropertyDetailResolverService}
  },
  {
    path:'user/login',
    component:UserLoginComponent
  },
  {
    path:'user/register',
    component:UserRegisterComponent
  },
  {
    path:'**',
    component:PagenotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
