import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

 registrationForm !: FormGroup;
 user !: User;
//  user : any = {};
 userSubmitted !: boolean;
  constructor(private fb : FormBuilder, private userService : UserService, private alertify : AlertifyService) {}
  ngOnInit(){
    // this.registrationForm = new FormGroup({
    //   userName : new FormControl(null,Validators.required),
    //   email : new FormControl(null,[Validators.required,Validators.email]),
    //   phoneNumber : new FormControl(null,[Validators.required,Validators.maxLength(10)]),
    //   password : new  FormControl ( null,[Validators.required,Validators.minLength(8)]),
    //   confirmPassword : new FormControl(null,[Validators.required])
    // },this.passwordMatchingValidator);
    this.createRegistrationForm();
  }

  createRegistrationForm () {
    this.registrationForm = this.fb.group({
      userName : [null, Validators.required],
      email : [null,[Validators.required,Validators.email]],
      phoneNumber : [null,[Validators.required,Validators.maxLength(10)]],
      password : [null,[Validators.required,Validators.minLength(8)]],
      confirmPassword :[null, [Validators.required]]
      
    },{Validators : this.passwordMatchingValidator});
  }

  // cross-field validators --> they are custom validators, which validates two fields and returns a validators
  passwordMatchingValidator(fc : AbstractControl) : ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : {'mismatch': true}
  };

  //Getter method for all form controls

  // getter method --> Getter methods are a powerful tool for writing clean and maintainable code. 
  // They can be used to encapsulate the implementation of complex logic, making the code more readable and reusable.
  //we cannot have any argument int it and it must return some value
  get userName () {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email () {
    return this.registrationForm.get('email') as FormControl;
  }

  get phoneNumber () {
    return this.registrationForm.get('phoneNumber')as FormControl ;
  }

  get password () {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword () {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
 

  //Function handling on click to register request
  onRegister(){
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    //if the form is valid, i.e it doesn't contain any null value then only add a new user
    if(this.registrationForm.valid)
    {
      // this.user = Object.assign(this.user,this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('Successfully Registered');
    }
    else{
      this.alertify.error('Please fill out correctly');
    }
  }

  userData() : User {
    return this.user = {
      // this.userName --> it is the getter method, same with other fields
      userName : this.userName.value,
      email : this.email.value,
      phoneNumber: this.phoneNumber.value,
      password : this.password.value,

    }
  }

  

}
