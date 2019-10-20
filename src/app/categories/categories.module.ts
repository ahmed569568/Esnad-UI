import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {CategoriesFormComponent} from './components/categories-form/categories-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';
import {RouterContainerComponent} from '@app/shared/components/router-container-component';

@NgModule({
	declarations: [CategoriesListComponent, CategoriesFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('categories.title')},
				component: RouterContainerComponent,
				children: [
					{
						path: 'list',
						component: CategoriesListComponent
					},
					{
						path: 'create',
						component: CategoriesFormComponent
					},
					{
						path: 'edit/:id',
						component: CategoriesFormComponent
					}
				]
			}
		])
	]
})
export class CategoriesModule {
}
