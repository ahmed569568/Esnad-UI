import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { TemplatesService } from '@app/templates/templates.service';

@Component({
	selector: 'app-templates-list',
	templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class TemplatesListComponent extends CoreListComponent
	implements OnInit {
	constructor(service: TemplatesService, us: UtilitiesService, router: Router) {
		super(service, us, router);
		this.listOptions.searchable = true;
	}

	ngOnInit() {
		return super.ngOnInit();
	}
}
