import { Injectable } from '@angular/core';
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';

import { Logger } from '@app/core/logger.service';
import { CredentialsService } from '@app/core/authentication/credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
	providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
	constructor(
		private router: Router,
		private credentialsService: CredentialsService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (this.credentialsService.isAuthenticated()) {
			return true;
		}

		log.debug('Not authenticated, redirecting and adding redirect url...');
		this.router.navigate(['/login'], {
			queryParams: { redirect: state.url },
			replaceUrl: true
		});
		return false;
	}
}
