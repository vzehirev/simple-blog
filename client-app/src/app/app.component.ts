import { Component } from '@angular/core';
import { LoadingSpinnerService } from './services/loading-spinner.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "AppTitle";
  isLoading: Subject<boolean>;
  constructor(private loadingSpinnerService: LoadingSpinnerService) {
    this.isLoading = this.loadingSpinnerService.isLoading;
  }
}
