import { Injectable } from '@angular/core';
import { RootService } from '@app/core/root.service';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class ClientsService extends RootService {
	constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
		super(toast, router, api);
		this.lists = {
			...this.lists,
			['clients-price']: []
		};
	}

	routerPrefix(val: string = '') {
		return val ? val : 'clients';
	}

	get featureProps(): ItemProps[] {
		return [
			{
				name: 'photo',
				prop: 'photo',
				listing: true,
				formField: true,
				displayType: 'image',
				formFieldType: 'file_input',
				required: true,
				width: 300,
				validations: [Validators.required]
			},
			{
				name: 'full_name',
				prop: 'full_name',
				listing: true,
				formField: true,
				formFieldType: 'text',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true
			},
			{
				name: 'phone',
				prop: 'phone',
				listing: true,
				formField: true,
				formFieldType: 'phone',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true
			},
			{
				name: 'email',
				prop: 'email',
				listing: true,
				formField: true,
				formFieldType: 'email',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true
			}
		];
	}
}
