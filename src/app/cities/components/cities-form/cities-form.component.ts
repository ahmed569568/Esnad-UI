import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreFormComponent } from '@app/core/components/core-form/core-form.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { CitiesService } from '@app/cities/cities.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-cities-form',
	templateUrl: 'cities-form.component.html'
})
export class CitiesFormComponent extends CoreFormComponent
	implements OnInit, OnDestroy {
	parent_id: any;

	constructor(
		service: CitiesService,
		fb: FormBuilder,
		activatedRoute: ActivatedRoute,
		private utilities: UtilitiesService
	) {
		super(service, fb, activatedRoute, utilities);
	}

	initLists() {
		this.lists = [];
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

	showLocationById(id: any) {
		if (!id || id === 1) {
			this.parent_id = null;
			return;
		}
		this.service
			.showItem(id - 1, 'select')
			.pipe(
				map(resp => {
					return resp[0];
				})
			)
			.subscribe((data: any) => {
				this.parent_id = true;
				this.service.lists = { ...this.service.lists, cities: data };
			});
	}

	patchFormValue(form: any): void {
		super.patchFormValue(form);
		this.form.controls.level.setValue(+form.level);
	}

	// patchFormValue(form: any): void {
	// 	let cities = <FormArray>(
	// 		this.form.controls.countries['controls'][0].controls.cities
	// 	);
	// 	form['cities'].forEach((item: any, index: any) => {
	// 		if (index !== 0) {
	// 			cities.push(this.initCities());
	// 		}
	// 	});
	// 	this.form.patchValue({ countries: [form] });
	// }

	// createForm(): void {
	// 	if (!this.isEdit) {
	// 		this.form = this.fb.group({
	// 			countries: this.fb.array([this.initCountries()])
	// 		});
	// 	}
	// }

	// initCountries() {
	// 	return this.fb.group({
	// 		name: ['', []],
	// 		cities: this.fb.array([this.initCities()])
	// 	});
	// }

	// initCities() {
	// 	return this.fb.group({
	// 		name: ['', []],
	// 		regions: this.fb.array([this.initRegions()])
	// 	});
	// }

	// initRegions() {
	// 	return this.fb.group({
	// 		name: ['', []],
	// 		provinces: this.fb.array([this.initProvinces()])
	// 	});
	// }

	// initProvinces() {
	// 	return this.fb.group({
	// 		name: ['', []],
	// 		districts: this.fb.array([this.initDistricts()])
	// 	});
	// }

	// initDistricts() {
	// 	return this.fb.group({
	// 		name: ['', []]
	// 		// streets: this.fb.array([
	// 		// 	this.initStreets(),
	// 		// ])
	// 	});
	// }

	// initStreets() {
	// 	return this.fb.group({
	// 		name: ['', []],
	// 	});
	// }

	// pushItem(itemArrayFromFormArray: any, type: string) {
	// 	switch (type) {
	// 		case 'countries':
	// 			itemArrayFromFormArray.get(type).push(this.initCountries());
	// 			break;
	// 		case 'cities':
	// 			itemArrayFromFormArray.get(type).push(this.initCities());
	// 			break;
	// 		case 'regions':
	// 			itemArrayFromFormArray.get(type).push(this.initRegions());
	// 			break;
	// 		case 'provinces':
	// 			itemArrayFromFormArray.get(type).push(this.initProvinces());
	// 			break;
	// 		case 'districts':
	// 			itemArrayFromFormArray.get(type).push(this.initDistricts());
	// 			break;
	// 		// case 'streets':
	// 		// 	itemArrayFromFormArray.get(type).push(this.initStreets());
	// 		// 	break;
	// 	}
	// }

	// deleteItem(itemArrayFromFormArray: any, index: number, type: string) {
	// 	itemArrayFromFormArray.get(type).removeAt(index);
	// }

	prepareFormAfterSubmit(): void {
		this.form.controls.parent_id.setValue(
			this.form.controls.parent_id.value.toString()
		);
		this.form.controls.level.setValue(
			this.form.controls.level.value.toString()
		);
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}

//
// interface Address {
// 	countries: Country;
// }
//
// interface Country {
// 	name: string;
// 	cities: City[];
// }
//
// interface City {
// 	name: string;
// 	regions: Region[];
// }
//
// interface Region {
// 	name: string;
// 	provinces: Province[];
// }
//
// interface Province {
// 	name: string;
// 	districts: District[];
// }
//
// interface District {
// 	name: string;
// 	// streets: Street[];
// }

// interface Street {
// 	name: string;
// }
