import { Component, OnInit } from '@angular/core';
import { CoreListComponent } from '@app/core/components/core-list/core-list.component';
import { UtilitiesService } from '@app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { StudentsService } from '@app/students/students.service';

@Component({
  selector: 'app-branches-list',
  templateUrl: '../../../core/components/core-list/core-list.component.html'
})
export class StudentsListComponent extends CoreListComponent implements OnInit {
  constructor(service: StudentsService, us: UtilitiesService, router: Router) {
    super(service, us, router);
    this.listOptions.add = false;
    this.listOptions.searchable = true;
    this.listOptions.listTypes = ['All', 'Link Driver', 'Not Linked', 'Archive'];
  }

  ngOnInit() {
    return super.ngOnInit();
  }
}
