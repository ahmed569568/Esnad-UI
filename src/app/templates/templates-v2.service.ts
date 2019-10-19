import { Injectable } from '@angular/core';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces-v2';
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
	stepsCount = 0;

	featureProps: ItemProps[] = [
		{
			name: 'name',
			prop: 'name',
			form: {
				Validators: [Validators.required],
				formFieldType: 'text'
			}
		},
		{
			name: 'client_id',
			prop: 'client_id',
			form: {
				Validators: [],
				formFieldType: 'ng_select',
				dataUrl: 'templates/clients/index',
				listPrefix: 'clients'
			}
		}
	];

	constructor(router: Router, api: ApiRequestV2Service, shared: SharedService) {
		super(router, api, shared);
	}

	routerPrefix(val: string = '') {
		return val ? val : 'templates';
	}

	refactorListsData(field: string, response: any) {
		if (response.response) {
			if (field === 'client_id') {
				if (response.response.length) {
					response.response.forEach((item: any) => {
						item.name = item.full_name;
					});
				}
			}
			return response.response;
		}
	}

	createStage() {
		const stageDefaultInputs = [
			{
				name: 'step-' + this.stepsCount + '-name',
				prop: 'step-' + this.stepsCount + '-name',
				form: {
					Validators: [Validators.required],
					formFieldType: 'text',
					groupBy: {
						tabGroup: {
							tabGroupName: 'step-' + this.stepsCount + '-name',
							tabName: 'step-' + this.stepsCount + '-name'
						}
					}
				}
			},
			{
				name: 'step-' + this.stepsCount + '-typeId',
				prop: 'step-' + this.stepsCount + '-typeId',
				form: {
					Validators: [Validators.required],
					formFieldType: 'ng_select',
					dataUrl: 'settings/vehicle-types',
					listPrefix: 'vehicle-types',
					groupBy: {
						tabGroup: {
							tabGroupName: 'step-' + this.stepsCount + '-name',
							tabName: 'step-' + this.stepsCount + '-name'
						}
					}
				}
			}
		];

		this.featureProps = [...this.featureProps, stageDefaultInputs];
	}
}
