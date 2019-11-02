import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { ItemProps } from '@app/interfaces-v2';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { transition, trigger, useAnimation } from '@angular/animations';
import {
	HideAnimation,
	showAnimation
} from '@app/shared/animations/transform-opacity';
import { map, startWith, takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE
} from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// tslint:disable-next-line:no-duplicate-imports
import * as _moment from 'moment';
import { defaultFormat as _rollupMoment } from 'moment';
import { RootV2Service } from '@app/core/root.service-v2';

import {
	MatAutocomplete,
	MatAutocompleteSelectedEvent,
	MatChipInputEvent
} from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

const moment = _rollupMoment || _moment;

export interface Chip {
	name: string;
}

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
	parse: {
		//   // dateInput: 'LL',
		dateInput: 'YYYY-MM-DD'
	},
	display: {
		dateInput: 'LL',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY'
	}
};

@Component({
	selector: 'app-core-form-content',
	templateUrl: './core-form-content.component.html',
	styleUrls: ['./core-form-content.component.scss'],
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

	providers: [
		// `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
		// application's root module. We provide it at the component level here, due to limitations of
		// our example generation script.
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE]
		},

		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
	]
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreFormContentComponent
	implements OnInit, OnDestroy, AfterViewInit {
	@Input() cid: string;
	@Input() service: RootV2Service;
	@Input() field: ItemProps;
	@Input() form: FormGroup;
	@Input() isEdit: boolean;
	@Input() isClone: boolean;
	@Input() isSubmitted: boolean;

	@Output() showHideChanges: EventEmitter<any> = new EventEmitter();
	// form: FormGroup = new FormGroup({});

	previewImage: string;
	imageFieldName: string;
	alive = true;
	itemId: number;

	chipsConfigs: {
		visible: boolean;
		selectable: boolean;
		removable: boolean;
		addOnBlur: boolean;
	} = {
		visible: true,
		selectable: true,
		removable: true,
		addOnBlur: true
	};
	separatorKeysCodes: number[] = [ENTER];
	chipsCtrl: AbstractControl = new FormControl();
	filteredChips: Observable<string[]>;
	chips: string[] = [];
	allChips: string[] = [];

	@ViewChild('chipInput', { static: false }) chipInput: ElementRef<
		HTMLInputElement
	>;
	@ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

	constructor(
		public viewContainerRef: ViewContainerRef
	) // private changeDetectorRef: ChangeDetectorRef,
	// private controlContainer: ControlContainer,
	{}

	ngOnInit() {}

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
				// this.form.addControl(field.name,new FormControl('', validators) );
				this.form.get(field.name).setValidators(validators);
				// this.form.updateValueAndValidity();
				this.showHideChanges.emit({
					field: field.name,
					validators: validators
				});
				this.form.updateValueAndValidity();

				// console.log(validators);

				// console.log(field.name);
				// console.log(this.form.get(field.name).invalid);

				return true;
			} else {
				this.form.get(field.name).clearValidators();
				// this.form.removeControl(field.name);
				// this.form.updateValueAndValidity();
				this.showHideChanges.emit({ field: field.name, validators: null });
				this.form.updateValueAndValidity();

				// console.log(field.name);
				// console.log(this.form.get(field.name).invalid);

				return false;
			}
		} else {
			return true;
		}
	}

	addChip(event: MatChipInputEvent): void {
		// Add fruit only when MatAutocomplete is not open
		// To make sure this does not conflict with OptionSelected Event
		if (!this.matAutocomplete.isOpen) {
			const input = event.input;
			const value = event.value;

			// Add our fruit
			if ((value || '').trim()) {
				this.chips.push(value.trim());
			}

			// Reset the input value
			if (input) {
				input.value = '';
			}

			this.chipsCtrl.setValue(null);
		}
		this.updateChipsValues();
	}

	removeChip(fruit: string): void {
		const index = this.chips.indexOf(fruit);

		if (index >= 0) {
			this.chips.splice(index, 1);
		}
		this.updateChipsValues();
	}

	selectedChip(event: MatAutocompleteSelectedEvent): void {
		this.chips.push(event.option.viewValue);
		this.chipInput.nativeElement.value = '';
		this.chipsCtrl.setValue(null);
		this.updateChipsValues();
	}

	_filterChips(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.allChips.filter(
			chip => chip.toLowerCase().indexOf(filterValue) === 0
		);
	}

	filteredChipsSubscription() {
		this.filteredChips = this.chipsCtrl.valueChanges.pipe(
			startWith(null),
			takeWhile(() => this.alive),
			map((chip: string | null) =>
				chip ? this._filterChips(chip) : this.allChips.slice()
			)
		);
	}

	updateChipsValues() {
		this.form.controls[this.field.name].setValue(this.chips);
	}
	/**
	 * checks if the control name is required or not from the current validators on it
	 * why > because template checking doesn't update as you remove the validations and re insert them when live removing inputs
	 * also > to be able to see which inputs are required before they are touched and have error.required in validation errors
	 * @param controlName the control name in the form
	 */
	checkRequiredFields(controlName: string) {
		// if (!this.isEdit) {
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
		// }
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

	/**
	 * Pick color
	 * @param field: field name
	 * @param color: HEX color
	 */
	setColor(field: string, color: string) {
		this.form.controls[field].setValue(color);
	}

	uploadPhoto(event: any, field: any, image?: any) {
		// if (this.isEdit) {
		// this.uploadNewPhoto(field, image);
		// const photoControl = this.fb.control(null, []);
		// this.form.addControl('photo', photoControl);
		// }
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
			if (file && file.size > 5000000) {
				this.service.shared.toastr.warning(
					this.service.shared.translate.instant(
						'error_codes.photos_file_size_limit'
					),
					this.service.shared.translate.instant('error_codes.upload_failed')
				);
			} else {
				this.readURL(file);
				this.form.controls[field.name].setValue(file);
			}
		}
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

	toFormData<T>(formValue: T) {
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
		}
		// console.log(formData);

		return formData;
	}

	focusInputById(id: any) {
		document.getElementById(id).focus();
	}

	clickElementBySelector(selector: any) {
		return document.querySelector(selector)[0].click();
	}

	clearValue(control: AbstractControl) {
		control.setValue(null);
	}

	async enableControl(control: AbstractControl) {
		if (control.disabled) {
			control.enable();
		}
		return;
	}

	async clearImage(control: AbstractControl, id?: string) {
		await this.enableControl(control);

		control.setValue(null);
		this.previewImage = null;
	}

	async openFileSelectFromInput(control: AbstractControl, id: string) {
		await this.enableControl(control);

		setTimeout(() => {
			document.getElementById(id).click();
		});
	}

	ngOnDestroy(): void {
		this.alive = false;
	}

	ngAfterViewInit(): void {
		// this.changeDetectorRef.detectChanges();
		// this.form.updateValueAndValidity();
		// console.log(this.form.controls[this.field.name].value)

		// this.chipsCtrl = this.form.controls[this.field.name];
		this.filteredChipsSubscription();
	}

	// ngOnChanges(changes: SimpleChanges): void {
	//   console.log(changes);
	// }

	ngSelect_selectAll(
		control: AbstractControl,
		listPrefix: string,
		selectAll: boolean
	) {
		if (control && this.service.lists[listPrefix]) {
			const selected: number[] = [];
			if (selectAll) {
				Object.values(this.service.lists[listPrefix]).forEach(
					(item: { id: number }) => {
						selected.push(item.id);
					}
				);
			}
			control.setValue(selected);
		}
	}

	checkSelected(control: AbstractControl, id: number): boolean {
		if (control && id && control.value) {
			if (control.value.find((x: number) => x === id)) {
				return true;
			}
		}
	}

	preventDefault(event: any) {
		event.preventDefault();
	}

	onChangeValue_ng_select(column: ItemProps, event: any) {
		this.service.onChangeValue_ng_select(column, event);
	}
}
