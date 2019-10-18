import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.scss']
})
export class ListTypeComponent implements OnInit {
  @Input() listOptions: any;
  @Input() service: any;

  summary: any;

  constructor() {}

  ngOnInit() {
    this.loadResources();
  }

  /**
   * fetch single item data from service
   * and fill form with it in Edit forms
   */
  loadResources(): void {
    this.service.fetchSummary().subscribe(
      (response: any) => {
        this.summary = response;
      },
      (err: any) => {
        console.log(err);
        // this.service.errorHandle(err);
      }
    );
  }
}
