import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

authUser(user : any){
let userArray = [];

// let userArray : Array<any>;
//Check if the user is present in the local storage --> 'Users' is the key name
  if(localStorage.getItem('Users'))
  {
    userArray = JSON.parse(localStorage.getItem('Users') as string);
  }
  //user.userName --> it refers to the userName which is stored in the local storage at the time of registration
  return userArray.find((p: { username: any; password: any; }) => p.username === user.userName && p.password === user.password);
}

}
