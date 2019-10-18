import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from '@app/core/http/api-request.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  error: string | undefined;
  layout = {
    rtl: false
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private api: ApiRequestService,
    private authService: AuthenticationService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  reset() {
    if (!this.resetForm.valid) {
      return;
    }
    this.authService.reset(this.resetForm.value).subscribe(
      response => {
        if (response.message) {
          this.translate.get(['auth.reset.success', 'common.success']).subscribe(translateValue => {
            this.toast.success(translateValue['auth.reset.success'], translateValue['common.success']);
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.translate.get(['auth.reset.error', 'common.error']).subscribe(translateValue => {
            this.toast.error(translateValue['auth.reset.error'], translateValue['common.error']);
          });
        }
      },
      error => {
        this.translate.get(['auth.reset.error', 'common.error']).subscribe(translateValue => {
          this.toast.error(translateValue['auth.reset.error'], translateValue['common.error']);
        });
      }
    );
  }
}
