import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  isLoading = new Subject<boolean>();

  show(): void {
    setTimeout(() => { this.isLoading.next(true) });
  }

  hide(): void {
    setTimeout(() => { this.isLoading.next(false) });
  }
}
