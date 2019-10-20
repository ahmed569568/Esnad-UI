import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreFormComponent} from '@app/core/components/core-form/core-form.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UtilitiesService} from '@app/shared/services/utilities.service';
import {FormsService} from '@app/forms/forms.service';

@Component({
	selector: 'app-drivers-form',
	templateUrl: '../../../core/components/core-form/core-form.component.html'
})
export class FormsFormComponent extends CoreFormComponent implements OnInit, OnDestroy {
	constructor(
		service: FormsService,
		fb: FormBuilder,
		activatedRoute: ActivatedRoute,
		private utilities: UtilitiesService
	) {
		super(service, fb, activatedRoute, utilities);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
