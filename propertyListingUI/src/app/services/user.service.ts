import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor() { }

  //Function to add a new User
  addUser(user : User){
    let users = [];
    //if local storage already has users in it
    if(localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users') as string);
      users = [user, ...users];
    } 
    else{
      users = [user];
    }
   
    // users.push(user);
    localStorage.setItem('Users',JSON.stringify(users));
  }

}
