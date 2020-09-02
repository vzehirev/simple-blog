import { Component, OnInit, AfterContentInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { LoadingSpinnerService } from './services/loading-spinner.service';
import { Subject } from 'rxjs';
import { LIVE_ANNOUNCER_DEFAULT_OPTIONS } from '@angular/cdk/a11y';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "AppTitle";
  isLoading: Subject<boolean>;

  constructor(private loadingSpinnerService: LoadingSpinnerService) {
  }

  ngOnInit() {
    this.isLoading = this.loadingSpinnerService.isLoading;
  }
}
