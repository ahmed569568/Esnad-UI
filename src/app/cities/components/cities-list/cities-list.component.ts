import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { CitiesService } from '@app/cities/cities.service';

@Component({
	selector: 'app-branches-list',
	templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class CitiesListComponent extends CoreListComponent implements OnInit {
	constructor(
		service: CitiesService,
		public us: UtilitiesService,
		router: Router
	) {
		super(service, us, router);
		this.listOptions.searchable = true;
		this.listOptions.listTypes = ['All', 'Link Driver', 'Not Linked'];
	}

	ngOnInit() {
		// this.us.filterObservable$.subscribe((filters: any) => {
		// 	if (filters) {
		// 		if (filters.level) {
		// 			if (filters.level === 5 || filters.level === 1) {
		// 				this.service.lists = {...this.service.lists, ['cities-parents']: []};
		// 				return;
		// 			}
		// 			this.service.showItem(filters.level - 1, 'select').pipe(map(resp => {
		// 				return resp[0];
		// 			})).subscribe(data => {
		// 				this.service.lists = {...this.service.lists, ['cities-parents']: data};
		// 			});
		// 		}
		// 	}
		// });

		return super.ngOnInit();
	}
}
