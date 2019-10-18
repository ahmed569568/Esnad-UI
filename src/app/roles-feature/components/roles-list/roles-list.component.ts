import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { RolesService } from '@app/roles-feature/roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class RolesListComponent extends CoreListComponent implements OnInit {
  constructor(service: RolesService, us: UtilitiesService, router: Router) {
    super(service, us, router);
  }

  ngOnInit() {
    return super.ngOnInit();
  }
}
