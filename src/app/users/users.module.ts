import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UsersFormComponent} from './components/users-form/users-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';
import {RouterContainerComponent} from '@app/shared/components/router-container-component';

@NgModule({
	declarations: [UsersListComponent, UsersFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('users.title')},
				component: RouterContainerComponent,
				children: [
					{
						path: 'list',
						component: UsersListComponent
					},
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
	]
})
export class UsersModule {
}
