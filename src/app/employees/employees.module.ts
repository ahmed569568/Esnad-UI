import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { extract } from '@app/core';
import { RouterContainerComponent } from '@app/shared/components/router-container-component';

@NgModule({
	declarations: [EmployeesListComponent, EmployeesFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: { title: extract('clients.title') },
				component: RouterContainerComponent,
				children: [
					{
						path: 'list',
						component: EmployeesListComponent
					},
					{
						path: 'create',
						component: EmployeesFormComponent
					},
					{
						path: 'edit/:id',
						component: EmployeesFormComponent
					}
				]
			}
		])
	]
})
export class EmployeesModule {}
