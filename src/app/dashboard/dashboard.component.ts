import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '@app/dashboard/dashboard.service';
import { SocketService } from '@app/core/http/socket.service';
import { takeWhile } from 'rxjs/operators';
import { ApiRequestService } from '@app/core/http/api-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mapConfig = {
    type: 'group',
    field: 'control'
  };
  alive = true;

  constructor(private service: DashboardService, private socket: SocketService) {}

  ngOnInit() {
    this.socket.dataListener.pipe(takeWhile(() => this.alive)).subscribe(data => {
      this.service.lists.control.data.find((p: any) => {
        if (p.id !== +data.ride_id) {
          return;
        }
        const updated = { ...p, location: data.data };
        const removedItem = this.service.lists.control.data.indexOf(
          this.service.lists.control.data.find((t: any) => t.id === +data.ride_id)
        );
        this.service.lists.control.data.splice(removedItem, 1);
        this.service.lists.control.data.push(updated);
      });
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
