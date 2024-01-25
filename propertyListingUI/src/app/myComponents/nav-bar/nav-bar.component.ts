import { Component, Input } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  loggedinUser !: String | null;
  today = new Date();
  city = '';
  searchCity = '';
  sortByParam = '';
  sortDirection = 'asc';
constructor(private alertify : AlertifyService) {}
  ngOnInit(){
    
  }

  loggedIn(){
    //if the user is loggedin it will return some value as token otherwise undefined
    // return localStorage.getItem('token');
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }
  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success("You have been successfully loged out");
  }

  onCityFilter(){
    this.searchCity = this.city;
  }

  onCityFilterClear(){
    this.searchCity = '';
    this.city = '';
  }

  onSortDirection(){
    if(this.sortDirection === 'desc')
    {
      this.sortDirection = 'asc';
    }
    else{
      this.sortDirection = 'desc';
    }
  }
}
