import {Component, Input, OnChanges} from '@angular/core';
import {ItemProps} from '@app/interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RootService} from '@app/core/root.service';
import {UtilitiesService} from '@app/shared/services/utilities.service';


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
}
