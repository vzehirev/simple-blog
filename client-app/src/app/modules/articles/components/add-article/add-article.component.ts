import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  addArticleForm: FormGroup;
  isFormInvalid: boolean;

  get title() { return this.addArticleForm.get('title'); }
  get content() { return this.addArticleForm.get('content'); }

  constructor(private articlesSerivce: ArticlesService, private router: Router) { }

  ngOnInit() {
    this.addArticleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      content: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(1000)])
    })
  }

  submitForm() {
    if (this.addArticleForm.invalid) {
      this.isFormInvalid = true;
      return;
    }

    this.articlesSerivce.addArticle(this.title.value, this.content.value).subscribe(() => this.router.navigate(['/']));
  }
}
