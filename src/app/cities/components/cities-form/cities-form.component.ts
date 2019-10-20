import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreFormComponent} from '@app/core/components/core-form/core-form.component';
import {FormArray, FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UtilitiesService} from '@app/shared/services/utilities.service';
import {CitiesService} from '@app/cities/cities.service';

@Component({
	selector: 'app-cities-form',
	templateUrl: './cities-form.component.html'
})
export class CitiesFormComponent extends CoreFormComponent
	implements OnInit, OnDestroy {
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

	patchFormValue(form: any): void {
		let cities = <FormArray> this.form.controls.countries['controls'][0].controls.cities;
		form['cities'].forEach(() => {
			cities.push(this.initCities());
		});
		this.form.patchValue({countries: [form]});
	}

	createForm(): void {
		this.form = this.fb.group({
			countries: this.fb.array([this.initCountries()])
		});
	}

	initCountries() {
		return this.fb.group({
			name: ['', []],
			cities: this.fb.array([this.initCities()])
		});
	}

	initCities() {
		return this.fb.group({
			name: ['', []],
			regions: this.fb.array([this.initRegions()])
		});
	}

	initRegions() {
		return this.fb.group({
			name: ['', []],
			provinces: this.fb.array([this.initProvinces()])
		});
	}

	initProvinces() {
		return this.fb.group({
			name: ['', []],
			districts: this.fb.array([this.initDistricts()])
		});
	}

	initDistricts() {
		return this.fb.group({
			name: ['', []]
			// streets: this.fb.array([
			// 	this.initStreets(),
			// ])
		});
	}

	// initStreets() {
	// 	return this.fb.group({
	// 		name: ['', []],
	// 	});
	// }

	pushItem(itemArrayFromFormArray: any, type: string) {
		switch (type) {
			case 'countries':
				itemArrayFromFormArray.get(type).push(this.initCountries());
				break;
			case 'cities':
				itemArrayFromFormArray.get(type).push(this.initCities());
				break;
			case 'regions':
				itemArrayFromFormArray.get(type).push(this.initRegions());
				break;
			case 'provinces':
				itemArrayFromFormArray.get(type).push(this.initProvinces());
				break;
			case 'districts':
				itemArrayFromFormArray.get(type).push(this.initDistricts());
				break;
			// case 'streets':
			// 	itemArrayFromFormArray.get(type).push(this.initStreets());
			// 	break;
		}
	}

	deleteItem(itemArrayFromFormArray: any, index: number, type: string) {
		itemArrayFromFormArray.get(type).removeAt(index);
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}

interface Address {
	countries: Country;
}

interface Country {
	name: string;
	cities: City[];
}

interface City {
	name: string;
	regions: Region[];
}

interface Region {
	name: string;
	provinces: Province[];
}

interface Province {
	name: string;
	districts: District[];
}

interface District {
	name: string;
	// streets: Street[];
}

// interface Street {
// 	name: string;
// }
