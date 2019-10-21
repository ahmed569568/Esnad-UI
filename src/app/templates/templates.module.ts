import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';
import { TemplatesFormComponent } from './components/templates-form/templates-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { extract } from '@app/core';
import { RouterContainerComponent } from '@app/shared/components/router-container-component';

@NgModule({
	declarations: [TemplatesListComponent, TemplatesFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: { title: extract('templates.title') },
				component: RouterContainerComponent,
				children: [
					{
						path: 'list',
						component: TemplatesListComponent
					},
					{
						path: 'create',
						component: TemplatesFormComponent
					},
					{
						path: 'edit/:id',
						component: TemplatesFormComponent
					}
				]
			}
		])
	]
})
export class TemplatesModule {}
