import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-control-errors',
  templateUrl: './control-errors.component.html',
  styleUrls: ['./control-errors.component.scss'],
  providers: []
})
export class ControlErrorsComponent implements OnInit, OnDestroy {
  @Input()
  public ctl: FormControl;
  errorMessages: any[] = [];
  private alive = true;
  private transPrefix = '';

  constructor() {}

  @Input()
  set key(val: any) {
    val ? (this.transPrefix = val + '.') : (this.transPrefix = '');
  }

  ngOnInit() {
    this.setErrorMessages();
    this.ctl.statusChanges.pipe(takeWhile(() => this.alive)).subscribe(() => {
      this.setErrorMessages();
    });
    this.ctl.valueChanges.subscribe(() => {
      this.setErrorMessages();
    });
  }

  setErrorMessages() {
    const messages = [];
    if (this.ctl) {
      for (const errorType in this.ctl.errors) {
        if (this.ctl.errors.hasOwnProperty(errorType)) {
          messages.push({ message: errorType, params: { value: '' } });
        }
      }
    }
    this.errorMessages = messages;
  }

  public ngOnDestroy() {
    this.alive = false;
  }
}
