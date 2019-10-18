import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsListComponent} from './components/forms-list/forms-list.component';
import {FormsFormComponent} from './components/forms-form/forms-form.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {extract} from '@app/core';

@NgModule({
	declarations: [FormsListComponent, FormsFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
				data: {title: extract('forms.title')},
				component: FormsListComponent,
        children: [
          {
            path: 'create',
						component: FormsFormComponent
          },
          {
            path: 'edit/:id',
						component: FormsFormComponent
          }
        ]
      }
    ])
  ]
})
export class FormsModule {
}
