import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsListComponent} from './components/clients-list/clients-list.component';
import {ClientsFormComponent} from './components/clients-form/clients-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';

@NgModule({
	declarations: [ClientsListComponent, ClientsFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('clients.title')},
				component: ClientsListComponent,
				children: [
					{
						path: 'create',
						component: ClientsFormComponent
					},
					{
						path: 'edit/:id',
						component: ClientsFormComponent
					}
				]
			}
		])
	]
})
export class ClientsModule {
}
