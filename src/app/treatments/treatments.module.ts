import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreatmentsListComponent } from './components/treatments-list/treatments-list.component';
import { TreatmentsFormComponent } from './components/treatments-form/treatments-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { extract } from '@app/core';

@NgModule({
	declarations: [TreatmentsListComponent, TreatmentsFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: { title: extract('drivers.title') },
				component: TreatmentsListComponent,
				children: [
					{
						path: 'create',
						component: TreatmentsFormComponent
					},
					{
						path: 'edit/:id',
						component: TreatmentsFormComponent
					}
				]
			}
		])
	]
})
export class TreatmentsModule {}
