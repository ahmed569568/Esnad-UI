import { Injectable } from '@angular/core';
import { RootService } from '@app/core/root.service';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ItemProps } from '@app/interfaces';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends RootService {
  constructor(toast: ToastrService, router: Router, api: ApiRequestService) {
    super(toast, router, api);
  }

  routerPrefix(val: string = '') {
    return val ? val : 'roles';
  }

  get featureProps(): ItemProps[] {
    return [
      {
        name: 'role',
        prop: 'role',
        listing: true,
        formField: true,
        formFieldType: 'text',
        required: true
      },
      {
        name: 'permissions',
        prop: 'permissions',
        listing: false,
        formField: true,
        formFieldType: 'text',
        required: true
      }
    ];
  }
}
