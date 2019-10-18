import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { ChartComponent } from './components/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { ListGridComponent } from '@app/shared/components/list-grid/list-grid.component';
import { ListGridOptionsComponent } from '@app/shared/components/list-grid-options/list-grid-options.component';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { FormFooterComponent } from '@app/shared/components/form-footer/form-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SecuredDirective } from '@app/shared/directives/secured.directive';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgTippyModule } from 'angular-tippy';
import { AppTooltipDirective } from '@app/shared/directives/app-tooltip-directive';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './filter.pipe';
import { DialogComponent } from './components/dialog/dialog.component';
import { MapComponent } from './components/map/map.component';
import { ControlErrorsComponent } from '@app/shared/components/control-errors/control-errors.component';
import { ListGridSummaryComponent } from '@app/shared/components/list-grid-summary/list-grid-summary.component';
import { ListTypeComponent } from '@app/shared/components/list-type/list-type.component';
import { ListGridSearchComponent } from '@app/shared/components/list-grid-search/list-grid-search.component';
import { AngularOpenlayersModule } from 'ngx-openlayers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    TranslateModule,
    NgxSpinnerModule,
    ColorPickerModule,
    NgTippyModule,
    ToastrModule.forRoot(),
    AngularOpenlayersModule
  ],
  declarations: [
    ChartComponent,
    ListGridComponent,
    ListGridOptionsComponent,
    PaginationComponent,
    FormFooterComponent,
    ControlErrorsComponent,
    SecuredDirective,
    AppTooltipDirective,
    FilterPipe,
    DialogComponent,
    ListGridSummaryComponent,
    ListTypeComponent,
    ListGridSearchComponent,
    MapComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    TranslateModule,
    NgxSpinnerModule,
    ColorPickerModule,
    NgTippyModule,
    ToastrModule,
    AngularOpenlayersModule,

    ChartComponent,
    ListGridComponent,
    ListGridOptionsComponent,
    PaginationComponent,
    FormFooterComponent,
    SecuredDirective,
    AppTooltipDirective,
    DialogComponent,
    ControlErrorsComponent,
    ListGridSummaryComponent,
    ListTypeComponent,
    ListGridSearchComponent,
    MapComponent
  ],
  entryComponents: [DialogComponent]
})
export class SharedModule {}
