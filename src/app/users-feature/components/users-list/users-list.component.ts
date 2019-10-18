import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { UsersService } from '@app/users-feature/users.service';

@Component({
  selector: 'app-branches-list',
  templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class UsersListComponent extends CoreListComponent implements OnInit {
  constructor(service: UsersService, us: UtilitiesService, router: Router) {
    super(service, us, router);
    this.listOptions = {
      ...this.listOptions,
      searchable: true
    };
  }

  ngOnInit() {
    return super.ngOnInit();
  }
}
