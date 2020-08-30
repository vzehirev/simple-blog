import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ArticlesService } from 'src/app/services/articles.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/modules/shared-layout-module/components/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  addArticleForm: FormGroup;
  isFormInvalid: boolean;
  isLoading: boolean;

  get title() { return this.addArticleForm.get('title'); }
  get content() { return this.addArticleForm.get('content'); }

  constructor(private articlesSerivce: ArticlesService, private router: Router, public modalDialog: MatDialog) { }

  ngOnInit() {
    this.addArticleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      content: new FormControl('', [Validators.required, Validators.minLength(100)])
    })
  }

  submitForm() {
    if (this.addArticleForm.invalid) {
      this.isFormInvalid = true;
      return;
    }

    this.isLoading = true;

    this.articlesSerivce.addArticle(this.title.value, this.content.value).subscribe(
      successResponse => this.handleSuccess(),
      errorResponse => this.handleError(errorResponse)
    )
  }

  private handleSuccess(): void {
    this.isLoading = false;
    this.router.navigate(['/']);
  }

  private handleError(errorResponse): void {
    this.isLoading = false;

    this.modalDialog.open(ModalDialogComponent, { data: { message: errorResponse.error.message } });
  }
}