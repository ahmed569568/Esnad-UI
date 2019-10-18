import { Injectable } from '@angular/core';
import { RootService } from '@app/core/root.service';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends RootService {
  constructor(toast: ToastrService, router: Router, api: ApiRequestService, private us: UtilitiesService) {
    super(toast, router, api);
    this.lists['students-status'] = [{ id: 'active', name: 'active' }, { id: 'inactive', name: 'inactive' }];
    this.lists['students-gender'] = [{ id: 'male', name: 'male' }, { id: 'female', name: 'female' }];

    this.us.dialogActionObservable$.subscribe(data => {
      if (data) {
        if (data.optionValue) {
          return this.router.navigate([`${this.cid}/create`], { queryParams: { condition: 'new_parent' } });
        } else {
          return this.router.navigate([`${this.cid}/create`], { queryParams: { condition: 'exist_parent' } });
        }
      }
    });
  }

  routerPrefix(val: string = '') {
    return val ? val : 'students';
  }

  get featureProps(): ItemProps[] {
    return [
      {
        name: 'parent_full_name',
        prop: 'parent.name',
        listing: false,
        formField: true,
        formFieldType: 'text',
        required: true,
        condition: 'new_parent'
      },
      {
        name: 'parent_username',
        prop: 'parent.username',
        listing: true,
        formField: true,
        formFieldType: 'text',
        required: true,
        condition: 'new_parent'
      },
      {
        name: 'parent_phone',
        prop: 'parent.phone',
        listing: false,
        formField: true,
        formFieldType: 'text',
        required: true,
        condition: 'new_parent'
      },
      {
        name: 'parent_email',
        prop: 'parent.email',
        listing: false,
        formField: true,
        formFieldType: 'text',
        required: true,
        condition: 'new_parent'
      },
      {
        name: 'parent_password',
        prop: 'parent.password',
        listing: false,
        formField: true,
        formFieldType: 'password',
        required: true,
        condition: 'new_parent'
      },
      {
        name: 'parent_image',
        prop: 'parent.image',
        listing: false,
        displayType: 'image',
        formField: true,
        formFieldType: 'file_input',
        condition: 'new_parent'
      },
      {
        name: 'name',
        prop: 'name',
        listing: true,
        formField: true,
        formFieldType: 'text',
        required: true
      },
      {
        name: 'status',
        prop: 'student.status',
        listing: false,
        formField: true,
        formFieldType: 'select',
        listPrefix: 'students-status',
        required: true
      },
      {
        name: 'gender',
        prop: 'students.gender',
        listing: false,
        formField: true,
        formFieldType: 'select',
        listPrefix: 'students-gender',
        required: true
      },
      {
        name: 'image',
        prop: 'student.image',
        listing: false,
        displayType: 'image',
        formField: true,
        formFieldType: 'file_input'
      },
      {
        name: 'address',
        prop: 'location.address',
        listing: false,
        formField: true,
        formFieldType: 'text',
        required: true,
        initValue: { value: '', disabled: true }
      },
      {
        name: 'map',
        prop: 'map',
        listing: false,
        formField: true,
        formFieldType: 'map'
      }
      // {
      //   name: 'lat',
      //   prop: 'lat',
      //   listing: false,
      //   formField: true
      // },
      // {
      //   name: 'lng',
      //   prop: 'lng',
      //   listing: false,
      //   formField: true
      // }
    ];
  }
}
