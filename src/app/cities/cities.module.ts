import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CitiesListComponent} from './components/cities-list/cities-list.component';
import {CitiesFormComponent} from './components/cities-form/cities-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';
import {RouterContainerComponent} from '@app/shared/components/router-container-component';

@NgModule({
	declarations: [CitiesListComponent, CitiesFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: RouterContainerComponent,
				data: {title: extract('cities.title')},
				children: [
					{
						path: 'list',
						component: CitiesListComponent
					},
					{
						path: 'create',
						component: CitiesFormComponent
					},
					{
						path: 'edit/:id',
						component: CitiesFormComponent
					}
				]
			},
		])
	]
})
export class CitiesModule {
}
