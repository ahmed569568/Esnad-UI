import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '@app/core/http/api-request.service';

@Component({
  selector: 'app-week-days',
  templateUrl: './week-days.component.html',
  styleUrls: ['./week-days.component.scss']
})
export class WeekDaysComponent implements OnInit {
  weekDays: string[] = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  constructor(private api: ApiRequestService) {}

  ngOnInit() {}
}
