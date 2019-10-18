import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { extract } from '@app/core';

@NgModule({
  declarations: [RolesListComponent, RolesFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: extract('roles.title') },
        component: RolesListComponent,
        children: [
          {
            path: 'create',
            component: RolesFormComponent
          },
          {
            path: 'edit/:id',
            component: RolesFormComponent
          }
        ]
      }
    ])
  ]
})
export class RolesModule {}
