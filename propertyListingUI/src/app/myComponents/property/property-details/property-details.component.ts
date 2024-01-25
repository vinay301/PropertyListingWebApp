import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Property } from 'src/app/models/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  property = new Property();
  public propertyId!: number;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route : ActivatedRoute, private router : Router, private propertyService : PropertyService) { }
 
  ngOnInit() {
    //this always returns value as a string, so we need to convert it into number
    //by using type casting Number()
    //another method is to use + operator
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data : any) => {
        this.property = data['prp'];
      },
      
      
    );
    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id'];
    //     this.propertyService.getProperty(this.propertyId).subscribe(
    //       (res : Property) => {
    //         this.property = res
    //       }
    //     )
    //   }
    // )

    this.galleryOptions = [
      {
        width: '550px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/prop1.jpg',
        medium: 'assets/images/prop1.jpg',
        big: 'assets/images/prop1.jpg'
      },
      {
        small: 'assets/images/prop1.jpg',
        medium: 'assets/images/prop1.jpg',
        big: 'assets/images/prop1.jpg'
      },
      {
        small: 'assets/images/prop1.jpg',
        medium: 'assets/images/prop1.jpg',
        big: 'assets/images/prop1.jpg'
      },
      {
        small: 'assets/images/prop1.jpg',
        medium: 'assets/images/prop1.jpg',
        big: 'assets/images/prop1.jpg'
      },
    ];
  }
  

  onSelectNext(){
    this.propertyId += 1;
    this.router.navigate(['property-details',this.propertyId])
  }
}
