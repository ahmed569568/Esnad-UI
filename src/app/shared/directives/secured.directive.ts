import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[secured]'
})
export class SecuredDirective implements OnInit {
  // Inputs
  @Input('secured') permission: string;

  constructor(private eltRef: ElementRef) {}

  ngOnInit(): void {
    // const permission = this.permission;
    // if (permission === '') {
    //   return;
    // } else {
    //   const el: HTMLElement = this.eltRef.nativeElement;
    //   el.classList.add('d-none');
    //   const allow = CredentialsService.checkPermissions(permission);
    //   if (allow) {
    //     el.removeAttribute('secured');
    //     el.classList.remove('d-none');
    //   } else {
    //     el.remove();
    //   }
    // }
  }
}
