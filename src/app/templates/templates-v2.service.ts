import { Injectable } from '@angular/core';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { CustomValidators } from '@app/core/classes/custom-validations';
import { RootV2Service } from '@app/core/root.service-v2';
import { SharedService } from '@app/shared/services/shared.service';
import { ApiRequestV2Service } from '@app/core/http/api-request-v2.service';

@Injectable({
	providedIn: 'root'
})
export class TemplatesV2Service extends RootV2Service {
	constructor(router: Router, api: ApiRequestV2Service, shared: SharedService) {
		super(router, api, shared);
	}

	routerPrefix(val: string = '') {
		return val ? val : 'templates';
	}

	get featureProps(): ItemProps[] {
		return [];
	}
}
