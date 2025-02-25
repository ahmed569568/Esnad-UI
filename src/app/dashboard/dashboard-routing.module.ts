import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { DashboardComponent } from '@app/dashboard/dashboard.component';

const routes: Routes = [
	Shell.childRoutes([
		{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
		{
			path: 'dashboard',
			component: DashboardComponent,
			data: { title: extract('Dashboard') }
		}
	])
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class DashboardRoutingModule {}
