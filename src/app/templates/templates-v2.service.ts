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

	InputsTree: {
		steps?: {
			name: string;
			forms?: {
				name: string;
				fields?: {
					name: string;
				}[];
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
					gt_lg: '30%',
					lt_xl: '30%',
					lt_lg: '30%',
					lt_md: '50%',
					lt_sm: '100%'
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
					gt_lg: '30%',
					lt_xl: '30%',
					lt_lg: '30%',
					lt_md: '50%',
					lt_sm: '100%'
				}
			}
		}
	];

	constructor(router: Router, api: ApiRequestV2Service, shared: SharedService) {
		super(router, api, shared);

		this.lists.fieldTypes = [
			{
				name: 'Text Input',
				id: 'text'
			},
			{
				name: 'Select Input',
				id: 'select'
			},
			{
				name: 'checkbox',
				id: 'checkbox'
			}
		];
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
		const stepFormName = `step_${this.stepsCount}_name`;
		const stepFormTypeId = `step_${this.stepsCount}_typeId`;

		const stepDefaultInputs: ItemProps[] = [
			{
				name: stepFormName,
				prop: stepFormName,
				form: {
					name: 'step_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					groupBy: {
						tabGroup: {
							tabGroupName: 'templateAccordion',
							tabName: 'step_' + this.stepsCount
						}
					},
					grid: {
						gt_lg: '30%',
						lt_xl: '30%',
						lt_lg: '30%',
						lt_md: '50%',
						lt_sm: '100%'
					}
				}
			},
			{
				name: stepFormTypeId,
				prop: stepFormTypeId,
				form: {
					name: 'step_typeId',
					Validators: [Validators.required],
					formFieldType: 'ng_select',
					dataUrl: 'templates/groups/index',
					listPrefix: 'groups',
					groupBy: {
						tabGroup: {
							tabGroupName: 'templateAccordion',
							tabName: 'step_' + this.stepsCount
						}
					},
					grid: {
						gt_lg: '30%',
						lt_xl: '30%',
						lt_lg: '30%',
						lt_md: '50%',
						lt_sm: '100%'
					}
				}
			}
		];

		this.InputsTree.steps.push({
			name: 'step_' + this.stepsCount,
			forms: []
		});

		this.featureProps = [...this.featureProps, ...stepDefaultInputs];
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
			fields: []
		});
		const formNumber = formsLength + 1;

		const formObj = stepObj.forms.find(
			value => value.name === 'form_' + formNumber
		);

		const fieldsLength = formObj.fields.length ? formObj.fields.length : 0;
		formObj.fields.push({
			name: 'field_' + (fieldsLength + 1)
		});

		const stepFormName = `step_${stepNumber}_form_${formNumber}_name`;

		const stepDefaultInputs: ItemProps[] = [
			{
				name: stepFormName,
				prop: stepFormName,
				form: {
					name: 'form_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					groupBy: {
						tabGroup: {
							tabGroupName: 'templateAccordion',
							tabName: 'step_' + stepNumber
						},
						section: 'form_' + formNumber
					},
					grid: {
						gt_lg: '30%',
						lt_xl: '30%',
						lt_lg: '30%',
						lt_md: '50%',
						lt_sm: '100%'
					},
					gridCssClass: 'breakLine-input30'
				}
			}
		];

		this.featureProps = [...this.featureProps, ...stepDefaultInputs];
		// this.stepsCount++;
		console.log(this.InputsTree);
	}

	addField(stepNumber: number, formNumber: number) {
		const stepObj = this.InputsTree.steps.find(
			value => value.name === 'step_' + stepNumber
		);

		const formObj = stepObj.forms.find(
			value => value.name === 'form_' + formNumber
		);

		const fieldsLength = formObj.fields.length;
		formObj.fields.push({
			name: 'field_' + (fieldsLength + 1)
		});
		const fieldNumber = fieldsLength + 1;

		const fieldName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_name`;
		const fieldTypeName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_fieldType`;
		const fieldOptionsName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_fieldOptions`;

		const stepDefaultInputs: ItemProps[] = [
			{
				name: fieldName,
				prop: fieldName,
				form: {
					name: 'field_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					groupBy: {
						tabGroup: {
							tabGroupName: 'templateAccordion',
							tabName: 'step_' + stepNumber
						},
						section: 'form_' + formNumber,
						formInputs: 'form_' + fieldNumber
					},
					grid: {
						gt_lg: '30%',
						lt_xl: '30%',
						lt_lg: '30%',
						lt_md: '50%',
						lt_sm: '100%'
					}
				}
			},
			{
				name: fieldTypeName,
				prop: fieldTypeName,
				form: {
					name: 'field_type',
					Validators: [Validators.required],
					formFieldType: 'select',
					initValue: 'text',
					listPrefix: 'fieldTypes',
					groupBy: {
						tabGroup: {
							tabGroupName: 'templateAccordion',
							tabName: 'step_' + stepNumber
						},
						section: 'form_' + formNumber,
						formInputs: 'form_' + fieldNumber
					},
					grid: {
						gt_lg: '30%',
						lt_xl: '30%',
						lt_lg: '30%',
						lt_md: '50%',
						lt_sm: '100%'
					}
				}
			},
			{
				name: fieldOptionsName,
				prop: fieldOptionsName,
				showIf: [
					{
						fieldName: fieldTypeName,
						fieldValue: 'select'
					}
				],
				form: {
					name: 'field_options',
					Validators: [Validators.required],
					formFieldType: 'ng_select',
					groupBy: {
						tabGroup: {
							tabGroupName: 'templateAccordion',
							tabName: 'step_' + stepNumber
						},
						section: 'form_' + formNumber,
						formInputs: 'form_' + fieldNumber
					},
					grid: {
						gt_lg: '25%',
						lt_xl: '25%',
						lt_lg: '25%',
						lt_md: '50%',
						lt_sm: '100%'
					}
				}
			}
		];

		this.featureProps = [...this.featureProps, ...stepDefaultInputs];
		console.log(this.featureProps);
		// this.stepsCount++;
		console.log(this.InputsTree);
	}
}
