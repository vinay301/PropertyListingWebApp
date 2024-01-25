import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Property } from 'src/app/models/property';
import { PropertyService } from 'src/app/services/property.service';


// @Injectable({
//   providedIn: 'root'
// })

export const PropertyDetailResolverService: ResolveFn<Property> = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
  const router = inject(Router);
  const propertyService = inject(PropertyService);

  return propertyService.getProperty(Number(route.params['id'])).pipe(
    catchError(error => {
      console.error(`Resolver has error ${error}, redirecting to home page`);
      router.navigate(['/']);
      return EMPTY;
    })
  );
};



