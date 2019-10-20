import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldsListComponent} from './components/form-fields-list/form-fields-list.component';
import {FormFieldsFormComponent} from './components/form-fields-form/form-fields-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';
import {RouterContainerComponent} from '@app/shared/components/router-container-component';

@NgModule({
	declarations: [FormFieldsListComponent, FormFieldsFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('form_fields.title')},
				component: RouterContainerComponent,
				children: [
					{
						path: 'list',
						component: FormFieldsListComponent
					},
					{
						path: 'create',
						component: FormFieldsFormComponent
					},
					{
						path: 'edit/:id',
						component: FormFieldsFormComponent
					}
				]
			}
		])
	]
})
export class FormFieldsModule {
}
