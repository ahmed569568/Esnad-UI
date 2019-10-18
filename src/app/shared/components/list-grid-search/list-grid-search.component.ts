import { Component, Input, OnInit } from '@angular/core';
import { UtilitiesService } from '@app/shared/services/utilities.service';

@Component({
  selector: 'app-list-grid-search',
  templateUrl: './list-grid-search.component.html',
  styleUrls: ['./list-grid-search.component.scss']
})
export class ListGridSearchComponent implements OnInit {
  @Input() service: any;
  term: string;

  constructor(private us: UtilitiesService) {}

  ngOnInit() {}

  search() {
    // setTimeout(() => {
    this.us.filter(this.term);
    // }, 1000);
  }
}
