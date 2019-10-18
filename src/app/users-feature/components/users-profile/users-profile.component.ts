import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreFormComponent } from '../../../core/components/core-form/core-form.component';
import { UsersService } from '../../users.service';
import { FormBuilder } from '@angular/forms';
import { UtilitiesService } from '../../../shared/services/utilities.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent extends CoreFormComponent implements OnInit {
  environment = environment;

  constructor(
    service: UsersService,
    fb: FormBuilder,
    activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService
  ) {
    super(service, fb, activatedRoute, utilities);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.form.controls.image.valueChanges.subscribe(image => {
      if (image && image.length > 100) {
        setTimeout(() => {
          return this.formSubmission(true);
        }, 500);
      }
    });
    this.form.controls.name.disable();
    this.form.controls.email.disable();
    this.form.controls.password.disable();
  }

  refactorItem(item: any): any {
    this.item = item;
    return item;
  }

  enableEditing(field: string) {
    this.form.controls[field].enable();
  }

  prepareFormAfterSubmit() {
    if (this.form.controls.image.value && this.form.controls.image.value.length < 100) {
      return this.form.controls.image.setValue(null);
    }
  }
}
