import { Injectable } from '@angular/core';
import { RootService } from '@app/core/root.service';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { CustomValidators } from '@app/core/classes/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class DriversService extends RootService {
  constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
    super(toast, router, api);
  }

  routerPrefix(val: string = '') {
    return val ? val : 'drivers';
  }

  get featureProps(): ItemProps[] {
    return [
      {
        name: 'image',
        prop: 'image',
        listing: true,
        formField: true,
        displayType: 'image',
        formFieldType: 'file_input',
        required: true,
        width: 300,
        validations: [Validators.required]
      },
      {
        name: 'name',
        prop: 'name',
        listing: true,
        formField: true,
        formFieldType: 'text',
        required: true,
        width: 300,
        validations: [Validators.required]
      },
      {
        name: 'phone',
        prop: 'phone',
        listing: true,
        formField: true,
        formFieldType: 'phone',
        required: true,
        width: 300,
        validations: [Validators.required]
      },
      // {
      //   name: 'email',
      //   prop: 'email',
      //   listing: true,
      //   formField: true,
      //   formFieldType: 'email',
      //   required: true,
      //   width: 300
      // },
      {
        name: 'password',
        prop: 'password',
        listing: false,
        formField: true,
        formFieldType: 'password',
        required: true,
        validations: [Validators.required, CustomValidators.validPassword]
      },
      {
        name: 'language_id',
        prop: 'language.name',
        listing: true,
        formField: true,
        formFieldType: 'select',
        listPrefix: 'drivers-languages',
        width: 300,
        validations: [Validators.required]
      }
    ];
  }
}
