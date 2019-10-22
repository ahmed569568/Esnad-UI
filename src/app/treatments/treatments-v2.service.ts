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

export interface TemplateApiRequest {
	name?: string;
	client_id?: number;
	steps?: {
		group_id?: number;
		order?: number;
		name?: string;
		forms?: {
			id?: number;
			name?: string;
			order?: number;
			step_id?: number;
			form_fields?: {
				id?: number;
				form_id?: number;
				type?: string;
				title?: string;
				cols?: number;
				form_field_options?: {
					id?: any;
					form_field_id?: number;
					name?: string;
				}[];
			}[];
		}[];
	}[];
}

@Injectable({
	providedIn: 'root'
})
export class TreatmentsV2Service extends RootV2Service {
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
		// {
		// 	name: 'name',
		// 	prop: 'name',
		// 	form: {
		// 		Validators: [Validators.required],
		// 		formFieldType: 'text',
		// 		grid: {
		// 			gt_lg: '30%',
		// 			lt_xl: '30%',
		// 			lt_lg: '30%',
		// 			lt_md: '50%',
		// 			lt_sm: '100%'
		// 		}
		// 	}
		// },
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
		},
		{
			name: 'status',
			prop: 'status',
			form: {
				Validators: [],
				formFieldType: 'ng_select',
				// dataUrl: 'treatments/clients/index',
				initValue: 'open',
				listPrefix: 'status',
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
			name: 'templateId',
			prop: 'templateId',
			form: {
				Validators: [],
				formFieldType: 'ng_select',
				dataUrl: 'templates/index',
				listPrefix: 'templateId',
				listRequestMethod: 'post',
				onChange: true,
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
	startingFeatureProps: ItemProps[] = [...this.featureProps];

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
		this.lists.field_cols = [
			{
				name: '1 Cols',
				id: '1'
			},
			{
				name: '2 Cols',
				id: '2'
			},
			{
				name: '3 Cols',
				id: '3'
			},
			{
				name: '4 Cols',
				id: '4'
			}
		];
		this.lists.status = [
			{
				name: 'open',
				id: 'open'
			},
			{
				name: 'closed',
				id: 'closed'
			}
		];
	}

	onChangedValue(column: ItemProps, event: any) {
		super.onChangedValue(column, event);
		if (column.name === 'templateId') {
			console.log(event.id);
			this.featureProps = [...this.startingFeatureProps];
			if (event && event.id) {
				this.resourceGet(`templates/${event.id}/show`).subscribe(
					(response: any) => {
						if (response && response.response) {
							const patchedObj = { client_id: response.response.client_id };
							this.patchValues.next(patchedObj);
							console.log(response.response);
							// this.generateFormFromTemplate(response.data);
							// this.formFieldsUpdated.next();
						}
					}
				);
			}
		}
	}

	generateFormFromTemplate(template: any) {
		const requestMock: TemplateApiRequest = {
			client_id: formValue.client_id,
			steps: []
		};
		template.steps.forEach((step, stepI) => {
			requestMock.steps.push({
				name: formValue[`step_${stepI + 1}_name`],
				order: stepI + 1,
				group_id: formValue[`step_${stepI + 1}_typeId`],
				forms: []
			});
			if (step.forms) {
				step.forms.forEach((form, formI) => {
					requestMock.steps[stepI].forms.push({
						name: formValue[`step_${stepI + 1}_form_${formI + 1}_name`],
						order: formI + 1,
						fields: []
					});
					form.fields.forEach((field, fieldI) => {
						const optionsData =
							formValue[
								`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
									1}_fieldOptions`
							];
						const refactoredOptions: {
							name?: string;
						}[] = [];
						if (optionsData && optionsData.length) {
							optionsData.forEach((option: any) => {
								refactoredOptions.push({ name: option.value });
							});
						}
						requestMock.steps[stepI].forms[formI].fields.push({
							title:
								formValue[
									`step_${stepI + 1}_form_${formI + 1}_field_${fieldI + 1}_name`
								],
							type:
								formValue[
									`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
										1}_fieldType`
								],
							cols:
								formValue[
									`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
										1}_fieldCols`
								]
						});
						// if (refactoredOptions && refactoredOptions.length) {
						requestMock.steps[stepI].forms[formI].fields[fieldI].options = [
							...refactoredOptions
						];
						// }
					});
				});
			}
		});
	}

	/**
	 * Generic Create Action Request
	 * @param data: New Item Data
	 */
	createItem(data: {}) {
		return this.doCreate(this.getFunctionURL('create'), data);
	}

	refactorFormBeforeSubmit(formValue: any): any {
		console.log(formValue);
		const requestMock: ApiRequest = {
			name: formValue.name,
			client_id: formValue.client_id,
			steps: []
		};
		this.InputsTree.steps.forEach((step, stepI) => {
			requestMock.steps.push({
				name: formValue[`step_${stepI + 1}_name`],
				order: stepI + 1,
				group_id: formValue[`step_${stepI + 1}_typeId`],
				forms: []
			});
			if (step.forms) {
				step.forms.forEach((form, formI) => {
					requestMock.steps[stepI].forms.push({
						name: formValue[`step_${stepI + 1}_form_${formI + 1}_name`],
						order: formI + 1,
						fields: []
					});
					form.fields.forEach((field, fieldI) => {
						const optionsData =
							formValue[
								`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
									1}_fieldOptions`
							];
						const refactoredOptions: {
							name?: string;
						}[] = [];
						if (optionsData && optionsData.length) {
							optionsData.forEach((option: any) => {
								refactoredOptions.push({ name: option.value });
							});
						}
						requestMock.steps[stepI].forms[formI].fields.push({
							title:
								formValue[
									`step_${stepI + 1}_form_${formI + 1}_field_${fieldI + 1}_name`
								],
							type:
								formValue[
									`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
										1}_fieldType`
								],
							cols:
								formValue[
									`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
										1}_fieldCols`
								]
						});
						// if (refactoredOptions && refactoredOptions.length) {
						requestMock.steps[stepI].forms[formI].fields[fieldI].options = [
							...refactoredOptions
						];
						// }
					});
				});
			}
		});

		console.log(requestMock);
		return requestMock;
	}

	routerPrefix(val: string = '') {
		return val ? val : 'treatments';
	}

	refactorListsData(field: string, response: any) {
		if (response) {
			if (field === 'client_id') {
				if (response.response && response.response.length) {
					response.response.forEach((item: any) => {
						item.name = item.full_name;
					});
				}
				return response.response;
			}
			if (field === 'templateId') {
				if (response.response.data && response.response.data.length) {
					// response.response.data.forEach((item: any) => {
					//
					// });
				}
				// console.log(response.response.data);
				return response.response.data;
			}
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
					dataUrl: 'treatments/groups/index',
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
		const formNumber = formsLength ? formsLength : 1;

		const formObj = stepObj.forms.find(
			value => value.name === 'form_' + formNumber
		);

		const fieldsLength =
			formObj && formObj.fields && formObj.fields.length
				? formObj.fields.length
				: 0;
		if (formObj && formObj.fields) {
			// formObj.fields.push({
			// 	name: 'field_' + fieldsLength
			// });
		}

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

		const fieldsLength = formObj.fields.length ? formObj.fields.length : 0;

		const fieldNumber = fieldsLength + 1;
		formObj.fields.push({
			name: 'field_' + fieldNumber
		});

		const fieldName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_name`;
		const fieldTypeName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_fieldType`;
		const fieldOptionsName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_fieldOptions`;
		const fieldCols = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_fieldCols`;

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
					formFieldType: 'tag-input',
					listPrefix: fieldOptionsName,
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
			},
			{
				name: fieldCols,
				prop: fieldCols,
				form: {
					name: 'field_cols',
					Validators: [],
					initValue: '1',
					formFieldType: 'select',
					listPrefix: 'field_cols',
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
