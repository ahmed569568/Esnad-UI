import { Component, Inject, OnInit } from '@angular/core';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-dynamic-dialog',
	templateUrl: './dynamic-dialog.component.html',
	styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent implements OnInit {
	submitCssClass = 'bg-success';
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

	ngOnInit() {}

	submit() {
		this.data.service.dialogAction(this.data.action, this.data.data);
	}
}
