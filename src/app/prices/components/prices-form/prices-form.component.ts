import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreFormComponent} from '@app/core/components/core-form/core-form.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UtilitiesService} from '@app/shared/services/utilities.service';
import {PricesService} from '@app/prices/prices.service';

@Component({
	selector: 'app-drivers-form',
	templateUrl: '../../../core/components/core-form/core-form.component.html'
})
export class PricesFormComponent extends CoreFormComponent implements OnInit, OnDestroy {
	constructor(
		service: PricesService,
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
