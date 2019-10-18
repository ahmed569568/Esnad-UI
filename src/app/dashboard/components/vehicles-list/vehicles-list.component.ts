import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { DashboardService } from '@app/dashboard/dashboard.service';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class VehiclesListComponent extends CoreListComponent implements OnInit {
  constructor(service: DashboardService, utilitiesService: UtilitiesService) {
    super(service, utilitiesService);
    this.listOptions.pagination = false;
    this.listOptions.searchable = false;
    this.listOptions.add = false;
  }

  ngOnInit() {
    return super.ngOnInit();
  }
}
