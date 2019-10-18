import {Component, OnInit} from '@angular/core';
import {CoreListComponent} from '@app/core/components/core-list/core-list.component';
import {UtilitiesService} from '@app/shared/services/utilities.service';
import {Router} from '@angular/router';
import {FormsService} from '@app/forms/forms.service';

@Component({
	selector: 'app-branches-list',
	templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class FormsListComponent extends CoreListComponent implements OnInit {
	constructor(service: FormsService, us: UtilitiesService, router: Router) {
		super(service, us, router);
		this.listOptions.searchable = true;
		this.listOptions.listTypes = ['All', 'Link Driver', 'Not Linked'];
	}

	ngOnInit() {
		return super.ngOnInit();
	}
}
