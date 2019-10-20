import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreFormComponent} from '@app/core/components/core-form/core-form.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UtilitiesService} from '@app/shared/services/utilities.service';
import {EmployeesService} from '@app/employees/employees.service';

@Component({
	selector: 'app-drivers-form',
	templateUrl: '../../../core/components/core-form/core-form.component.html'
})
export class EmployeesFormComponent extends CoreFormComponent implements OnInit, OnDestroy {
	constructor(
		service: EmployeesService,
		fb: FormBuilder,
		activatedRoute: ActivatedRoute,
		private utilities: UtilitiesService
	) {
		super(service, fb, activatedRoute, utilities);
	}

	initLists() {
		this.lists = [
			{
				['employees/groups']: 1
			},
			{
				['employees/categories']: 1
			}
		];
	}

	get lists() {
		return this._lists;
	}

	set lists(value: any) {
		this._lists = value;
	}

	ngOnInit() {
		super.ngOnInit();
	}

	patchFormValue(form: any) {
		super.patchFormValue(form);
		this.form.controls.photo.patchValue('');
		this.form.controls.signature.patchValue('');
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
