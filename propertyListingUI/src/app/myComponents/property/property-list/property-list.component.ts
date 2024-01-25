import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ipropertybase } from 'src/app/models/Ipropertybase';
import { Property } from 'src/app/models/property';
import { PropertyService } from 'src/app/services/property.service';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  p: number = 1;
  itemsPerPage:number = 4;
 @Input() searchCity : string = "";
 @Input() sortByParam : string = "";
 @Input() sortDirection : string = "asc";
  //propertyArray: Array<any> = [];
  // propertyArray!: Array<any>;
  propertyArray !: Property[] ;
  constructor(private route : ActivatedRoute,private propertyService : PropertyService) {

  }
  sellRent = 1; //by default we will display the property is available for BUY
  ngOnInit(): void{
    if(this.route.snapshot.url.toString())
    {
      this.sellRent = 2; //it means we are on Rent Property url else we're on 
    }
    this.propertyService.getPropertyList(this.sellRent).subscribe(
      res=>{
         this.propertyArray = res;
        
         console.log(res);
          }
    )
    // this.http.get('data/propertyArray.json').subscribe(
    //   res=>{
    //     this.propertyArray = res;
    //     console.log(res);
    //   }
    // );
  }
  
}
