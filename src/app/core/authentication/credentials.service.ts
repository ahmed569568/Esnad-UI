import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

export interface Credentials {
  id?: number;
  token?: string;
}

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  userSubject: Subject<any> = new Subject();
  permissionSubject: ReplaySubject<any> = new ReplaySubject();

  private _credentials: Credentials | null = null;
  private _permissions = '';

  static checkPermissions(permissionKey: string) {
    const userPermissions = JSON.parse(localStorage.getItem('permissions'));
    const userPermission = permissionKey.split('-');
    for (const perm of Object.keys(JSON.parse(userPermissions))) {
      if (perm === userPermission[0]) {
        if (userPermissions[perm]) {
          return userPermissions[perm].indexOf(userPermission[1]) > -1;
        }
      }
    }
  }

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setPermissions(permissions: string) {
    const permissionsKey = 'permissions';
    this._permissions = permissions || null;
    if (permissions) {
      localStorage.setItem(permissionsKey, JSON.stringify(permissions));
      this.permissionSubject.next();
    } else {
      sessionStorage.removeItem(permissionsKey);
      localStorage.removeItem(permissionsKey);
    }
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      this.userSubject.next();
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
