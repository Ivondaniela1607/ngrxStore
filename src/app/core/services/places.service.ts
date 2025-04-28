import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, City, Place } from '../../model/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  readonly http = inject(HttpClient);

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>('assets/JSON/category.json');
  }
    
  getCities():Observable<City[]> {    
    return this.http.get<City[]>('assets/JSON/cities.json');
  }

  getPlaces():Observable<Place[]> {
    return this.http.get<Place[]>('assets/JSON/places.json');
  }

  savePlace() {
    const res = {
      mesgage: 'Place saved',
      id_place: Math.floor(Math.random() * 100),
    }
    return of(res);
  }

  updatePlace() {
    const res = {
      mesgage: 'Place updated',
    }
    return of(res);
  }
    
  deletePlace() {
    const res = {
      mesgage: 'Place deleted',
    }
    return of(res);
  }
}
