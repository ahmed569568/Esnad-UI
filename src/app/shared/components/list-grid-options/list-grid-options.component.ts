import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-grid-options',
  templateUrl: './list-grid-options.component.html',
  styleUrls: ['./list-grid-options.component.scss']
})
export class ListGridOptionsComponent {
  @Input() groupView: any;
  @Input() listOptions: any;
  @Input() controller: any;

  @Output() switchViewEvent: EventEmitter<any> = new EventEmitter();
  @Output() doActionEvent: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  doAction(actionType: string, options?: {}) {
    this.doActionEvent.emit({ actionType, options });
  }

  openDialog(action: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        message: 'exist_new',
        firstButtonText: 'exist_parent',
        secondButtonText: 'new_parent',
        action
      }
    });
  }
}
