import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Ipropertybase } from 'src/app/models/Ipropertybase';
import { Property } from 'src/app/models/property';
import { PropertyService } from 'src/app/services/property.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm : NgForm | undefined;
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  //reactive form to add new property
  addPropertyForm : FormGroup;

  //flag to check while click on next, all the fields are valid or not
  nextClicked : boolean;

  //object of class Property
  property = new Property();

  propertyTypes : Array<string> = ['House','Apartment','Commercial','Duplex'];
  furnishTypes : Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  mainEnterance : Array<string> = ['East','West','North','South'];

  propertyView : Ipropertybase = {
    id:null,
    sellRent:null,
    name:'',
    furnishType:'',
    propType : '',
    price:null,
    bhk : null,
    builtArea : null,
    city : '',
    RTM : null,

  }
  constructor(private fb : FormBuilder, private router : Router, private propertyService : PropertyService, private alertify : AlertifyService) { }

  ngOnInit() {
    this.createAddPropertyForm();
  }

  createAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      basicInfo:this.fb.group({
        //by default, sellRent is at 'sell' by setting its value to 1
        sellRent : ['1', Validators.required],
        propType : [null,Validators.required],
        furnishType : [null,Validators.required],
        name : [null,Validators.required],
        bhk : [null,Validators.required],
        city : [null,Validators.required]
       
      }),
      priceInfo:this.fb.group({
        price : [null,Validators.required],
        builtArea : [null,Validators.required],
        carpetArea: [null],
        security: [null],
        maintenance: [null],
      }),
      addressInfo: this.fb.group({
        floor: [null],
        totalFloor: [null],
        address: [null, Validators.required],
        landmark: [null],
      }),
      otherInfo: this.fb.group({
        RTM: [null, Validators.required],
        possessionOn: [null],
        AOP: [null],
        gated: [null],
        mainEntrance: [null],
        description: [null]
      })
      
    });
  }

  selectTab(tabId: number, isCurrentTabValid : boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  onBack(){
    //we just want to pass base url to navigate, while clicking on back
    this.router.navigate(['/']);
  }

  onSave(){
   
    this.nextClicked = true;
    
    if(this.allTabsValid())
    {
      this.mapProperty();
      this.propertyService.addProperty(this.property);
      this.alertify.success("Property Added Successfully");
      console.log('sellRent=' + this.addPropertyForm.value.basicInfo.sellRent)
      //    console.log("form value", Form);
      //console.log(Form);
      console.log(this.addPropertyForm);

        if(this.sellRent.value==='2')
        {
           //if property is for rent, then after adding property redirect to rent-property page
          this.router.navigate(['/rent-property'])
        }
        else{
          //if property is for sell, then after adding property redirect to homepage
          this.router.navigate(['/'])
        }
      }
      else{
        this.alertify.error("Please fill all the fields correctly!");
      }
  }

  mapProperty() : void{
    this.property.id = this.propertyService.newPropertyId();
    this.property.sellRent = +this.sellRent.value;
    this.property.bhk = this.bhk.value;
    this.property.propType = this.propType.value;
    this.property.name = this.name.value;
    this.property.city = this.city.value;
    this.property.furnishType = this.furnishType.value;
    this.property.price = this.price.value;
    this.property.security = this.security.value;
    this.property.maintenance = this.maintenance.value;
    this.property.builtArea = this.builtArea.value;
    this.property.carpetArea = this.carpetArea.value;
    this.property.floorNo = this.floor.value;
    this.property.totalFloor = this.totalFloor.value;
    this.property.address = this.address.value;
    this.property.address2 = this.landmark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.gated = this.gated.value;
    this.property.mainEntrance = this.mainEntrance.value;
    this.property.possessionOn = this.possessionOn.value;
    this.property.description = this.description.value;
    this.property.postedOn = new Date().toString();
  }

  allTabsValid() : boolean
  {
     // if someone directly jump over save button without entering any field, then throw the errors and redirect to the required tabs
    if(this.basicInfo.invalid)
    {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if(this.priceInfo.invalid)
    {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if(this.addressInfo.invalid)
    {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if(this.otherInfo.invalid)
    {
      this.formTabs.tabs[3].active = true;
      return false;
    }

    return true;
  }

  //Getter Methods 
  // #region -> <FormGroups>
  get basicInfo(){
    return this.addPropertyForm.controls['basicInfo'] as FormGroup;
  }

  get priceInfo(){
    return this.addPropertyForm.controls['priceInfo'] as FormGroup;
  }

  get addressInfo(){
    return this.addPropertyForm.controls['addressInfo'] as FormGroup;
  }

  get otherInfo(){
    return this.addPropertyForm.controls['otherInfo'] as FormGroup;
  }

  //#region -> <FormControls>
  get sellRent(){
    return this.basicInfo.controls['sellRent'] as FormControl;
  }

  get bhk(){
    return this.basicInfo.controls['bhk'] as FormControl;
  }  

  get propType(){
    return this.basicInfo.controls['propType'] as FormControl;
  }

  get furnishType(){
    return this.basicInfo.controls['furnishType'] as FormControl;
  }

  get name(){
    return this.basicInfo.controls['name'] as FormControl;
  }

  get city(){
    return this.basicInfo.controls['city'] as FormControl;
  }

  get price(){
    return this.priceInfo.controls['price'] as FormControl;
  }

  get builtArea(){
    return this.priceInfo.controls['builtArea'] as FormControl;
  }

  get carpetArea(){
    return this.priceInfo.controls['carpetArea'] as FormControl;
  }

  get security(){
    return this.priceInfo.controls['security'] as FormControl;
  }

  get maintenance(){
    return this.priceInfo.controls['maintenance'] as FormControl;
  }

  get floor(){
    return this.addressInfo.controls['floor'] as FormControl;
  }

  get totalFloor(){
    return this.addressInfo.controls['totalFloor'] as FormControl;
  }

  get address(){
    return this.addressInfo.controls['address'] as FormControl;
  }

  get landmark(){
    return this.addressInfo.controls['landmark'] as FormControl;
  }

  get RTM(){
    return this.otherInfo.controls['RTM'] as FormControl;
  }
  get possessionOn(){
    return this.otherInfo.controls['possessionOn'] as FormControl;
  }
  get AOP(){
    return this.otherInfo.controls['AOP'] as FormControl;
  }
  get gated(){
    return this.otherInfo.controls['gated'] as FormControl;
  }
  get mainEntrance(){
    return this.otherInfo.controls['mainEntrance'] as FormControl;
  }
  get description(){
    return this.otherInfo.controls['description'] as FormControl;
  }

}
