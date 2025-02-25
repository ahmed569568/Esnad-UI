import { Injectable } from '@angular/core';
import { RootService } from '@app/core/root.service';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class CitiesService extends RootService {
	constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
		super(toast, router, api);
	}

	routerPrefix(val: string = '') {
		return val ? val : 'cities';
	}

	get featureProps(): ItemProps[] {
		return [
			{
				name: 'name',
				prop: 'name',
				listing: true,
				formField: false,
				searchable: true,
				formFieldType: 'text'
			},
			{
				name: 'level',
				prop: 'level',
				listing: true,
				formField: false
			}
		];
	}
}
