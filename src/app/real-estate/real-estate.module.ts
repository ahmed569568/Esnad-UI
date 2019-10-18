import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RealEstateListComponent} from './components/real-estate-list/real-estate-list.component';
import {RealEstateFormComponent} from './components/real-estate-form/real-estate-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';

@NgModule({
	declarations: [RealEstateListComponent, RealEstateFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('drivers.title')},
				component: RealEstateListComponent,
				children: [
					{
						path: 'create',
						component: RealEstateFormComponent
					},
					{
						path: 'edit/:id',
						component: RealEstateFormComponent
					}
				]
			}
		])
	]
})
export class RealEstateModule {
}
