import {Component, Input, OnChanges} from '@angular/core';
import {ItemProps} from '@app/interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RootService} from '@app/core/root.service';
import {UtilitiesService} from '@app/shared/services/utilities.service';
import * as moment from 'moment';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnChanges {

	form: FormGroup;
	@Input() columns: ItemProps[];
	@Input() service: RootService;

	constructor(private fb: FormBuilder, private us: UtilitiesService) {

	}

	ngOnChanges(): void {
		if (this.columns) {
			this.createForm();
		}
	}

	/**
	 * Identify the Form fields in each form controller
	 */
	get formFields(): any {
		let formFields = {};
		for (const field of this.columns) {
			if (field && field.searchable) {
				formFields = {...formFields, [field.name]: [null]};
			}
		}
		return formFields;
	}

	createForm() {
		this.form = this.fb.group(this.formFields);
	}

	filter() {
		this.us.filter(this.form.value);
	}

	getDateTime(event: any, field: any) {
		if (event.value) {
			const format = 'Y-MM-DD HH:mm:ss';
			const times = event.value;
			times.forEach((date: any, index: any) => {
				if (!date) {
					return true;
				}
				const period = moment(date).format(format);
				switch (index) {
					case (0) :
						this.form.value[field + '_from'] = period;
						// this.allowSearch[field] = false;
						// const error: object = {field, error: 'select_to_value'};
						// this.errors[field] = {...error};
						break;
					case (1) :
						this.form.value[field + '_to'] = period;
						// delete this.errors[field];
						// this.allowSearch[field] = true;
						break;
				}
				// console.log(this.errors);
			});
			// console.log(this.allowSearch);
			// if (this.allowSearch[field]) {
			// 	this.search();
			// }
		}
	}

	getDate(event: any, field: any) {
		if (event.value) {
			const format = 'Y-MM-DD';
			const times = event.value;
			times.forEach((date: any, index: any) => {
				if (!date) {
					return true;
				}
				const period = moment(date).format(format);
				switch (index) {
					case (0) :
						this.form.value[field + '_from'] = period;
						break;
					case (1) :
						this.form.value[field + '_to'] = period;
						break;
				}
			});
			// console.log(this.options);
			// this.search();
		}
	}
}
