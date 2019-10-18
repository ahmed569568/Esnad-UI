import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';
import { DriversFormComponent } from './components/drivers-form/drivers-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { extract } from '@app/core';

@NgModule({
  declarations: [DriversListComponent, DriversFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: extract('drivers.title') },
        component: DriversListComponent,
        children: [
          {
            path: 'create',
            component: DriversFormComponent
          },
          {
            path: 'edit/:id',
            component: DriversFormComponent
          }
        ]
      }
    ])
  ]
})
export class DriversModule {}
