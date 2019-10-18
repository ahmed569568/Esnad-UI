import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {Shell} from '@app/shell/shell.service';
import {SharedModule} from '@app/shared/shared.module';

const routes: Routes = [
	Shell.childRoutes([
		{
			path: 'categories',
			loadChildren: './categories/categories.module#CategoriesModule'
		},
		{
			path: 'cities',
			loadChildren: './cities/cities.module#CitiesModule'
		},
		{
			path: 'client-price',
			loadChildren: './client-price/client-price.module#ClientPriceModule'
		},
		{
			path: 'employees',
			loadChildren: './employees/employees.module#EmployeesModule'
		},
		{
			path: 'clients',
			loadChildren: './clients/clients.module#ClientsModule'
		},
		{
			path: 'evaluation-type',
			loadChildren: './evaluation-type/evaluation-type.module#EvaluationTypeModule'
		},
		{
			path: 'form-field',
			loadChildren: './form-field/form-field.module#FormFieldModule'
		},
		{
			path: 'form-fields',
			loadChildren: './form-fields/form-fields.module#FormFieldsModule'
		},
		{
			path: 'forms',
			loadChildren: './forms/forms.module#FormsModule'
		},
		{
			path: 'groups',
			loadChildren: './groups/groups.module#GroupsModule'
		},
		{
			path: 'orders',
			loadChildren: './orders/orders.module#OrdersModule'
		}, {
			path: 'prices',
			loadChildren: './prices/prices.module#PricesModule'
		}, {
			path: 'real-estate',
			loadChildren: './real-estate/real-estate.module#RealEstateModule'
		}, {
			path: 'roles',
			loadChildren: './roles/roles.module#RolesModule'
		}, {
			path: 'templates',
			loadChildren: './templates/templates.module#TemplatesModule'
		}, {
			path: 'treatments',
			loadChildren: './treatments/treatments.module#TreatmentsModule'
		}, {
			path: 'users',
			loadChildren: './users/users.module#UsersModule'
		},
	]),
	// Fallback when no prior route is matched
	{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}), SharedModule],
	exports: [RouterModule],
	providers: [],
	declarations: []
})
export class AppRoutingModule {
}
