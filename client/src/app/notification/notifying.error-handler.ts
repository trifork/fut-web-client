import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from './notification.service';

@Injectable()
export class NotifyingErrorHandler implements ErrorHandler {

  constructor(private readonly zone: NgZone, private notificationService: NotificationService) {
  }

  handleError(error: any): void {
    let message = 'ERROR: ';
    if (error instanceof HttpErrorResponse) {
      message += 'HTTP ' + error.status + ' ';
      if (error.error.error) {
        message += JSON.stringify(error.error.error);
      } else {
        message += error.statusText;
      }
      message += ' \n' + error.url.replace(/^[a-z]{4,5}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/, '$1');
    } else {
      message += JSON.stringify(error);
    }
    this.zone.run(() => {
      this.notificationService.showFailure(message);
    });

    throw error;
  }

}
