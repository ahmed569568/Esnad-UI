import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private count = 0;
  private isLoading: boolean;

  constructor(private loadingController: NgxSpinnerService) {}

  public show() {
    this.count++;
    if (this.count === 1) {
      if (!this.isLoading) {
        return this.presentLoading();
      }
    }
  }

  public hide() {
    this.count--;
    if (this.count === 0) {
      if (this.isLoading) {
        if (this.isLoading) {
          return this.closeLoading();
        }

        /**
         * second check after delay for closing loader because multiple requests are unpredictable
         */
        timer(500).subscribe(() => {
          if (this.isLoading) {
            return this.closeLoading();
          }
        });
      }
    }
  }

  private presentLoading() {
    this.isLoading = true;
    return this.loadingController.show().then(() => {
      if (!this.isLoading) {
        return this.loadingController.hide();
      }
    });
  }

  private closeLoading() {
    this.isLoading = false;
    return this.loadingController.hide();
  }
}
