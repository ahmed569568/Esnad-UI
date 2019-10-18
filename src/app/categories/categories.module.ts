import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {CategoriesFormComponent} from './components/categories-form/categories-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';

@NgModule({
	declarations: [CategoriesListComponent, CategoriesFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
				data: {title: extract('drivers.title')},
				component: CategoriesListComponent,
        children: [
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
