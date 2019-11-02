import { Injectable } from '@angular/core';
import { ItemProps } from '@app/interfaces-v2';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { RootV2Service } from '@app/core/root.service-v2';
import { SharedService } from '@app/shared/services/shared.service';
import { ApiRequestV2Service } from '@app/core/http/api-request-v2.service';

export interface ApiRequest {
	name?: string;
	client_id?: number;
	color?: string;

	steps?: {
		group_id?: number;
		order?: number;
		name?: string;
		forms?: {
			name?: string;
			order?: number;
			fields?: {
				type?: string;
				title?: string;
				cols?: number;
				options?: {
					name?: string;
				}[];
			}[];
		}[];
	}[];
}

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

	defaultFeatureProps: ItemProps[] = [
		{
			name: 'name',
			prop: 'name',
			form: {
				Validators: [Validators.required],
				formFieldType: 'text',
				grid: {
					gt_lg: '33.3%',
					lt_xl: '33.3%',
					lt_lg: '33.3%',
					lt_md: '33.3%',
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
					gt_lg: '33.3%',
					lt_xl: '33.3%',
					lt_lg: '33.3%',
					lt_md: '33.3%',
					lt_sm: '100%'
				}
			}
		},
		{
			name: 'color',
			prop: 'color',
			form: {
				Validators: [],
				formFieldType: 'colorPicker',
				grid: {
					gt_lg: '33.3%',
					lt_xl: '33.3%',
					lt_lg: '33.3%',
					lt_md: '33.3%',
					lt_sm: '100%'
				}
			}
		}
	];
	featureProps: ItemProps[] = this.defaultFeatureProps;

	constructor(router: Router, api: ApiRequestV2Service, shared: SharedService) {
		super(router, api, shared);

		this.lists.fieldTypes = [
			{
				name: 'حقل نصى',
				id: 'text'
			},
			{
				name: 'حقل اختيار الألوان',
				id: 'colorPicker'
			},
			{
				name: 'حقل اختيار التاريخ',
				id: 'datepicker'
			},
			{
				name: 'حقل اختيار من متعدد',
				id: 'ng_select'
			},
			{
				name: 'حقل على شكل ازرار الراديو',
				id: 'radio'
			},
			{
				name: 'حقل اختيار عدة اختيارات من متعدد',
				id: 'ng_select_multiple'
			},
			{
				name: 'حقل صواب ام خطأ',
				id: 'checkbox'
			}
		];
		this.lists.field_cols = [
			{
				name: 'العرض الكامل',
				id: '1'
			},
			{
				name: 'نصف العرض المتاح',
				id: '2'
			},
			{
				name: 'ثلث العرض المتاح',
				id: '3'
			},
			{
				name: 'ربع العرض المتاح',
				id: '4'
			}
		];
	}

	/**
	 * Generic Create Action Request
	 * @param data: New Item Data
	 */
	createItem(data: {}) {
		return this.doCreate(this.getFunctionURL('create'), data);
	}

	refactorFormBeforeSubmit(formValue: any, formRawValue?: any): any {
		console.log(formValue);
		const requestMock: ApiRequest = {
			name: formValue.name,
			client_id: formValue.client_id,
			color: formValue.color,
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
								refactoredOptions.push({ name: option });
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
		const stepInitValue =
			this.shared.translate.instant('templates.step_placeholder') +
			' ' +
			this.stepsCount;

		const stepDefaultInputs: ItemProps[] = [
			{
				name: stepFormName,
				prop: stepFormName,
				form: {
					name: 'step_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					initValue: stepInitValue,
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
		const formsLength = stepObj.forms.length ? stepObj.forms.length : 0;
		const formNumber = formsLength + 1;
		stepObj.forms.push({
			name: 'form_' + formNumber,
			fields: []
		});

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
		const stepFormInitValue =
			this.shared.translate.instant('templates.form_placeholder') +
			' ' +
			formNumber;

		const stepDefaultInputs: ItemProps[] = [
			{
				name: stepFormName,
				prop: stepFormName,
				form: {
					name: 'form_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					initValue: stepFormInitValue,
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
		const fieldInitValue =
			this.shared.translate.instant('templates.field_placeholder') +
			' ' +
			fieldNumber;

		const stepDefaultInputs: ItemProps[] = [
			{
				name: fieldName,
				prop: fieldName,
				form: {
					name: 'field_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					initValue: fieldInitValue,
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
					},
					{
						fieldName: fieldTypeName,
						fieldValue: 'radio'
					},
					{
						fieldName: fieldTypeName,
						fieldValue: 'ng_select_multiple'
					},
					{
						fieldName: fieldTypeName,
						fieldValue: 'ng_select'
					}
				],
				form: {
					name: 'field_options',
					Validators: [],
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
