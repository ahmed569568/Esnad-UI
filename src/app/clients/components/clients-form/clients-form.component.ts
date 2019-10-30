import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreFormComponent } from '@app/core/components/core-form/core-form.component';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { ClientsService } from '@app/clients/clients.service';

@Component({
	selector: 'app-clients-form',
	templateUrl: './clients-form.component.html',
	styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent extends CoreFormComponent
	implements OnInit, OnDestroy {
	constructor(
		service: ClientsService,
		fb: FormBuilder,
		activatedRoute: ActivatedRoute,
		private utilities: UtilitiesService
	) {
		super(service, fb, activatedRoute, utilities);
	}

	initLists() {
		this.lists = [
			{
				[`${this.service.cid}/price`]: 1
			}
		];
	}

	// refactorItem(item: any): any {
	//   super.refactorItem(item);
	//   /**
	//    * Set value of selected items
	//    */
	//   const selectedUsers = [];
	//   for (const user of item.users) {
	//     selectedUsers.push(user.user_id);
	//   }
	//   this.form.controls.branch_managers.setValue(selectedUsers); // Final Return
	//   return item;
	// }

	get lists() {
		return this._lists;
	}

	set lists(value: any) {
		this._lists = value;
	}

	ngOnInit() {
		super.ngOnInit();
		this.form.addControl(
			'client_price',
			this.fb.array([this.initClientPrice()])
		);
	}

	patchFormValue(form: any): void {
		let client_price = <FormArray>this.form.controls.client_price;
		form['client_price'].forEach((i: any, index: any) => {
			if (index !== 0) {
				client_price.push(this.initClientPrice());
			}
		});
		this.form.patchValue(form);
	}

	get clientPrices() {
		return this.form.get('client_price') as FormArray;
	}

	initClientPrice() {
		return this.fb.group({
			price_id: ['', []],
			cost: ['', []]
		});
	}

	pushItem() {
		this.clientPrices.push(this.initClientPrice());
	}

	deleteItem(index: number) {
		this.clientPrices.removeAt(index);
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
