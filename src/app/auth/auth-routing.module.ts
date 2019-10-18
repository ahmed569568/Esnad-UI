import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { LoginComponent, ResetComponent } from './components';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  { path: 'reset', component: ResetComponent, data: { title: extract('Reset Password') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule {
  static components = [LoginComponent, ResetComponent];
}
