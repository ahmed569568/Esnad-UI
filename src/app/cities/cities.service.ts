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
		this.lists = {
			...this.lists,
			['cities-types']: [
				{
					id: 1,
					name: 'city'
				},
				{
					id: 2,
					name: 'region'
				},
				{
					id: 3,
					name: 'province'
				},
				{
					id: 4,
					name: 'district'
				},
				{
					id: 5,
					name: 'street'
				}
			]
		};
	}

	routerPrefix(val: string = '') {
		return val ? val : 'cities';
	}

	get featureProps(): ItemProps[] {
		return [
			{
				name: 'level',
				prop: 'level',
				listing: false,
				formField: true,
				formFieldType: 'select',
				listPrefix: 'cities-types',
				searchable: true,
				escapedField: 'parent_id',
				translate: true
			},
			{
				name: 'parent_id',
				prop: 'parent_id',
				listing: false,
				formField: true,
				formFieldType: 'select',
				listPrefix: 'cities-parents',
				searchable: true
			},
			{
				name: 'name',
				prop: 'name',
				listing: true,
				formField: true,
				searchable: true,
				formFieldType: 'text'
			}
		];
	}
}
