import { Injectable } from '@angular/core';
import { ItemProps } from '@app/interfaces-v2';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
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

export interface TreatmentApiRequest {
	name?: string;
	client_id?: number;
	template_id?: number;
	status?: string;
	steps?: {
		group_id?: number;
		assign_to?: number;
		order?: number;
		name?: string;
		forms?: {
			id?: number;
			name?: string;
			order?: number;
			step_id?: number;
			status?: string;
			fields?: {
				key?: string;
				value?: string;
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
				form_Fields?: {
					name: string;
					title?: string;
				}[];
			}[];
		}[];
	} = {
		steps: []
	};

	defaultFeatureProps: ItemProps[] = [
		{
			name: 'templateId',
			prop: 'templateId',
			form: {
				Validators: [],
				formFieldType: 'ng_select',
				dataUrl: 'treatments/templates/index',
				listPrefix: 'templateId',
				// listRequestMethod: 'post',
				onChange: true,
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
			name: 'client_id',
			prop: 'client_id',
			form: {
				Validators: [],
				// disabled: true,
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
	featureProps: ItemProps[] = [...this.defaultFeatureProps];

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
			// console.log(event.id);
			this.InputsTree = { steps: [] };
			this.formInputsCategorized = {};
			this.stepsCount = 1;
			this.featureProps = [...this.defaultFeatureProps];
			console.log(event);
			if (event && event.id) {
				this.resourceGet(`templates/${event.id}/show`).subscribe(
					(response: any) => {
						if (response && response.response) {
							const patchedObj = { client_id: response.response.client_id };
							this.patchValues.next(patchedObj);
							// console.log(response.response);
							this.generateFormFromTemplate(response.response);
							this.formFieldsUpdated.next();
						}
					}
				);
			} else if (!event) {
				this.featureProps = [...this.defaultFeatureProps];
				this.formFieldsUpdated.next();
			}
		}
	}

	generateFormFromTemplate(template: any) {
		const requestMock: TemplateApiRequest = {
			client_id: template.client_id,
			steps: []
		};
		template.steps.forEach((step: any, stepI: any) => {
			requestMock.steps.push({
				name: template[`step_${stepI + 1}_name`],
				order: stepI + 1,
				group_id: template[`step_${stepI + 1}_typeId`],
				forms: []
			});
			this.generateStep(step.name, step.group_id);
			if (step.forms) {
				step.forms.forEach((form: any, formI: any) => {
					requestMock.steps[stepI].forms.push({
						name: template[`step_${stepI + 1}_form_${formI + 1}_name`],
						order: formI + 1,
						form_fields: []
					});
					this.generateForm(stepI + 1, form.name);

					form.form_fields.forEach((field: any, fieldI: any) => {
						requestMock.steps[stepI].forms[formI].form_fields.push({
							title: template[`step_${stepI + 1}_form_${formI + 1}_name`],
							type: field.type
						});
						this.generateField(
							stepI + 1,
							formI + 1,
							field.title,
							field.type,
							field.cols,
							field.form_field_options
						);

						// const optionsData =
						// 	template[
						// 		`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
						// 			1}_fieldOptions`
						// 	];
						// const refactoredOptions: {
						// 	name?: string;
						// }[] = [];
						// if (optionsData && optionsData.length) {
						// 	optionsData.forEach((option: any) => {
						// 		refactoredOptions.push({ name: option.value });
						// 	});
						// 			}
						// 			requestMock.steps[stepI].forms[formI].form_fields.push({
						// 				title:
						// 					template[
						// 						`step_${stepI + 1}_form_${formI + 1}_field_${fieldI + 1}_name`
						// 					],
						// 				type:
						// 					template[
						// 						`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
						// 							1}_fieldType`
						// 					],
						// 				cols:
						// 					template[
						// 						`step_${stepI + 1}_form_${formI + 1}_field_${fieldI +
						// 							1}_fieldCols`
						// 					]
						// 			});
						// 			// if (refactoredOptions && refactoredOptions.length) {
						// 			requestMock.steps[stepI].forms[formI].form_fields[fieldI].form_field_options = [
						// 				...refactoredOptions
						// 			];
						// 			// }
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

	refactorFormBeforeSubmit(formValue: any, formRawValue?: any): any {
		// console.log(formValue);
		const requestMock: TreatmentApiRequest = {
			name: formValue.name,
			client_id: formValue.client_id,
			template_id: formRawValue.templateId,
			status: formValue.status,
			steps: []
		};
		this.InputsTree.steps.forEach((step, stepI) => {
			requestMock.steps.push({
				name: formRawValue[`step_${stepI + 1}_name`],
				order: stepI + 1,
				group_id: formRawValue[`step_${stepI + 1}_typeId`],
				assign_to: formValue[`step_${stepI + 1}_assign_to`],
				forms: []
			});
			if (step.forms) {
				step.forms.forEach((form, formI) => {
					requestMock.steps[stepI].forms.push({
						name: formRawValue[`step_${stepI + 1}_form_${formI + 1}_name`],
						status: formValue[`step_${stepI + 1}_form_${formI + 1}_status`],
						order: formI + 1,
						fields: []
					});
					form.form_Fields.forEach((field, fieldI) => {
						requestMock.steps[stepI].forms[formI].fields.push({
							key: this.InputsTree.steps[stepI].forms[formI].form_Fields[fieldI]
								.title,
							value:
								formValue[
									`step_${stepI + 1}_form_${formI + 1}_field_${fieldI + 1}_name`
								]
						});
						console.log(requestMock.steps[stepI].forms[formI]);
					});
				});
			}
		});

		// console.log(requestMock);
		return requestMock;
	}

	routerPrefix(val: string = '') {
		return val ? val : 'treatments';
	}

	refactorListsData(field: string, response: any, fieldProps?: ItemProps) {
		if (response) {
			if (field === 'client_id' || fieldProps.form.listPrefix === 'groups') {
				if (response.response && response.response.length) {
					response.response.forEach((item: any) => {
						if (item.full_name) {
							item.name = item.full_name;
						}
					});
				}
				return response.response;
			}
			if (fieldProps.form.listPrefix === 'employees') {
				if (
					response.response &&
					response.response.data &&
					response.response.data.length
				) {
					response.response.data.forEach((item: any) => {
						if (item.full_name) {
							item.name = item.full_name;
						}
					});
				}
				return response.response.data;
			}
			if (field === 'templateId') {
				if (response.response && response.response.length) {
					// response.response.data.forEach((item: any) => {
					//
					// });
					// console.log(response.response.data);
					return response.response;
				}
			}
			if (fieldProps.form.listPrefix === 'treatmentsStatus') {
				if (response.response && response.response.length) {
					const newArr: { id: any; name: any }[] = [];
					response.response.forEach((item: any) => {
						newArr.push({
							id: item,
							name: item
						});
					});
					// console.log('newArr');
					// console.log(newArr);
					return newArr;
				}
			}
		}
	}

	generateStep(stepName: string, group_id: number) {
		const stepFormName = `step_${this.stepsCount}_name`;
		const stepFormTypeId = `step_${this.stepsCount}_typeId`;
		const stepAssignToId = `step_${this.stepsCount}_assign_to`;

		const stepDefaultInputs: ItemProps[] = [
			{
				name: stepFormName,
				prop: stepFormName,
				form: {
					name: 'step_name',
					Validators: [],
					formFieldType: 'text',
					initValue: stepName,
					disabled: true,
					hidden: true,
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
					Validators: [],
					formFieldType: 'ng_select',
					dataUrl: 'templates/groups/index',
					initValue: group_id,
					disabled: true,
					// hidden: true,
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
			},
			{
				name: stepAssignToId,
				prop: stepAssignToId,
				form: {
					name: 'step_AssignToId',
					Validators: [Validators.required],
					formFieldType: 'ng_select',
					dataUrl: 'employees/index',
					// initValue: group_id,
					// disabled: true,
					// hidden: true,
					listPrefix: 'employees',
					listRequestMethod: 'POST',
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

		if (!this.InputsTree.steps) {
			this.InputsTree.steps = [];
		}

		this.InputsTree.steps.push({
			name: 'step_' + this.stepsCount,
			forms: []
		});

		this.featureProps = [...this.featureProps, ...stepDefaultInputs];
		this.stepsCount++;

		// console.log(this.featureProps);
	}

	generateForm(stepNumber: number, formName: string) {
		const stepObj = this.InputsTree.steps.find(
			value => value.name === 'step_' + stepNumber
		);
		const formsLength = stepObj.forms.length ? stepObj.forms.length : 0;
		const formNumber = formsLength + 1;
		stepObj.forms.push({
			name: 'form_' + formNumber,
			form_Fields: []
		});

		const formObj = stepObj.forms.find(
			value => value.name === 'form_' + formNumber
		);

		const fieldsLength =
			formObj && formObj.form_Fields && formObj.form_Fields.length
				? formObj.form_Fields.length
				: 0;

		const stepFormName = `step_${stepNumber}_form_${formNumber}_name`;
		const stepFormStatus = `step_${stepNumber}_form_${formNumber}_status`;

		const stepDefaultInputs: ItemProps[] = [
			{
				name: stepFormName,
				prop: stepFormName,
				form: {
					name: 'form_name',
					Validators: [Validators.required],
					formFieldType: 'text',
					initValue: formName,
					disabled: true,
					hidden: true,
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
					}
					// gridCssClass: 'breakLine-input30'
				}
			},
			{
				name: stepFormStatus,
				prop: stepFormStatus,
				form: {
					name: 'form_status',
					Validators: [],
					formFieldType: 'ng_select',
					dataUrl: 'treatments/status',
					listPrefix: 'treatmentsStatus',
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
		// console.log(this.InputsTree);
		console.log(this.lists);
	}

	generateField(
		stepNumber: number,
		formNumber: number,
		fieldTitle: string,
		fieldType: string,
		cols: number,
		form_field_options?: { id: string; name: string }[]
	) {
		const stepObj = this.InputsTree.steps.find(
			value => value.name === 'step_' + stepNumber
		);

		const formObj = stepObj.forms.find(
			value => value.name === 'form_' + formNumber
		);

		const fieldsLength = formObj.form_Fields.length
			? formObj.form_Fields.length
			: 0;

		const fieldNumber = fieldsLength + 1;
		formObj.form_Fields.push({
			name: 'field_' + fieldNumber,
			title: fieldTitle
		});

		const fieldName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_name`;
		// const fieldTypeName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_fieldType`;
		// const fieldOptionsName = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_fieldOptions`;
		// const fieldCols = `step_${stepNumber}_form_${formNumber}_field_${fieldNumber}_fieldCols`;

		const colsPercents: {
			gt_lg: string;
			lt_xl: string;
			lt_lg: string;
			lt_md: string;
			lt_sm: string;
		} = {
			gt_lg: this.colsPercents(cols, 'gt_lg'),
			lt_xl: this.colsPercents(cols, 'lt_xl'),
			lt_lg: this.colsPercents(cols, 'lt_lg'),
			lt_md: this.colsPercents(cols, 'lt_md'),
			lt_sm: '100%'
		};

		const stepDefaultInputs: ItemProps[] = [
			{
				name: fieldName,
				prop: fieldName,
				form: {
					name: fieldTitle,
					backEndName: true,
					Validators: [],
					formFieldType: fieldType,
					groupBy: {
						tabGroup: {
							tabGroupName: 'templateAccordion',
							tabName: 'step_' + stepNumber
						},
						section: 'form_' + formNumber
						// formInputs: 'form_' + fieldNumber
					},
					grid: colsPercents
				}
			}
		];
		if (fieldType === 'select') {
			stepDefaultInputs[0].form.listPrefix = fieldName;
			if (form_field_options && form_field_options.length) {
				this.lists[fieldName] = [];
				form_field_options.forEach(option => {
					this.lists[fieldName].push({
						id: option.name,
						name: option.name
					});
				});
			}
		}

		this.featureProps = [...this.featureProps, ...stepDefaultInputs];
		console.log(this.featureProps);
		// this.stepsCount++;
		// console.log(this.InputsTree);
	}

	/**
	 *
	 * @param cols cols number from api
	 * @param screenSize // todo to be used later in improving this for each screen size
	 */
	colsPercents(cols: number, screenSize: string) {
		switch (cols) {
			case 1: {
				return '100%';
			}
			case 2: {
				return '50%';
			}
			case 3: {
				return '33%';
			}
			case 4: {
				return '25%';
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

		// console.log(this.featureProps);
	}

	addForm(stepNumber: number) {
		const stepObj = this.InputsTree.steps.find(
			value => value.name === 'step_' + stepNumber
		);
		const formsLength = stepObj.forms.length ? stepObj.forms.length : 0;
		const formNumber = formsLength + 1;
		stepObj.forms.push({
			name: 'form_' + formNumber,
			form_Fields: []
		});

		const formObj = stepObj.forms.find(
			value => value.name === 'form_' + formNumber
		);

		const fieldsLength =
			formObj && formObj.form_Fields && formObj.form_Fields.length
				? formObj.form_Fields.length
				: 0;
		if (formObj && formObj.form_Fields) {
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
		// console.log(this.InputsTree);
	}

	addField(stepNumber: number, formNumber: number) {
		const stepObj = this.InputsTree.steps.find(
			value => value.name === 'step_' + stepNumber
		);

		const formObj = stepObj.forms.find(
			value => value.name === 'form_' + formNumber
		);

		const fieldsLength = formObj.form_Fields.length
			? formObj.form_Fields.length
			: 0;

		const fieldNumber = fieldsLength + 1;
		formObj.form_Fields.push({
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
		// console.log(this.featureProps);
		// this.stepsCount++;
		// console.log(this.InputsTree);
	}
}
