import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ShellModule } from './shell/shell.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketService } from '@app/core/http/socket.service';
import { MatIconRegistry } from '@angular/material';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		TranslateModule.forRoot(),
		BrowserAnimationsModule,
		MaterialModule,
		CoreModule,
		SharedModule,
		ShellModule,
		DashboardModule,
		AuthModule,
		AppRoutingModule // must be imported as the last module as it contains the fallback route
	],
	declarations: [AppComponent],
	providers: [SocketService],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(
		matIconRegistry: MatIconRegistry,
		domSanitizer: DomSanitizer,
		public socket: SocketService
	) {
		matIconRegistry.addSvgIconSet(
			domSanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg')
		); // Or whatever path you placed mdi.svg at
		// this.socket.connect();
	}
}
