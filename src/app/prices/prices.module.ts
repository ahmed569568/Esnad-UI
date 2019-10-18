import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PricesListComponent} from './components/prices-list/prices-list.component';
import {PricesFormComponent} from './components/prices-form/prices-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';

@NgModule({
	declarations: [PricesListComponent, PricesFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('prices.title')},
				component: PricesListComponent,
				children: [
					{
						path: 'create',
						component: PricesFormComponent
					},
					{
						path: 'edit/:id',
						component: PricesFormComponent
					}
				]
			}
		])
	]
})
export class PricesModule {
}
