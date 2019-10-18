import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { VehiclesService } from '@app/vehicles/vehicles.service';

@Component({
  selector: 'app-branches-list',
  templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class VehiclesListComponent extends CoreListComponent implements OnInit {
  constructor(service: VehiclesService, us: UtilitiesService, router: Router) {
    super(service, us, router);
    this.listOptions.searchable = true;
    this.listOptions.listTypes = ['All', 'Link Driver', 'Not Linked', 'Child', 'Not Child'];
  }

  ngOnInit() {
    return super.ngOnInit();
  }
}
