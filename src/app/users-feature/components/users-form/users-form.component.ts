import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreFormComponent } from '@app/core/components/core-form/core-form.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/users-feature/users.service';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Component({
  selector: 'app-users-form',
  templateUrl: '../../../core/components/core-form/core-form.component.html'
})
export class UsersFormComponent extends CoreFormComponent implements OnInit, OnDestroy {
  constructor(
    service: UsersService,
    fb: FormBuilder,
    activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService
  ) {
    super(service, fb, activatedRoute, utilities);
  }

  initLists() {
    this.lists = [{ roles: 1 }];
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

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  prepareFormAfterSubmit() {
    if (this.form.controls.image.value && this.form.controls.image.value.length < 100) {
      return this.form.controls.image.setValue(null);
    }
  }
}
