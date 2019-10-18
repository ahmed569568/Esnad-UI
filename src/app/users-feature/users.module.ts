import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { UsersListComponent } from '@app/users-feature/components/users-list/users-list.component';
import { UsersFormComponent } from '@app/users-feature/components/users-form/users-form.component';
import { extract } from '@app/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: extract('users.title') },
        component: UsersListComponent,
        children: [
          {
            path: 'create',
            component: UsersFormComponent
          },
          {
            path: 'edit/:id',
            component: UsersFormComponent
          }
        ]
      }
    ])
  ],
  declarations: [UsersFormComponent, UsersListComponent]
})
export class UsersModule {}
