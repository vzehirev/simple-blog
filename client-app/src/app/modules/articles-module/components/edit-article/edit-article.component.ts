import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ArticlesService } from 'src/app/services/articles.service';
import { Router } from '@angular/router';
import { EditArticleModel } from 'src/app/models/edit-article-model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  editArticleForm: FormGroup;
  isFormInvalid: boolean;

  get title() { return this.editArticleForm.get('title'); }
  get content() { return this.editArticleForm.get('content'); }

  constructor(private articlesSerivce: ArticlesService, private router: Router) { }

  ngOnInit() {
    this.editArticleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      content: new FormControl('', [Validators.required, Validators.minLength(100)])
    })
  }

  submitForm() {
    if (this.editArticleForm.invalid) {
      this.isFormInvalid = true;
      return;
    }

    this.articlesSerivce.editArticle(new EditArticleModel(1, '', '')).subscribe(() => this.handleSuccess());
  }

  private handleSuccess(): void {
    this.router.navigate(['/']);
  }
}