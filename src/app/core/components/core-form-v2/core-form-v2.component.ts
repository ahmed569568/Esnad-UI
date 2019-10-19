import {
	Component,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { AppHelper } from '@app/core/classes/app-helper';
import { AppConfig } from '@app/core/classes/app-config';
import { environment } from '@env/environment';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
	HideAnimation,
	showAnimation
} from '@app/shared/animations/transform-opacity';
import { ApiResponse } from '@app/interfaces';
import { GroupByPipe } from 'ngx-pipes';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// tslint:disable-next-line:no-duplicate-imports
import * as _moment from 'moment';
import { defaultFormat as _rollupMoment } from 'moment';
import { RootV2Service } from '@app/core/root.service-v2';

const moment = _rollupMoment || _moment;

@Component({
	selector: 'app-core-form-v2',
	templateUrl: './core-form-v2.component.html',
	styleUrls: ['./core-form-v2.component.scss'],
	animations: [
		trigger('showHide', [
			transition('void => *', [
				useAnimation(showAnimation, {
					params: {
						timings: '200ms ease-in-out',
						transform: 'translateY(-10%)',
						opacity: '0'
					}
				})
			]),
			transition('* => void', [
				useAnimation(HideAnimation, {
					params: {
						timings: '200ms 200ms ease-in-out',
						transform: 'translateY(-10%)',
						opacity: '0'
					}
				})
			])
		])
	],
	providers: [GroupByPipe]
})
export class CoreFormV2Component implements OnInit, OnDestroy, OnChanges {
	showBreadcrumb = true;
	headerSmallSize = false;

	get lists() {
		return this._lists;
	}

	set lists(value: any) {
		this._lists = value;
	}

	/**
	 * Identify the Form fields in each form controller
	 */
	get formFields(): any {
		let formFields = {};
		for (const field of this.service.featureProps) {
			if (field.form) {
				if (this.isEdit) {
					if (field.form.formFieldType === 'img') {
						this.fileFields.push(field.name);
						formFields = {
							...formFields,
							[field.name]: [
								{
									value: field.form.initValue ? field.form.initValue : null,
									disabled: field.editDisabled && this.isEdit
								},
								field.form.Validators
							]
						};
					} else {
						formFields = {
							...formFields,
							[field.name]: [
								{
									value: field.form.initValue ? field.form.initValue : null,
									disabled: field.editDisabled && this.isEdit
								},
								field.form.Validators
							]
						};
					}
				} else {
					formFields = {
						...formFields,
						[field.name]: [
							{
								value: field.form.initValue ? field.form.initValue : null,
								disabled: field.editDisabled && this.isEdit
							},
							field.form.Validators
						]
					};
				}
			}
		}
		return formFields;
	}

	cid: string;
	form: FormGroup;
	isEdit = false;
	itemId: number;
	item: any;
	config = AppConfig;
	helper = AppHelper;
	isSubmitted = false;
	isClone = false;
	isSaveAddNew = false;

	environment = environment;
	imageFieldName: string;

	previewImage: string;

	fileFields: string[] = [];
	alive = true;

	protected _lists: any = [];

	constructor(
		public service: RootV2Service,
		protected fb: FormBuilder,
		protected activatedRoute: ActivatedRoute,
		public groupByPipe: GroupByPipe
	) {
		this.cid = service.cid;
	}

	ngOnInit(): void {
		// this.initLists();
		// this.fillLists();

		this.service.loadSelectLists('form');

		this.checkFormType();
		this.groupItemsByGroup();
		this.createForm();

		/**
		 * Check if path contain ID
		 * return values from item id values
		 */
		this.activatedRoute.params
			.pipe(takeWhile(() => this.alive))
			.subscribe((routeInfo: any) => {
				if (routeInfo.id) {
					this.loadResources(routeInfo.id);
				}
			});

		/**
		 * check for route data flag
		 */
		this.activatedRoute.data
			.pipe(takeWhile(() => this.alive))
			.subscribe(routeData => {
				if (routeData.isClone) {
					this.isClone = true;
				} else if (routeData.isEdit) {
					this.isEdit = true;
					// this.previewImage = this.form.controls.photo ? this.form.controls.photo.value : null;
					// this.form.removeControl('photo');
				}
			});

		this.checkPasswords();
		this.clearInput();
	}

