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
export class TemplatesService extends RootService {
	constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
		super(toast, router, api);
	}

	routerPrefix(val: string = '') {
		return val ? val : 'templates';
	}

	get featureProps(): ItemProps[] {
		return [
			{
				name: 'name',
				prop: 'name',
				listing: true,
				formField: false
			},
			{
				name: 'full_name',
				prop: 'client.full_name',
				listing: false,
				formField: false
			}
		];
	}
}
