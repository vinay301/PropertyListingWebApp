import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

//altertify function for success toastr
success(message : string){
  alertify.success(message);
}

//altertify function for error toastr
error(message : string){
  alertify.error(message);
}

//altertify function for warning toastr
warning(message : string){
  alertify.warning(message);
}

}
