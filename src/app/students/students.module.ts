import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { extract } from '@app/core';

@NgModule({
  declarations: [StudentsListComponent, StudentsFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: extract('vehicles.title') },
        component: StudentsListComponent,
        children: [
          {
            path: 'create',
            component: StudentsFormComponent
          },
          {
            path: 'edit/:id',
            component: StudentsFormComponent
          }
        ]
      }
    ])
  ]
})
export class StudentsModule {}
