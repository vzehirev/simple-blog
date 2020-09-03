import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../modules/shared-layout/components/modal-dialog/modal-dialog.component';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(public modalDialog: MatDialog, private usersService: UsersService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.usersService.logoutUser();
          this.router.navigate(['/users/login']);
        } else {
          this.modalDialog.open(ModalDialogComponent, { data: { message: error.error.message ?? error.message ?? 'Something went wrong!' } });
        }
        return throwError(error);
      })
    );
  }
}