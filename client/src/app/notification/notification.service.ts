import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {
  }

  public showSuccess(message: string): void {
    const matSnackBarConfig = new MatSnackBarConfig();
    matSnackBarConfig.duration = 3000;
    matSnackBarConfig.verticalPosition = 'top';
    matSnackBarConfig.horizontalPosition = 'center';
    matSnackBarConfig.panelClass = ['snackbar-success'];
    this.snackBar.open(message, 'x', matSnackBarConfig);
  }

  public showFailure(error: string): void {
    const matSnackBarConfig = new MatSnackBarConfig();
    matSnackBarConfig.verticalPosition = 'top';
    matSnackBarConfig.horizontalPosition = 'center';
    matSnackBarConfig.panelClass = ['snackbar-error'];
    this.snackBar.open(error, 'x', matSnackBarConfig);
  }

  public showWarning(error: string): void {
    const matSnackBarConfig = new MatSnackBarConfig();
    matSnackBarConfig.duration = 5000;
    matSnackBarConfig.verticalPosition = 'top';
    matSnackBarConfig.horizontalPosition = 'center';
    matSnackBarConfig.panelClass = ['snackbar-warn'];
    this.snackBar.open(error, 'x', matSnackBarConfig);
  }

}
