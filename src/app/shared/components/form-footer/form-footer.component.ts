import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { RootService } from '@app/core/root.service';

@Component({
	selector: 'app-form-footer',
	templateUrl: './form-footer.component.html',
	styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent {
	@Input() form: FormGroup;
	@Input() service: RootService;
	@Output() submit: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private router: Router,
		private _location: Location,
		private us: UtilitiesService
	) {}

	backClicked() {
		console.log('back clicked');
		return this.service.navigateToList();
		// this._location.back();
	}
}
