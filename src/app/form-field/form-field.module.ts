import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldListComponent} from './components/form-field-list/form-field-list.component';
import {FormFieldFormComponent} from './components/form-field-form/form-field-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';

@NgModule({
	declarations: [FormFieldListComponent, FormFieldFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('form_field.title')},
				component: FormFieldListComponent,
				children: [
					{
						path: 'create',
						component: FormFieldFormComponent
					},
					{
						path: 'edit/:id',
						component: FormFieldFormComponent
					}
				]
			}
		])
	]
})
export class FormFieldModule {
}
