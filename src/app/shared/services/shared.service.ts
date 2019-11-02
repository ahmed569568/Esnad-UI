import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

// import * as mime from 'mime-types';

// const mime = require('mime');
import * as mime from 'mime';

@Injectable({
	providedIn: 'root'
})
export class SharedService {
	data$: Subject<any> = new Subject();
	deletedItem$: Subject<any> = new Subject();
	dashboardErrors$: Subject<any> = new Subject();

	constructor(
		public toastr: ToastrService,
		public dialog: MatDialog,
		public translate: TranslateService,
		public location: Location
	) {}

	storeItems(data: any) {
		this.data$.next(data);
	}

	handleItemById(data: any) {
		this.deletedItem$.next(data);
	}

	getMimeTypes(extensions: string[]) {
		const extensionsArray: string[] = [];
		extensions.forEach(extension => {
			extensionsArray.push(this.getMimeType(extension));
		});
		return extensionsArray;
	}

	getMimeType(extension: string) {
		return mime.getType(extension);
	}
}
