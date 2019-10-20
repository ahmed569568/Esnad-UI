import {Injectable} from '@angular/core';
import {RootService} from '@app/core/root.service';
import {ApiRequestService} from '@app/core/http/api-request.service';
import {ItemProps} from '@app/interfaces';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Validators} from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class TreatmentsService extends RootService {
	constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
		super(toast, router, api);
	}

	routerPrefix(val: string = '') {
		return val ? val : 'treatments';
	}

	get featureProps(): ItemProps[] {
		return [
			{
				name: 'name',
				prop: 'template.name',
				listing: true,
				formField: true,
				formFieldType: 'text',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true

			},
			{
				name: 'status',
				prop: 'status',
				listing: true,
				formField: true,
				formFieldType: 'text',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true

			},
			{
				name: 'client',
				prop: 'client',
				listing: true,
				formField: true,
				formFieldType: 'text',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true

			}
		];
	}
}
