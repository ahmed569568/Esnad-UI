import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreFormComponent } from '@app/core/components/core-form/core-form.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from '@app/roles-feature/roles.service';
import { RolesClass } from '@app/permissions';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent extends CoreFormComponent implements OnInit, OnDestroy {
  allPermissions = [
    { text: 'add', checked: false },
    { text: 'delete', checked: false },
    { text: 'list', checked: false },
    { text: 'update', checked: false },
    { text: 'view', checked: false }
  ];
  permissions: any[];
  permissionsModel = {};

  constructor(
    service: RolesService,
    fb: FormBuilder,
    activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService
  ) {
    super(service, fb, activatedRoute, utilities);

    this.permissionsModel = new RolesClass();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  refactorItem(data: any) {
    const templates = JSON.parse(data.permissions);
    // this.checkAllPermissions(templates);
    for (const row of Object.keys(templates)) {
      for (const permission of Object.keys(this.permissionsModel[row])) {
        this.permissionsModel[row][permission] = templates[row].indexOf(permission) > -1;
      }
    }
    return data;
  }

  setCategories() {
    const data = {};
    for (const item of Object.keys(this.permissionsModel)) {
      const permissions = [];
      for (const perm of Object.keys(this.permissionsModel[item])) {
        if (this.permissionsModel[item][perm]) {
          permissions.push(perm);
        }
      }
      data[item] = permissions;
    }
    return this.form.controls.permissions.setValue(data);
  }

  inputAction(template: any, permission: any, value: boolean) {
    this.permissionsModel[template][permission] = value;
    if (!status) {
      this.allPermissions.map(x => {
        if (x.text === permission) {
          x.checked = false;
        }
      });
    }
  }

  checkAllPermissions(permissions: any) {
    this.allPermissions.map(x => {
      const all = [];
      for (const category of Object.keys(permissions)) {
        permissions[category].map((y: string) => {
          if (y === x.text) {
            all.push(y);
            if (all.length === Object.keys(permissions).length) {
              x.checked = true;
            }
          }
        });
      }
    });
  }

  selectAll(permission: any) {
    const type = permission.text;
    const permissions = Object.entries(this.permissionsModel);
    permissions.map(x => {
      for (const action of Object.keys(x[1])) {
        if (action === type) {
          x[1][type] = permission.checked;
        }
      }
    });
    return;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
