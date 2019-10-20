import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersListComponent} from './components/orders-list/orders-list.component';
import {OrdersFormComponent} from './components/orders-form/orders-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';
import {RouterContainerComponent} from '@app/shared/components/router-container-component';

@NgModule({
	declarations: [OrdersListComponent, OrdersFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: {title: extract('orders.title')},
				component: RouterContainerComponent,
				children: [
					{
						path: 'list',
						component: OrdersListComponent
					},
					{
						path: 'create',
						component: OrdersFormComponent
					},
					{
						path: 'edit/:id',
						component: OrdersFormComponent
					}
				]
			}
		])
	]
})
export class OrdersModule {
}
