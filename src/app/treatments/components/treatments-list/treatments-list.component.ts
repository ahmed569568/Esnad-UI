import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { TreatmentsService } from '@app/treatments/treatments.service';

@Component({
	selector: 'app-treatments-list',
	templateUrl: 'treatments-list-component.html'
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
		this.listOptions.listTypes = ['All', 'Link Driver', 'Not Linked'];
	}

	ngOnInit() {
		return super.ngOnInit();
	}

	doAction(data: any) {
		switch (data.actionType) {
			case 'resetList': {
				return this.loadResources();
			}
			case 'add': {
				return this.router.navigate([this.cid + '/create']);
			}
		}
	}
}
