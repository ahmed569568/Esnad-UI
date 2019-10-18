import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  forgetForm!: FormGroup;
  isLoading = false;
  forgotPassword: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private api: ApiRequestService,
    protected toast: ToastrService,
    private translate: TranslateService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.createForm();
    this.createForgetForm();
  }

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    return this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  createForgetForm() {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }
  resetPassword() {
    if (!this.forgetForm.valid) {
      return;
    }
    this.api.post('users/forgot', this.forgetForm.value, []).subscribe(
      response => {
        // @ts-ignore
        if (response.message) {
          this.translate.get(['auth.forget.email-sent', 'common.success']).subscribe(translateValue => {
            this.toast.success(translateValue['auth.forget.email-sent'], translateValue['common.success']);
          });
          setTimeout(() => {
            this.router.navigate(['/reset']);
          }, 3000);
        } else {
          this.translate.get(['auth.forget.error', 'common.error']).subscribe(translateValue => {
            this.toast.error(translateValue['auth.forget.error'], translateValue['common.error']);
          });
        }
      },
      error => {
        this.translate.get(['common.error']).subscribe(translateValue => {
          this.toast.error(error.error.errors.message, translateValue['common.error']);
        });
      }
    );
  }
  back() {
    this.forgotPassword = false;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
