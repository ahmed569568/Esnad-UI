import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent {
  @Input() form: FormGroup;
  // tslint:disable-next-line:no-output-native
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private _location: Location, private us: UtilitiesService) {}

  backClicked() {
    this._location.back();
  }
}
