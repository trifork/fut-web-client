import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from './notification.service';
import * as CYCLE_JS from 'cycle/cycle';

@Injectable()
export class NotifyingErrorHandler implements ErrorHandler {

  constructor(private readonly zone: NgZone, private notificationService: NotificationService) {
  }

  handleError(error: any): void {
    let message = 'ERROR: ';
    if (error instanceof HttpErrorResponse) {
      let httpError = 'HTTP ' + error.status + ' ';
      if (error.error?.error) {
        httpError += JSON.stringify(CYCLE_JS.decycle((error.error.error)));
      } else {
        httpError += error.statusText;
      }
      message += httpError;
      if (error.error?.issue) {
        message += ' \n' + JSON.stringify(CYCLE_JS.decycle(error.error.issue));
      }
      message += ' \n' + error.url.replace(/^[a-z]{4,5}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/, '$1');
    } else if (error instanceof Error) {
      message += error.message;
    } else {
      message += JSON.stringify(CYCLE_JS.decycle((error)));
    }
    this.zone.run(() => {
      this.notificationService.showFailure(message);
    });

    throw error;
  }

}
