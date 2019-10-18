import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsListComponent} from './components/groups-list/groups-list.component';
import {GroupsFormComponent} from './components/groups-form/groups-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';

@NgModule({
	declarations: [GroupsListComponent, GroupsFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('groups.title')},
				component: GroupsListComponent,
				children: [
					{
						path: 'create',
						component: GroupsFormComponent
					},
					{
						path: 'edit/:id',
						component: GroupsFormComponent
					}
				]
			}
		])
	]
})
export class GroupsModule {
}
