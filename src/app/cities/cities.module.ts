import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CitiesListComponent} from './components/cities-list/cities-list.component';
import {CitiesFormComponent} from './components/cities-form/cities-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';

@NgModule({
	declarations: [CitiesListComponent, CitiesFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('cities.title')},
				component: CitiesListComponent,
				children: [
					{
						path: 'create',
						component: CitiesFormComponent
					},
					{
						path: 'edit/:id',
						component: CitiesFormComponent
					}
				]
			}
		])
	]
})
export class CitiesModule {
}
