import {Injectable} from '@angular/core';
import {RootService} from '@app/core/root.service';
import {ApiRequestService} from '@app/core/http/api-request.service';
import {ItemProps} from '@app/interfaces';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class RolesService extends RootService {
	constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
		super(toast, router, api);
	}

	routerPrefix(val: string = '') {
		return val ? val : 'roles';
	}

	get featureProps(): ItemProps[] {
		return [
			{
				name: 'roles',
				prop: 'roles',
				listing: false,
				formField: true,
				formFieldType: 'text',
				required: true
			},
			{
				name: 'group_id',
				prop: 'name',
				listing: true,
				formField: true,
				formFieldType: 'select',
				listPrefix: 'roles-groups',
				required: true
			}
		];
	}
}
