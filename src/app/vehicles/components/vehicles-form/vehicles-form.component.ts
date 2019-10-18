import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreFormComponent } from '@app/core/components/core-form/core-form.component';
import { VehiclesService } from '@app/vehicles/vehicles.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Component({
  selector: 'app-buses-form',
  templateUrl: '../../../core/components/core-form/core-form.component.html'
})
export class VehiclesFormComponent extends CoreFormComponent implements OnInit, OnDestroy {
  constructor(
    service: VehiclesService,
    fb: FormBuilder,
    activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService
  ) {
    super(service, fb, activatedRoute, utilities);
  }

  initLists() {
    this.lists = [
      {
        ['vehicles/drivers']: 1
      },
      {
        ['vehicles/groups']: 1
      },
      {
        ['vehicles/warehouses']: 1
      },
      // {
      //   ['vehicles/clients']: 1
      // },
      {
        ['vehicles/locations']: 1
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
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
