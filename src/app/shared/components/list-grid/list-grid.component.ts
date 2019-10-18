import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { ItemProps, Row } from '@app/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AppHelper } from '@app/core/classes/app-helper';
import { environment } from '@env/environment';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-list-grid',
  templateUrl: 'list-grid.component.html',
  styleUrls: ['list-grid.component.scss']
})
export class ListGridComponent implements OnInit, OnDestroy {
  // Inputs
  @Input() columns: ItemProps[]; // retrieve from any list component includes the columns data
  @Input() controller: any;
  @Input() service: any;
  @Input() page: any;
  @Input() options: any;
  @Input() itemCount: number;
  @Input() groupId: number;
  @Input() locateOnMap: boolean;
  @Input() searchable?: boolean;

  // Outputs
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() setActivePage: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeCountPerPage: EventEmitter<any> = new EventEmitter<any>();

  // Props
  rows: Row;
  environment = environment;
  keyword: any;
  alive = true;

  constructor(
    public dialog: MatDialog,
    private translate?: TranslateService,
    private router?: Router,
    protected componentFactoryResolver?: ComponentFactoryResolver,
    protected containerRef?: ViewContainerRef,
    protected utilitiesService?: UtilitiesService
  ) {}

  ngOnInit() {
    this.service.resources.subscribe(() => {
      this.rows = this.service.resourcesList;
    });
    this.utilitiesService.dialogActionObservable$.pipe(takeWhile(() => this.alive)).subscribe(data => {
      if (data) {
        return this.doAction(data.action, data.id);
      }
    });
  }

  // getTooltipHtml(event: any, item: any) {
  //   const toolTipType = { isHtml: true, content: '' };
  //   let componentFactory;
  //   let componentRef;
  //   const data: any = {};
  //     {
  //       componentFactory = this.componentFactoryResolver.resolveComponentFactory(AuditLogViewComponent);
  //       data.row = item;
  //       data.unitId = item.id;
  //       data.isTooltip = true;
  //     }
  //     if (!toolTipType.isHtml) {
  //       return this.controller + '.' + toolTipType.content;
  //     }
  //     componentRef = this.containerRef.createComponent(componentFactory);
  //     for (const k of Object.keys(data)) {
  //       componentRef.instance[k] = data[k];
  //     }
  //     event.directive.component = componentRef;
  //     event.instance.setContent(componentRef.location.nativeElement);
  //     setTimeout(() => {
  //       event.instance.popperInstance.update();
  //     }, 100);
  // }

  /**
   * doAction(type) used to make an action [view, edit and archive]
   * @param type => takes the type from the HTML and passes in the event function
   * @param id => item Id
   */
  async doAction(type: string, id: number) {
    switch (type) {
      case 'edit':
        return this.router.navigate([`${this.controller}/${type}/${id}`]);
      case 'view':
        return this.router.navigate([`${this.controller}/${type}/${id}`]);
      case 'clone':
        return this.router.navigate([`${this.controller}/${type}/${id}`]);
      case 'archive': {
        this.service.archive(id);
        return;
      }
      case 'filter': {
        setTimeout(() => {
          this.utilitiesService.filter(this.keyword);
        }, 1000);
      }
    }
  }

  /**
   * Pass the value to deep find method using path and original object
   * obj
   * path
   */
  getValue(obj: any, path: string) {
    return AppHelper.deepFind(obj, path);
  }

  hasActions(): boolean {
    return this.options.edit || this.options.archive || this.options.view;
  }

  openDialog(row: any, action: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        id: row.id,
        message: 'confirm_message',
        submitText: 'yes',
        cancelText: 'no',
        action,
        name: row.name
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
