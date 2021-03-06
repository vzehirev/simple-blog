import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './services/loading-spinner/loading-spinner.service';
import { Subject } from 'rxjs';

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
