import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ApiResponse } from '@app/interfaces';
import { map } from 'rxjs/operators';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private api: ApiRequestService) {}

  get token(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.token : null;
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext) {
    // Replace by proper authentication call
    const data = {
      email: context.email,
      password: context.password
    };
    return this.api.post('login', data).pipe(
      map((resp: ApiResponse) => {
        if (resp.status_code === 200) {
          const credentials = {
            // id: resp.response.id,
            token: resp.response.user_token.access_token
          };
          this.credentialsService.setCredentials(credentials, context.remember);
        }
        return resp;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  reset(data: any) {
    return this.api.post('users/reset-code', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
