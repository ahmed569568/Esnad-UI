import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    ShowHidePasswordModule,
    AuthRoutingModule
  ],
  declarations: [...AuthRoutingModule.components]
})
export class AuthModule {}
