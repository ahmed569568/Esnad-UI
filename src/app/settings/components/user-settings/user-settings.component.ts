import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { CredentialsService } from '@app/core';
import { MapService } from '@app/shared/services/map.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  imageSrc: string | ArrayBuffer;
  form: FormGroup;
  imageFieldName: any[] = [];
  userID: number;

  lat = 51.678418;
  lng = 7.809007;

  mapConfigs = {
    field: 'points',
    type: 'single',
    drawing: true,
    drawingType: 'Point'
  };

  constructor(
    private fb: FormBuilder,
    private api: ApiRequestService,
    private credentials: CredentialsService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.userID = this.credentials.credentials ? this.credentials.credentials.id : null;
    this.initForm();
    this.fetchAddress();
    this.loadResources(1);
  }

  fetchAddress() {
    this.mapService.getLocation.subscribe(data => {
      if (data.location) {
        this.form.controls.address.setValue(data.location.display_name);
        this.form.controls.lng.setValue(data.coords[0]);
        this.form.controls.lat.setValue(data.coords[1]);
      }
    });
  }

  /**
   * fetch single item data from service
   * and fill form with it in Edit forms
   */
  loadResources(id: number): void {
    this.api.get(`clientsetting/${id}/show`).subscribe(response => {
      const obj = JSON.parse(JSON.stringify(response.response)); // clone response object
      this.form.controls.address.setValue(obj.location.address);
      this.form.controls.location_id.setValue(obj.location.id);
      return this.form.patchValue(obj);
    });
  }

  initForm() {
    this.form = this.fb.group({
      school_name: ['', Validators.required],
      school_email: ['', Validators.required],
      website: ['', Validators.required],
      image: ['', Validators.required],
      phone: ['', Validators.required],
      address: [{ value: '', disabled: true }],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      location_id: ['']
    });
  }

  uploadPhoto(event: any, field: string) {
    this.imageFieldName.push(field);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.convertImage.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  convertImage(readerEvt: any) {
    const binaryString = readerEvt.target.result;
    return this.setImagesValue(btoa(binaryString));
  }

  setImagesValue(base64: string) {
    if (Object.keys(this.imageFieldName)) {
      this.imagePath(null, base64);
    }
    for (const fieldName of this.imageFieldName) {
      this.form.controls[fieldName].setValue(this.imagePath(fieldName, base64));
    }
  }

  imagePath(prefix: string, value: any, preview?: boolean) {
    if (value.length < 100) {
      return prefix + value;
    } else {
      if (preview) {
        return value;
      } else {
        return 'data:image/png;base64,' + value;
      }
    }
  }

  submit() {
    const form = {
      school_name: this.form.controls.school_name.value,
      school_email: this.form.controls.school_email.value,
      website: this.form.controls.website.value,
      image: this.form.controls.image.value,
      phone: this.form.controls.phone.value,
      location: {
        id: this.form.controls.location_id.value,
        address: this.form.controls.address.value,
        lat: this.form.controls.lat.value.toString(),
        lng: this.form.controls.lng.value.toString()
      }
    };
    this.api.put(`clientsetting/1/update`, form).subscribe(resp => console.log(resp));
  }
}
