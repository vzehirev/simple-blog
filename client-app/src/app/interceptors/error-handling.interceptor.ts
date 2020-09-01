import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modules/shared-layout-module/components/modal-dialog/modal-dialog.component';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(public modalDialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        this.modalDialog.open(ModalDialogComponent, { data: { message: error.error.message ?? error.message } });
        console.error(error);
        return throwError(error);
      })
    )
  }
}