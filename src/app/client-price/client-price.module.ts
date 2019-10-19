import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPriceListComponent } from './components/client-price-list/client-price-list.component';
import { ClientPriceFormComponent } from './components/client-price-form/client-price-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { extract } from '@app/core';

@NgModule({
	declarations: [ClientPriceListComponent, ClientPriceFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				data: { title: extract('drivers.title') },
				component: ClientPriceListComponent,
				children: [
					{
						path: 'create',
						component: ClientPriceFormComponent
					},
					{
						path: 'edit/:id',
						component: ClientPriceFormComponent
					}
				]
			}
		])
	]
})
export class ClientPriceModule {}