	/**
	 * Pick color
	 * @param field: field name
	 * @param color: HEX color
	 */
	setColor(field: string, color: string) {
		this.form.controls[field].setValue(color);
	}

	uploadPhoto(event: any, field: any, image?: any) {
		if (this.isEdit) {
			this.uploadNewPhoto(field, image);
			// const photoControl = this.fb.control(null, []);
			// this.form.addControl('photo', photoControl);
		}
		if (field.form.inputValueType === 'base64_img') {
			this.imageFieldName = field.name;
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = this.convertImage.bind(this);
				reader.readAsBinaryString(file);
			}
		} else if (field.form.inputValueType === 'formData') {
			const file = event.target.files[0];
			this.readURL(file);
			this.form.controls[field.name].setValue(file);
		}
	}

	uploadNewPhoto(field: any, image: any) {
		const formV = {};
		formV[field.name] = image;
		this.service
			.doCreate(
				`${this.cid}/${this.itemId}/${field.name}`,
				this.toFormData(formV)
			)
			.pipe(takeWhile(() => this.alive))
			.subscribe(() => {});

		//   .then(() => {
		//     this.service.updateResources.next();
		//   });
	}

	checkFormType() {
		this.activatedRoute.data
			.pipe(takeWhile(() => this.alive))
			.subscribe(routeData => {
				if (routeData.isClone) {
					this.isClone = true;
				} else if (routeData.isEdit) {
					this.isEdit = true;
				}
			});
	}

	enableControl(control: any) {
		control.enable();
	}

	/**
	 * Preview Image
	 * @param input: Input
	 */
	readURL(input: any) {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			this.previewImage = e.target.result;
		};
		reader.readAsDataURL(input);
	}

	convertImage(readerEvt: any) {
		const binaryString = readerEvt.target.result;
		this.form.controls[this.imageFieldName].setValue(btoa(binaryString));
	}

	/**
	 * Init form lists
	 */
	initLists(): void {
		this.lists = [];
	}

	/**
	 * fetch single item data from service
	 * and fill form with it in Edit forms
	 */
	loadResources(id: number): void {
		this.itemId = id;
		this.service
			.showItem(id)
			.pipe(takeWhile(() => this.alive))
			.pipe(
				map(item => {
					// this.item = item;
					return this.refactorItem(item);
				})
			)
			.subscribe(
				response => {
					const obj = JSON.parse(JSON.stringify(response)); // clone response object
					this.formInjectValues(obj);
					// this.removeFileInputs();
				},
				err => {
					this.service.errorHandle(err);
				}
			);
	}

	/**
	 * Do operation on response before subscription
	 * @param item: Response
	 */
	refactorItem(item: any): any {
		if (this.isClone && item.name) {
			item.name += ' - copy';
		}
		return item;
	}

	trackByFn() {
		return;
	}

	formInjectValues(obj: any) {
		return this.form.patchValue(obj);
	}

	/**
	 * Create the form controls
	 * param => formFields fills from each inheritance component
	 */
	createForm(): void {
		this.form = this.fb.group(this.formFields);
	}

	// removeFileInputs(): void {
	//   if (this.fileFields.length) {
	//     this.fileFields.forEach(x => {
	//       this.form.removeControl(x);
	//     });
	//   }
	// }

	/**
	 * Load necessary lists to fill specific fields
	 */
	getLists(field: any): Subscription {
		return this.service.getLists(field);
	}

	/**
	 * get data and fill & cache it in service
	 */
	fillLists(): void {
		for (const item of this.lists) {
			for (const key of Object.keys(item)) {
				this.getLists(key);
			}
		}
	}

	/**
	 * submit form data to createItem method in root service
	 */
	prepareFormAfterSubmit(): void {
		return;
	}

	refactorFormValue() {
		for (const field of Object.keys(this.form.value)) {
			const xFields = this.service.featureProps.filter(x => x.name === field);
			xFields.forEach(xField => {
				if (xField.form && xField.form.formFieldType) {
					const fieldType = xField.form.formFieldType;

					if (fieldType === 'datepicker') {
						if (this.form.value[xField.name]) {
							this.form.value[xField.name] = this.convertDate(
								this.form.value[xField.name]
							);
						}
					}

					if (
						this.form.value[xField.name] === '' ||
						this.form.value[xField.name] === null ||
						this.form.value[xField.name] === [] ||
						this.form.value[xField.name] === [''] ||
						JSON.stringify(this.form.value[xField.name]) === '[]' ||
						this.form.value[xField.name] === 'Invalid date' ||
						JSON.stringify(this.form.value[xField.name]) === 'Invalid date'
					) {
						if (this.isEdit && fieldType === 'img') {
							this.form.value[xField.name] = '';
						} else if (this.isEdit) {
							this.form.value[xField.name] = '';
						} else {
							// console.log(this.form.value[field]);
							if (!this.isEdit) {
								delete this.form.value[xField.name];
							}
						}
					}
				}
			});
		}
		this.service.refactorFormBeforeSubmit(this.form.value);
	}

	convertDate(date: any) {
		const convertedDate = _moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
		console.log(convertedDate);
		return convertedDate;
	}

	/**
	 * Post form data to API
	 */
	formSubmission(saveAddNew?: boolean) {
		console.log('this.isEdit', this.isEdit);
		console.log('this.isClone', this.isClone);

		this.isSubmitted = true;
		this.prepareFormAfterSubmit();

		let updateAsPost = false;
		let jsonForm = true;

		for (const field of this.service.featureProps) {
			if (field.form && field.form.formFieldType === 'img') {
				updateAsPost = true;
			}
			if (
				field.form &&
				(field.form.formFieldType === 'img' ||
					field.form.formFieldType === 'file')
			) {
				jsonForm = false;
			}
		}

		this.refactorFormValue();

		if (this.isEdit) {
			if (updateAsPost) {
				return this.service
					.updateItemAsPost(
						this.itemId,
						this.toFormData(this.form.value, 'PUT')
					)
					.pipe(takeWhile(() => this.alive))
					.subscribe(
						(resp: ApiResponse) => {
							this.service.updateResources.next();
							this.service.shared.toastr.success(
								// this.service.shared.translate.instant(this.cid + '.updated'),
								resp.message,
								this.service.shared.translate.instant('common.success')
							);
							if (saveAddNew) {
								this.form.reset();
								this.isSubmitted = false;
							} else {
								return this.service.navigateToList();
							}
						},
						(error: any) => {
							console.log(error);
							if (error.status === 413) {
								this.service.shared.toastr.error(
									error.message,
									this.service.shared.translate.instant('error_codes.413')
								);
							}
							/**
							 * handling server side validation errors
							 */
							if (error && error.error && error.error.errors) {
								this.ServerValidationErrors(error.error.errors);
							}
						}
					);
			} else {
				return this.service
					.updateItem(this.itemId, this.form.value)
					.pipe(takeWhile(() => this.alive))
					.subscribe(
						(resp: ApiResponse) => {
							this.service.updateResources.next();
							this.service.shared.toastr.success(
								// this.service.shared.translate.instant(this.cid + '.updated'),
								resp.message,
								this.service.shared.translate.instant('common.success')
							);
							if (saveAddNew) {
								this.form.reset();
								this.isSubmitted = false;
							} else {
								return this.service.navigateToList();
							}
						},
						(error: any) => {
							console.log(error);
							if (error.status === 413) {
								this.service.shared.toastr.error(
									error.message,
									this.service.shared.translate.instant('error_codes.413')
								);
							}
							/**
							 * handling server side validation errors
							 */
							if (error && error.error && error.error.errors) {
								this.ServerValidationErrors(error.error.errors);
							}
						}
					);
			}
		} else {
			this.service
				.createItem(this.toFormData(this.form.value, null, jsonForm))
				.pipe(takeWhile(() => this.alive))
				.subscribe(
					(resp: ApiResponse) => {
						this.service.updateResources.next();
						this.service.shared.toastr.success(
							// this.service.shared.translate.instant(this.cid + '.created'),
							resp.message,
							this.service.shared.translate.instant('common.success')
						);
						if (saveAddNew) {
							this.form.reset();
							this.isSubmitted = false;
						} else {
							return this.service.navigateToList();
						}
					},
					error => {
						if (error) {
							/**
							 * payload error
							 */
							if (error.status === 413) {
								this.service.shared.toastr.error(
									error.message,
									this.service.shared.translate.instant('error_codes.413')
								);
							}

							/**
							 * timeout error
							 */
							if (error && error.name === 'TimeoutError') {
								this.service.shared.toastr.warning(
									error.message,
									this.service.shared.translate.instant(
										'error_codes.TimeoutError'
									)
								);
							}
							/**
							 * handling server side validation errors
							 */
							if (error.error && error.error.errors) {
								this.ServerValidationErrors(error.error.errors);
							}
						}
					}
				);
		}
	}

	/**
	 * add server side validation errors into the errors array in each form control inside key serverError
	 * @param errors => taken from fail response 422
	 */
	ServerValidationErrors(errors: any) {
		if (!errors) {
			return;
		}
		Object.keys(errors).forEach(prop => {
			const formControl = this.form.get(prop);
			if (formControl) {
				// activate the error message
				formControl.setErrors({
					serverError: errors[prop]
				});
			}
		});
	}

	toFormData<T>(formValue: T, _method?: string, jsonForm?: boolean) {
		// console.log(formValue);
		const formData = new FormData();

		for (const key of Object.keys(formValue)) {
			const value = formValue[key];
			/**
			 * fix for boolean values in formData method
			 */
			if (value === true) {
				formData.append(key, '1');
			} else if (value === false) {
				formData.append(key, '0');
			} else {
				formData.append(key, value);
			}
			// console.log(formData);

			const xFields = this.service.featureProps.filter(x => x.name === key);
			xFields.forEach(xField => {
				if (xField.form && xField.form.formFieldType) {
					const fieldType = xField.form.formFieldType;

					if (fieldType === 'ng_select_multiple') {
						if (value && value.length) {
							const valueArray = value;
							formData.delete(key);
							valueArray.forEach((id: any) => {
								formData.append(xField.name + '[]', id);
							});
						} else {
							if (this.isEdit) {
								formData.delete(key);
								formData.append(xField.name, '');
							} else {
								formData.append(xField.name + '[]', '');
								formData.delete(key);
							}
						}
					}
				}
			});
		}

		if (_method) {
			formData.append('_method', _method);
		}
		if (jsonForm) {
			return formValue;
		} else {
			return formData;
		}
	}

	// validationErrors(errors: any) {
	//   Object.keys(errors).forEach(prop => {
	//     const formControl = this.form.get(prop);
	//     if (formControl) {
	//       // activate the error message
	//       formControl.setErrors({
	//         serverError: errors[prop]
	//       });
	//     }
	//   });
	// }

	fieldShowConditions(field: any) {
		if (field.showIf) {
			const validators = field.form.Validators;
			let trueCount = 0;
			field.showIf.forEach((condition: any) => {
				if (
					this.form.controls[Object.keys(condition)[0]].value ===
					Object.values(condition)[0]
				) {
					trueCount++;
				}
			});
			if (trueCount > 0) {
				this.form.get(field.name).setValidators(validators);
				this.form.get(field.name).updateValueAndValidity();
				// console.log('validators');

				return true;
			} else {
				this.form.get(field.name).clearValidators();
				this.form.get(field.name).updateValueAndValidity();
				// console.log('clearValidators');
				return false;
			}
		} else {
			return true;
		}
	}

	checkPasswords() {
		// here we have the 'passwords' group
		if (
			this.form.controls.password &&
			this.form.controls.password_confirmation
		) {
			this.form.controls.password_confirmation.valueChanges
				.pipe(takeWhile(() => this.alive))
				.subscribe(() => {
					this.comparePasswords();
				});
			this.form.controls.password.valueChanges
				.pipe(takeWhile(() => this.alive))
				.subscribe(() => {
					this.comparePasswords();
				});
		}
	}

	comparePasswords() {
		const pass = this.form.controls.password.value;
		const password_confirmation = this.form.controls.password_confirmation
			.value;
		if (pass === password_confirmation) {
			this.form.controls.password_confirmation.setErrors(null);
		} else {
			this.form.controls.password_confirmation.setErrors({
				passwordsDontMatch: true
			});
		}
	}

	checkValidations(key: any) {
		for (const field of this.service.featureProps) {
			if (field.form) {
				if (field.form.Validators) {
					// console.log(field.form.Validators);
					if (field.form.Validators.find(x => x === key)) {
						return true;
					}
				}
			}
		}
	}

	checkImgSrc(field: any) {
		if (!!this.form.controls[field.name].valueChanges) {
			if (!this.previewImage) {
				if (!this.form.controls[field.name].value) {
					return field.form.placeHolder;
				} else {
					return this.form.controls[field.name].value;
				}
			} else {
				return this.previewImage;
			}
		}
	}

	ngOnDestroy(): void {
		this.alive = false;
	}

	checkRequiredFields(controlName: string) {
		if (!this.isEdit) {
			const abstractControl = this.form.controls[controlName];
			if (!abstractControl) {
				return false;
			}
			if (abstractControl.validator) {
				const validator = abstractControl.validator({} as AbstractControl);
				if (validator && validator.required) {
					return true;
				}
			}
			return false;
		}
	}

	focusInputById(id: any) {
		document.getElementById(id).focus();
	}

	cancelFormSubmission() {
		if (this.form.dirty) {
			this.service.openActionDialog(
				this.service,
				'cancel',
				'common.confirmCancelForm.title',
				'common.confirmCancelForm.message',
				'common.confirmCancelForm.submitText',
				'common.confirmCancelForm.cancelText',
				null,
				'bg-danger'
			);
		} else {
			// this.service.navigateToList();
			this.service.goBack();
		}
	}

	groupItemsByGroup() {
		const tabGroups = this.groupByPipe.transform(
			this.service.featureProps,
			'form.groupBy.tabGroup.tabGroupName'
		);

		Object.entries(tabGroups).forEach(group => {
			let tabGroupName = group[0];
			if (tabGroupName === 'undefined') {
				tabGroupName = 'defaultGroup';
			}
			this.service.formInputsCategorized[tabGroupName] = {};

			const tabs = this.groupByPipe.transform(
				group[1],
				'form.groupBy.tabGroup.tabName'
			);
			Object.entries(tabs).forEach(tab => {
				let tabName = tab[0];
				if (tabName === 'undefined') {
					tabName = 'defaultTab';
				}
				this.service.formInputsCategorized[tabGroupName][tabName] = {};

				const tabContent = this.groupByPipe.transform(
					tab[1],
					'form.groupBy.section'
				);
				Object.entries(tabContent).forEach(section => {
					let sectionName = section[0];
					if (sectionName === 'undefined') {
						sectionName = 'defaultSection';
					}
					this.service.formInputsCategorized[tabGroupName][tabName][
						sectionName
					] = section[1];
				});
			});
		});
		this.service.formInputsCategorized = {
			...this.service.formInputsCategorized
		};
	}

	ngOnChanges(changes: SimpleChanges): void {
		// console.log(changes);
	}

	showHideChanges(data: any) {
		if (data.field && data.validators) {
			// console.log(data.validators);

			this.form.get(data.field).setValidators(data.validators);

			// this.form.get(data.field).updateValueAndValidity();
			this.form.updateValueAndValidity();
			// this.changeDetectorRef.detectChanges();

			// console.log(this.form);
			// this.changeDetectorRef.detectChanges();
		}
	}

	clearInput() {
		this.service.clearInput
			.pipe(takeWhile(() => this.alive))
			.subscribe((input: any) => {
				this.form.controls[input].setValue(null);
			});
	}
}
