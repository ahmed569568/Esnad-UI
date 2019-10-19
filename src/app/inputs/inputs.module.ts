import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';
import {InputsFormComponent} from '@app/inputs/components/inputs-form/inputs-form.component';

@NgModule({
	declarations: [InputsFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('inputs.title')},
				component: InputsFormComponent
			}
		])
	]
})
export class InputsModule {
}
