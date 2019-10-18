import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';

@NgModule({
  imports: [TranslateModule, CoreModule, SharedModule, FlexLayoutModule, MaterialModule, DashboardRoutingModule],
  declarations: [DashboardComponent, VehiclesListComponent]
})
export class DashboardModule {}
