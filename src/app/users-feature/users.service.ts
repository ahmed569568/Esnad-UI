import { Injectable } from '@angular/core';
import { RootService } from '@app/core/root.service';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '@app/core/classes/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends RootService {
  constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
    super(toast, router, api);
  }

  routerPrefix(val: string = '') {
    return val ? val : 'users';
  }

  get featureProps(): ItemProps[] {
    return [
      {
        name: 'image',
        prop: 'image',
        listing: true,
        displayType: 'image',
        imagePath: 'userImagesPath',
        formField: true,
        formFieldType: 'file_input',
        required: false
      },
      {
        name: 'name',
        prop: 'name',
        listing: true,
        formField: true,
        formFieldType: 'text',
        required: true,
        width: 200
      },
      {
        name: 'username',
        prop: 'username',
        listing: true,
        formField: true,
        formFieldType: 'text',
        required: true,
        width: 200
      },
      {
        name: 'email',
        prop: 'email',
        listing: true,
        formField: true,
        formFieldType: 'email',
        required: true,
        width: 200,
        validations: [CustomValidators.validEmail]
      },
      {
        name: 'password',
        prop: 'password',
        listing: false,
        formField: true,
        formFieldType: 'password',
        required: true,
        validations: [CustomValidators.validPassword]
      },
      {
        name: 'branch',
        prop: 'branch_name',
        listing: false,
        formField: false,
        formFieldType: 'select',
        listPrefix: 'branches'
      },
      {
        name: 'role_id',
        prop: 'role.role',
        listing: true,
        formField: true,
        formFieldType: 'select',
        listPrefix: 'roles',
        required: true
      },
      {
        name: 'phone',
        prop: 'phone',
        listing: true,
        formField: true,
        formFieldType: 'text',
        required: false
      }
    ];
  }
}
