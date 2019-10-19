import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreFormComponent } from '@app/core/components/core-form/core-form.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { OrdersService } from '@app/orders/orders.service';

@Component({
	selector: 'app-drivers-form',
	templateUrl: '../../../core/components/core-form/core-form.component.html'
})
export class OrdersFormComponent extends CoreFormComponent
	implements OnInit, OnDestroy {
	constructor(
		service: OrdersService,
		fb: FormBuilder,
		activatedRoute: ActivatedRoute,
		private utilities: UtilitiesService
	) {
		super(service, fb, activatedRoute, utilities);
	}

	initLists() {
		this.lists = [{ ['drivers/languages']: 1 }];
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
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
