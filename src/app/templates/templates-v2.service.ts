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
	stepsCount = 1;
	stepsNames: string[] = [];

	InputsTree: {
		steps?: {
			name: string;
			forms?: {
				name: string;
				inputs?: string[];
			}[];
		}[];
	} = {
		steps: []
	};

	featureProps: ItemProps[] = [
		{
			name: 'name',
			prop: 'name',
			form: {
				Validators: [Validators.required],
				formFieldType: 'text',
				grid: {
					lg: '30%',
					md: '50%',
					sm: '100%'
				}
			}
		},
		{
			name: 'client_id',
			prop: 'client_id',
			form: {
				Validators: [],
				formFieldType: 'ng_select',
				dataUrl: 'templates/clients/index',
				listPrefix: 'clients',
				grid: {
					lg: '30%',
					md: '50%',
					sm: '100%'
				}
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

	addStep() {
		const stageDefaultInputs: ItemProps[] = [
			{
				name: 'step_' + this.stepsCount + '_name',
				prop: 'step_' + this.stepsCount + '_name',
				form: {
					name: 'step_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					groupBy: {
						tabGroup: {
							tabGroupName: 'step_' + this.stepsCount,
							tabName: 'form_' + this.stepsCount
						}
					},
					grid: {
						lg: '30%',
						md: '50%',
						sm: '100%'
					}
				}
			},
			{
				name: 'step_' + this.stepsCount + '_typeId',
				prop: 'step_' + this.stepsCount + '_typeId',
				form: {
					name: 'step_typeId',
					Validators: [Validators.required],
					formFieldType: 'ng_select',
					dataUrl: 'templates/groups/index',
					listPrefix: 'groups',
					groupBy: {
						tabGroup: {
							tabGroupName: 'step_' + this.stepsCount,
							tabName: 'form_' + this.stepsCount
						}
					},
					grid: {
						lg: '30%',
						md: '50%',
						sm: '100%'
					}
				}
			}
		];

		this.InputsTree.steps.push({
			name: 'step_' + this.stepsCount,
			forms: []
		});

		this.featureProps = [...this.featureProps, ...stageDefaultInputs];
		this.stepsCount++;

		console.log(this.featureProps);
	}

	addForm(stepNumber: number) {
		const stepObj = this.InputsTree.steps.find(
			value => value.name === 'step_' + stepNumber
		);
		const formsLength = stepObj.forms.length;
		stepObj.forms.push({
			name: 'form_' + (formsLength + 1),
			inputs: []
		});
		const formNumber = formsLength + 1;

		const stageDefaultInputs: ItemProps[] = [
			{
				name: 'step_' + stepNumber + '_form_' + formNumber + '_name',
				prop: 'step_' + stepNumber + '_form_' + formNumber + '_name',
				form: {
					name: 'form_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					groupBy: {
						tabGroup: {
							tabGroupName: 'step_' + stepNumber,
							tabName: 'form_' + stepNumber
						},
						section: 'form_' + formNumber
					},
					grid: {
						lg: '30%',
						md: '50%',
						sm: '100%'
					}
				}
			}
		];

		this.featureProps = [...this.featureProps, ...stageDefaultInputs];
		// this.stepsCount++;
		console.log(this.featureProps);
	}
}
