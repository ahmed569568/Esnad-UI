import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {Shell} from '@app/shell/shell.service';
import {SharedModule} from '@app/shared/shared.module';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'drivers',
			loadChildren: './drivers/drivers.module#CategoriesModule'
    },
    {
      path: 'roles',
			loadChildren: './roles/roles.module#RolesModule'
    },
    {
      path: 'settings',
      loadChildren: './settings/settings.module#SettingsModule'
    }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), SharedModule],
  exports: [RouterModule],
  providers: [],
	declarations: []
})
export class AppRoutingModule {}
