import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private us: UtilitiesService) {}

  ngOnInit() {}

  submit(optionValue?: number) {
    this.us.dialog({ ...this.data, optionValue });
  }
}
