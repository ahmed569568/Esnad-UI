import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { TreatmentsService } from '@app/treatments/treatments.service';

@Component({
	selector: 'app-treatments-list',
	templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class TreatmentsListComponent extends CoreListComponent
	implements OnInit {
	constructor(
		service: TreatmentsService,
		us: UtilitiesService,
		router: Router
	) {
		super(service, us, router);
		this.listOptions.searchable = true;
	}

	ngOnInit() {
		return super.ngOnInit();
	}
}
