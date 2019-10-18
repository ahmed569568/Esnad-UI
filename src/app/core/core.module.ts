import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RouteReusableStrategy } from './route-reusable-strategy';
import { HttpService } from './http/http.service';
import { CoreListComponent } from './components/core-list/core-list.component';
import { CoreFormComponent } from './components/core-form/core-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreViewComponent } from './components/core-view/core-view.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, RouterModule, SharedModule],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ],
  declarations: [CoreListComponent, CoreFormComponent, CoreViewComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
