import { AuthenticationService, Logger } from '@app/core';
import { Injectable } from '@angular/core';
import { AppConfig } from '@app/core/classes/app-config';
import { environment } from '@env/environment';
import { DashboardService } from '@app/dashboard/dashboard.service';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable()
export class SocketService {
  webSocket: any;
  listeners: any = [];
  reconnectSeconds = 5;
  dataListener: Subject<any> = new Subject();

  constructor(protected authService: AuthenticationService, protected dashboardService: DashboardService) {
    // this.connect();
    dashboardService.resources.subscribe(() => {
      console.log('subscription success');
      if (this.webSocket) {
        // this.disconnect();
      }
      this.connect();
    });

    /* Toggle Socket Connectivity depends on user status */
    // this.authService.sessionObserver.subscribe(status => {
    //   status = this.authService.isActiveLogin();
    //   if (!status) {
    //     if (this.webSocket) {
    //       this.disconnect();
    //     }
    //   } else if (unitService.allUnitsLoaded) {
    //     this.connect();
    //   }
    // });
    /* Toggle Socket Connectivity depends on user status */
  }

  onConnected() {
    this.subscribe(this.updates);
    this.subscribe(this.status);
  }

  receive(item: any) {
    item = JSON.parse(item.data);
    const type = item.type;
    const data = item.data;
    this.publish(type, data);
  }

  close(e: any) {
    console.log('Socket is closed. Reconnect will be attempted in ' + this.reconnectSeconds + ' seconds.', e.reason);
    const service = this;
    setTimeout(() => {
      service.unSubscribe(service.updates);
      service.unSubscribe(service.status);

      service.webSocket = null;
      service.connect();
    }, this.reconnectSeconds * 1000);
  }

  error(err: any) {
    console.error('Socket encountered error: ', err);
    if (this.webSocket) {
      this.webSocket.close();
      console.log('Disconnected');
    }
  }

  publish(type: any, data: any) {
    const scope = this;
    this.listeners.forEach((item: any) => {
      item.call(scope, type, data);
    });
  }

  isConnected() {
    return this.webSocket.readyState === this.webSocket.OPEN;
  }

  disconnect() {
    if (this.isConnected()) {
      console.log('ioClient Disconnected');
      this.webSocket.close();
    }
  }

  send(type: any, data: any) {
    this.webSocket.send({ type, data });
  }

  subscribe(item: any) {
    this.listeners.push(item);
  }

  unSubscribe(item: any) {
    this.listeners = this.listeners.filter((obj: any) => {
      if (obj !== item) {
        return obj;
      }
    });
  }

  connect() {
    if (!AppConfig.socket) {
      return;
    }
    if (this.webSocket) {
      return;
    }
    this.webSocket = io(
      environment.socketUrl + '?token=' + 'Bearer ' + this.authService.token + '&client_id=1&ride_id=4&lang=EN',
      {
        transports: ['websocket', 'polling', 'flashsocket']
      }
    );
    const WSService = this;
    this.webSocket.onopen = () => {
      WSService.onConnected();
    };
    this.webSocket.on('changeLocation', (data: any) => {
      this.dataListener.next(data);
    });

    this.webSocket.onmessage = (item: any) => {
      WSService.receive(item);
    };

    this.webSocket.onclose = (e: any) => {
      WSService.close(e);
    };

    this.webSocket.onerror = (err: any) => {
      WSService.error(err);
    };
  }

  private status(type: any, data: any) {
    if (type === 'status') {
      console.log('Status: ', data);
      // this.unitService.updateObjectStatus(data);
    }
  }

  private updates(type: any, data: any) {
    if (type === 'updates') {
      console.log('Updates Length: ' + Object.keys(data).length, data);
      // this.unitService.updateObjectsTracking(data);
    }
  }
}
