import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationTypeListComponent } from './components/evaluation-type-list/evaluation-type-list.component';
import { EvaluationTypeFormComponent } from './components/evaluation-type-form/evaluation-type-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { extract } from '@app/core';
import { RouterContainerComponent } from '@app/shared/components/router-container-component';

@NgModule({
	declarations: [EvaluationTypeListComponent, EvaluationTypeFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: { title: extract('evaluation_type.title') },
				component: RouterContainerComponent,
				children: [
					{
						path: 'list',
						component: EvaluationTypeListComponent
					},
					{
						path: 'create',
						component: EvaluationTypeFormComponent
					},
					{
						path: 'edit/:id',
						component: EvaluationTypeFormComponent
					}
				]
			}
		])
	]
})
export class EvaluationTypeModule {}
