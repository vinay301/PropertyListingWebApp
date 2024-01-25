import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient)  { }

  // getProperty(id : number){
  //   return this.getPropertyList().pipe(
  //     map(propertiesArray => {
  //       return propertiesArray.find(p=>p.id === id) as Property
  //     })
  //   );
  // }

  getProperty(id: number) {
    return this.getPropertyList().pipe(
      tap(() => {
        // throw new Error(`Network out`)
      }),
      map(propertiesArray => {
        let result = propertiesArray.find(p => p.id === id);
        if(result !== undefined) {
          return result
        }
        throw new Error(`Id ${id} not found`);
      })
    );
  }

  getPropertyList(sellRent ?: number) : Observable<Property[]>{
    return this.http.get('data/propertyArray.json').pipe(
      map(data => {
        const propertyArr : Array<Property> = [];
        const localStorageProperties = JSON.parse(localStorage.getItem('newProperty') || '{}');
        if(localStorageProperties)
        {
          for (const id in localStorageProperties)
          {
            if(sellRent){
              if(localStorageProperties.hasOwnProperty(id) && localStorageProperties[id].sellRent === sellRent)
              {
                propertyArr.push(localStorageProperties[id]);
              }
            }
            else{
              propertyArr.push(localStorageProperties[id]);
            }
          }
        }

        for (const id in data)
        {
          if(sellRent){
            if(data.hasOwnProperty(id) && data[id].sellRent === sellRent)
            {
              propertyArr.push(data[id]);
            // propertyArr.push(data[id as keyof object]);
            }
          }
          else{
            propertyArr.push(data[id]);
          }
        }
        return propertyArr;
      })
    );
  }

  // getPropertyList(sellRent:number): Observable<Iproperty[]> {
  //   return this.http.get('data/propertyArray.json').pipe(
  //     map(data => {
  //       const propertiesArray: Array<Iproperty> = [];
  //       for (const id in data) {
  //         if (data.hasOwnProperty(id) && data[id as keyof object]['SellRent'] === sellRent) {
  //           propertiesArray.push(data[id as keyof object]);
  //         }
  //       }
  //       return propertiesArray;
  //     })
  //   )
  // }

  addProperty(property : Property){
    let newProp = [property];

    //add new property in array if newProperty already exists in local storage
    if(localStorage.getItem('newProperty'))
    {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProperty'))]
    }
    localStorage.setItem('newProperty',JSON.stringify(newProp));
  }

  newPropertyId(){
    if(localStorage.getItem('PID'))
    {
      localStorage.setItem('PID',String(+localStorage.getItem('PID')+1));
      return +localStorage.getItem('PID');
    }
    else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }

}
