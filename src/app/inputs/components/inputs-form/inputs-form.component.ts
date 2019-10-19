import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UtilitiesService} from '@app/shared/services/utilities.service';
import {InputsService} from '@app/inputs/inputs.service';

@Component({
	selector: 'app-drivers-form',
	templateUrl: './inputs-form.component.html'
})
export class InputsFormComponent implements OnInit, OnDestroy {

	form: FormGroup;

	constructor(
		public service: InputsService,
		private fb: FormBuilder,
		activatedRoute: ActivatedRoute,
		private utilities: UtilitiesService
	) {

	}


	ngOnInit() {
		this.form = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			countries: this.fb.array([
				this.initCountries(),
			])
		});
	}

	initCountries() {
		return this.fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			cities: this.fb.array([
				this.initCities(),
			])
		});
	}

	initCities() {
		return this.fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			regions: this.fb.array([
				this.initRegions(),
			])
		});
	}

	initRegions() {
		return this.fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			provinces: this.fb.array([
				this.initProvinces(),
			])
		});
	}

	initProvinces() {
		return this.fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			districts: this.fb.array([
				this.initDistricts(),
			])
		});
	}

	initDistricts() {
		return this.fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
			streets: this.fb.array([
				this.initStreets(),
			])
		});
	}

	initStreets() {
		return this.fb.group({
			name: ['', [Validators.required, Validators.minLength(5)]],
		});
	}

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
			case 'streets':
				itemArrayFromFormArray.get(type).push(this.initStreets());
				break;
		}
	}

	deleteItem(itemArrayFromFormArray: any, index: number, type: string) {
		itemArrayFromFormArray.get(type).removeAt(index);
	}

	ngOnDestroy(): void {
	}

}

interface Address {
	countries: Country
}

interface Country {
	name: string;
	cities: City[]
}

interface City {
	name: string;
	regions: Region[]
}

interface Region {
	name: string;
	provinces: Province[]
}

interface Province {
	name: string;
	districts: District[]
}

interface District {
	name: string;
	streets: Street[];
}

interface Street {
	name: string;
}
