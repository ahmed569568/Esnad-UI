import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  _mapCenter: any;
  mapCenter$: BehaviorSubject<any> = new BehaviorSubject<any>(this._mapCenter);
  getLocation: Subject<any> = new Subject();
  drawShape: BehaviorSubject<any> = new BehaviorSubject<any>({});
  // searchResults = [];

  constructor() {}

  reverseGeocode(coords: any) {
    return fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      })
      .then(location => {
        this.getLocation.next({ location, coords });
      });
  }

  // addAddressControl(value) {
  //     const geoCoder = new google.maps.Geocoder();
  //     geoCoder.geocode({address: value}, (results, status) => {
  //         if (status === 'OK') {
  //             this.searchResults = results;
  //         } else if (status === 'ZERO_RESULTS') {
  //             return this.service.presentToast(this.translate.instant('msg.' + status), 'danger');
  //         }
  //     });
  // }

  locate(coords: any) {
    this.mapCenter$.next(coords);
  }

  draw(shape: any) {
    this.drawShape.next(shape);
  }
}
