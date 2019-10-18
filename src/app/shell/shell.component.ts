import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { MenuItems } from '../menuItems';
import { AuthenticationService, CredentialsService, I18nService } from '@app/core';
import { environment } from '@env/environment';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  menuItems = new MenuItems();
  environment = environment;
  isWide = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private media: MediaObserver,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService,
    private us: UtilitiesService
  ) {}

  ngOnInit() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  // get username(): string | null {
  //   const credentials = this.credentialsService.credentials;
  //   return credentials ? credentials.username : null;
  // }

  toggleLanguage() {
    if (this.currentLang === 'en-US') {
      this.setLanguage('ar-SA');
      this.us.changeLanguage('ar-SA');
    } else {
      this.setLanguage('en-US');
      this.us.changeLanguage('en-US');
    }
  }

  get currentLang(): string {
    return this.i18nService.language;
  }

  // get languages(): string[] {
  //   return this.i18nService.supportedLanguages;
  // }

  // get isMobile(): boolean {
  //   return this.media.isActive('xs') || this.media.isActive('sm');
  // }

  get title(): string {
    return this.titleService.getTitle();
  }

  toggleSidenavSize() {
    if (!this.isWide) {
      this.isWide = true;
      console.log('wide', this.isWide);
    } else {
      this.isWide = false;
      console.log('narrow', this.isWide);
    }
  }
}
