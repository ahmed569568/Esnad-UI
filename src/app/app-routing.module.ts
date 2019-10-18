import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { UsersProfileComponent } from '@app/users-feature/components/users-profile/users-profile.component';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'profile/:id',
      component: UsersProfileComponent
    },
    {
      path: 'drivers',
      loadChildren: './drivers/drivers.module#DriversModule'
    },
    {
      path: 'vehicles',
      loadChildren: './vehicles/vehicles.module#VehiclesModule'
    },
    {
      path: 'users',
      loadChildren: './users-feature/users.module#UsersModule'
    },
    {
      path: 'roles',
      loadChildren: './roles-feature/roles.module#RolesModule'
    },
    {
      path: 'students',
      loadChildren: './students/students.module#StudentsModule'
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
  declarations: [UsersProfileComponent]
})
export class AppRoutingModule {}
