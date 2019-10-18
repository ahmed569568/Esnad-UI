import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppHelper } from '../../../core/classes/app-helper';
import { MapService } from '../../services/map.service';
import { transform } from 'ol/proj';
import { takeWhile } from 'rxjs/operators';
import { ControlComponent, LayerComponent, OverlayComponent, ViewComponent } from 'ngx-openlayers';
import { RootService } from '../../../core/root.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('view', null) view: ViewComponent;
  @ViewChild('map', null) map: any;
  @ViewChild('source', null) source: any;
  @ViewChild('vectorLayer', null) layer: LayerComponent;
  @ViewChild('control', null) control: ControlComponent;
  @ViewChild('overlay', null) overlay: OverlayComponent;

  @Input() service: RootService;
  @Input() mapConfig: any;
  @Input() mapId: string;

  mapCenter = {
    lat: 24.542751,
    lng: 46.764078
  };
  zoom = 5;
  address: string;
  expandedResult: boolean;
  alive = true;

  constructor(private mapService: MapService) {}

  log(p: any) {
    console.log(p);
  }

  ngOnInit(): void {
    AppHelper.reSize.pipe(takeWhile(() => this.alive)).subscribe(() => {
      if (this.map) {
        this.map.instance.updateSize();
        this.fitView();
      }
    });
    this.mapService.mapCenter$.pipe(takeWhile(() => this.alive)).subscribe(coords => {
      if (coords) {
        this.zoom = 10;
        this.mapCenter = coords;
      }
    });
    this.mapService.drawShape.pipe(takeWhile(() => this.alive)).subscribe(() => {
      this.clearMap();
    });
  }

  ngOnChanges(): void {}

  // catchAddress() {
  //     this.mapService.addAddressControl(this.address);
  //     this.expandedResult = true;
  // }

  assignDate(data: any) {
    const latitude = data.geometry.location.lat();
    const longitude = data.geometry.location.lng();
    this.mapService.mapCenter$.next({
      lat: latitude,
      lng: longitude
    });
    this.mapService.getLocation.next({
      location: { display_name: data.formatted_address },
      coords: [longitude, latitude]
    });
  }

  catchShape(feature: any) {
    if (feature) {
      this.clearMap();
    }
    if (this.mapConfig.drawingType === 'Point') {
      const coords = transform(feature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
      return this.mapService.reverseGeocode(coords);
    } else if (this.mapConfig.drawingType === 'Polygon') {
      const coordinates = feature.getGeometry().getCoordinates()[0];
      const latLngArray = [];
      for (const coordinate of coordinates) {
        latLngArray.push(transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
      }
      this.mapService.draw(latLngArray);
    }
  }

  fitView() {
    if (this.source.instance) {
      const feature = this.source.instance.getFeatureById(this.mapId);
      if (feature) {
        const route = feature.getGeometry();
        this.view.instance.fit(route);
      }
    }
  }

  clearMap() {
    if (!this.layer.instance) {
      return;
    }
    const features = this.layer.instance.getSource().getFeatures();
    if (!features.length) {
      return;
    }
    features.forEach((feature: any, i: any) => {
      if (feature) {
        this.layer.instance.getSource().removeFeature(feature);
      }
    });
    this.source.instance.refresh();
  }

  ngOnDestroy() {
    this.zoom = 5;
    this.mapCenter = {
      lat: 24.542751,
      lng: 46.764078
    };
    this.alive = false;
  }
}
