import { Injectable } from '@angular/core';
import { RootService } from '@app/core/root.service';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { CustomValidators } from '@app/core/classes/custom-validations';

@Injectable({
	providedIn: 'root'
})
export class EmployeesService extends RootService {
	constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
		super(toast, router, api);
		this.lists = {
			...this.lists,
			['employees-groups']: [],
			['employees-categories']: [],
			status: [
				{ id: 'active', name: 'active' },
				{ id: 'inactive', name: 'inactive' }
			]
		};
	}

	routerPrefix(val: string = '') {
		return val ? val : 'employees';
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
				width: 300
			},
			{
				name: 'signature',
				prop: 'signature',
				listing: false,
				formField: true,
				displayType: 'image',
				formFieldType: 'file_input',
				required: true,
				width: 300
			},
			{
				name: 'username',
				prop: 'username',
				listing: false,
				formField: true,
				formFieldType: 'text',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true
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
				name: 'nationalId',
				prop: 'nationalId',
				listing: false,
				formField: true,
				formFieldType: 'text',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true
			},
			{
				name: 'address',
				prop: 'address',
				listing: false,
				formField: true,
				formFieldType: 'text',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true
			},
			{
				name: 'group_id',
				prop: 'group.name',
				listing: true,
				formField: true,
				formFieldType: 'select',
				listPrefix: 'employees-groups',
				required: true,
				width: 300,
				validations: [Validators.required],
				searchable: true
			},
			{
				name: 'category_id',
				prop: 'category.name',
				listing: false,
				formField: true,
				formFieldType: 'select',
				listPrefix: 'employees-categories',
				required: true,
				width: 300,
				validations: [Validators.required]
			},
			{
				name: 'active_status',
				prop: 'active_status',
				listing: false,
				formField: true,
				formFieldType: 'select',
				listPrefix: 'status',
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
			},
			{
				name: 'password',
				prop: 'password',
				listing: false,
				formField: true,
				formFieldType: 'password',
				required: true,
				validations: [Validators.required, CustomValidators.validPassword]
			}
		];
	}
}
